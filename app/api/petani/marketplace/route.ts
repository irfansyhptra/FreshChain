import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Product } from "@/lib/models/Product";
import Farmer from "@/lib/models/Farmer";
import { User } from "@/lib/models/User";

// Ambil identitas petani aktif (sesuai pola yang sudah ada di project)
async function getActiveFarmer() {
  // Ambil petani pertama — sesuai pola existing dashboard service
  const farmer = await Farmer.findOne({ role: "petani" }).sort({ createdAt: -1 }).lean();
  return farmer;
}

// GET: Ambil semua produk milik petani aktif
export async function GET() {
  try {
    await dbConnect();
    const farmer = await getActiveFarmer();

    // Cari farmerId dari koleksi User berdasarkan role Petani
    const user = await User.findOne({ role: "Petani" }).sort({ createdAt: -1 }).lean();
    const farmerId = user?._id;

    const query = farmerId ? { farmerId } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });

    const stats = {
      total: products.length,
      active: products.filter((p) => p.status === "Aktif").length,
      habis: products.filter((p) => p.status === "Habis").length,
    };

    return NextResponse.json({ success: true, data: products, stats });
  } catch (error: any) {
    console.error("GET /api/petani/marketplace error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST: Upload produk baru ke marketplace
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, description, price, stock, unit, category, imageUrl, badge } = body;

    if (!name || !description || price === undefined || stock === undefined || !unit || !category) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi: name, description, price, stock, unit, category" },
        { status: 400 }
      );
    }

    // Gunakan user Petani pertama yang tersedia (sesuai pola existing)
    const user = await User.findOne({ role: "Petani" }).sort({ createdAt: -1 }).lean();
    const farmer = await getActiveFarmer();

    const farmerName =
      (user as any)?.petaniProfile?.groupName ||
      (user as any)?.name ||
      farmer?.organizationName ||
      farmer?.name ||
      "Petani FreshChain";

    const farmerLocation =
      (user as any)?.petaniProfile?.location ||
      (user as any)?.address ||
      farmer?.location ||
      "Indonesia";

    const farmerId = (user as any)?._id;

    const product = await Product.create({
      farmerId,
      farmerName,
      farmerLocation,
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      unit,
      category,
      imageUrl: imageUrl || "",
      badge: badge || "",
      status: "Aktif",
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/petani/marketplace error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
