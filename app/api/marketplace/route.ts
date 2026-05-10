import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Product } from "@/lib/models/Product";

// GET: Ambil semua produk aktif untuk halaman marketplace customer
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "20");

    const query: Record<string, any> = { status: "Aktif" };
    if (category && category !== "Semua Produk") {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { farmerName: { $regex: search, $options: "i" } },
        { farmerLocation: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: products, total: products.length });
  } catch (error: any) {
    console.error("GET /api/marketplace error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
