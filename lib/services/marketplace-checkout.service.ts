import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb/client";
import { Cart } from "@/lib/models/Cart";
import { Order, type IOrder } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { createMarketplaceTransaction } from "@/lib/services/midtrans.service";

const SHIPPING_FEE = 15000;
const PLATFORM_FEE = 0;

export class CheckoutError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.name = "CheckoutError";
        this.statusCode = statusCode;
    }
}

type CheckoutItemInput = {
    productId: string;
    quantity: number;
};

type ShippingAddressInput = {
    receiverName: string;
    phone: string;
    fullAddress: string;
};

type MarketplaceCheckoutInput = {
    cartSessionId?: string;
    customerEmail: string;
    shippingAddress: ShippingAddressInput;
    items: CheckoutItemInput[];
};

type MidtransNotification = {
    order_id: string;
    transaction_status: string;
    fraud_status?: string;
    payment_type?: string;
    transaction_id?: string;
    settlement_time?: string;
};

const generateOrderNumber = () => (
    `MKT-${Date.now()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`
);

const normalizeItems = (items: CheckoutItemInput[]) => {
    const merged = new Map<string, number>();

    for (const item of items) {
        const productId = String(item.productId || "").trim();
        const quantity = Number(item.quantity);

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new CheckoutError("Produk tidak valid");
        }
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new CheckoutError("Jumlah produk tidak valid");
        }

        merged.set(productId, (merged.get(productId) || 0) + quantity);
    }

    return Array.from(merged.entries()).map(([productId, quantity]) => ({ productId, quantity }));
};

const releaseReservedItems = async (items: Array<{ productId: mongoose.Types.ObjectId; quantity: number }>) => {
    for (const item of items) {
        const product = await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: item.quantity } },
            { new: true }
        );

        if (product && product.status === "Habis" && product.stock > 0) {
            product.status = "Aktif";
            await product.save();
        }
    }
};

const releaseOrderStock = async (order: IOrder) => {
    if (!order.stockReserved || order.stockReleasedAt) return false;

    await releaseReservedItems(
        order.products.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }))
    );

    order.stockReserved = false;
    order.stockReleasedAt = new Date();
    await order.save();
    return true;
};

export async function createMarketplaceCheckout(input: MarketplaceCheckoutInput) {
    await dbConnect();

    const email = String(input.customerEmail || "").trim().toLowerCase();
    if (!email) throw new CheckoutError("Email pelanggan wajib diisi");

    const receiverName = String(input.shippingAddress?.receiverName || "").trim();
    const phone = String(input.shippingAddress?.phone || "").trim();
    const fullAddress = String(input.shippingAddress?.fullAddress || "").trim();

    if (!receiverName || !phone || !fullAddress) {
        throw new CheckoutError("Detail pengiriman wajib diisi lengkap");
    }

    const checkoutItems = normalizeItems(input.items || []);
    if (checkoutItems.length === 0) throw new CheckoutError("Keranjang masih kosong");

    const productIds = checkoutItems.map((item) => new mongoose.Types.ObjectId(item.productId));
    const products = await Product.find({ _id: { $in: productIds } }).lean();
    const productMap = new Map(products.map((product) => [String(product._id), product]));

    const orderProducts = checkoutItems.map((item) => {
        const product = productMap.get(item.productId);
        if (!product) throw new CheckoutError("Produk tidak ditemukan", 404);
        if (product.status !== "Aktif") throw new CheckoutError(`${product.name} sedang tidak tersedia`);
        if (product.stock < item.quantity) {
            throw new CheckoutError(`Stok ${product.name} tidak mencukupi`);
        }

        return {
            productId: new mongoose.Types.ObjectId(item.productId),
            name: product.name,
            imageUrl: product.imageUrl || "",
            quantity: item.quantity,
            price: product.price,
        };
    });

    const reservedItems: Array<{ productId: mongoose.Types.ObjectId; quantity: number }> = [];

    try {
        for (const item of orderProducts) {
            const product = await Product.findOneAndUpdate(
                {
                    _id: item.productId,
                    status: "Aktif",
                    stock: { $gte: item.quantity },
                },
                { $inc: { stock: -item.quantity } },
                { new: true }
            );

            if (!product) throw new CheckoutError(`Stok ${item.name} baru saja berubah`);
            reservedItems.push({ productId: item.productId, quantity: item.quantity });

            if (product.stock <= 0) {
                product.status = "Habis";
                await product.save();
            }
        }
    } catch (error) {
        await releaseReservedItems(reservedItems);
        throw error;
    }

    const subtotalAmount = orderProducts.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const totalAmount = subtotalAmount + SHIPPING_FEE + PLATFORM_FEE;
    const orderNumber = generateOrderNumber();

    let order: IOrder | null = null;
    try {
        order = await Order.create({
            guestEmail: email,
            cartSessionId: input.cartSessionId,
            orderNumber,
            products: orderProducts,
            subtotalAmount,
            shippingFee: SHIPPING_FEE,
            platformFee: PLATFORM_FEE,
            totalAmount,
            status: "pending",
            paymentStatus: "pending",
            shippingAddress: { receiverName, phone, fullAddress },
            estimatedArrival: new Date(Date.now() + 3 * 86400000),
            paymentReference: orderNumber,
            stockReserved: true,
        });

        if (input.cartSessionId) {
            // Mark the cart as pending checkout so UI can reflect that payment is in progress
            await Cart.findOneAndUpdate(
                { sessionId: input.cartSessionId },
                {
                    $set: {
                        sessionId: input.cartSessionId,
                        checkoutOrderId: order._id,
                        status: "pending_checkout",
                    },
                },
                { upsert: true, new: true }
            );
        }
    } catch (error) {
        if (order) {
            await releaseOrderStock(order);
            await Order.findByIdAndUpdate(order._id, {
                $set: {
                    status: "cancelled",
                    paymentStatus: "failed",
                    cancelledAt: new Date(),
                },
            });
        } else {
            await releaseReservedItems(reservedItems);
        }

        throw error;
    }

    if (!order) throw new CheckoutError("Gagal membuat order", 500);

    try {
        const transaction = await createMarketplaceTransaction({
            orderId: orderNumber,
            grossAmount: totalAmount,
            firstName: receiverName,
            email,
            phone,
        });

        order.paymentToken = transaction.token;
        await order.save();

        return {
            order,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        };
    } catch (error) {
        await releaseOrderStock(order);
        await Order.findByIdAndUpdate(order._id, {
            $set: {
                status: "cancelled",
                paymentStatus: "failed",
                cancelledAt: new Date(),
            },
        });

        if (input.cartSessionId) {
            await Cart.updateOne(
                { sessionId: input.cartSessionId, checkoutOrderId: order._id },
                {
                    $set: { status: "active" },
                    $unset: { checkoutOrderId: "" },
                }
            );
        }

        throw error;
    }
}

export async function applyMarketplacePaymentNotification(notification: MidtransNotification) {
    await dbConnect();

    const order = await Order.findOne({ orderNumber: notification.order_id });
    if (!order) {
        return { handled: false, order: null };
    }

    const now = new Date();
    const success =
        notification.transaction_status === "settlement" ||
        (notification.transaction_status === "capture" && notification.fraud_status === "accept");
    const failed = ["cancel", "deny", "expire"].includes(notification.transaction_status);

    if (success) {
        if (order.paymentStatus !== "paid" || order.status !== "packed") {
            order.status = "packed";
            order.paymentStatus = "paid";
            order.paymentType = notification.payment_type;
            order.midtransTransactionId = notification.transaction_id;
            order.paidAt = order.paidAt || (notification.settlement_time ? new Date(notification.settlement_time) : now);
            await order.save();
        }

        if (order.cartSessionId) {
            await Cart.updateOne(
                { sessionId: order.cartSessionId },
                {
                    $set: {
                        items: [],
                        status: "checked_out",
                        checkoutOrderId: order._id,
                        checkedOutAt: now,
                    },
                }
            );
        }

        return { handled: true, order };
    }

    if (failed) {
        await releaseOrderStock(order);

        order.status = "cancelled";
        order.paymentStatus = notification.transaction_status === "expire"
            ? "expired"
            : notification.transaction_status === "cancel"
                ? "cancelled"
                : "failed";
        order.paymentType = notification.payment_type;
        order.midtransTransactionId = notification.transaction_id;
        order.cancelledAt = order.cancelledAt || now;
        await order.save();

        if (order.cartSessionId) {
            await Cart.updateOne(
                { sessionId: order.cartSessionId, checkoutOrderId: order._id },
                {
                    $set: { status: "active" },
                    $unset: { checkoutOrderId: "", checkedOutAt: "" },
                }
            );
        }

        return { handled: true, order };
    }

    if (notification.transaction_status === "pending") {
        if (order.paymentStatus !== "paid") {
            order.paymentStatus = "pending";
            order.paymentType = notification.payment_type;
            order.midtransTransactionId = notification.transaction_id;
            await order.save();
        }

        return { handled: true, order };
    }

    return { handled: true, order };
}
