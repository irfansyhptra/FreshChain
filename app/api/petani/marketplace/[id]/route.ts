import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";
import mongoose from "mongoose";

type Params = { params: Promise<{ id: string }> };

// GET: Ambil satu produk
export async function GET(_req: Request, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
    }
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, message: "Produk tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update produk
export async function PUT(request: Request, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
    }

    const body = await request.json();
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ success: false, message: "Produk tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE: Tarik produk (soft delete — set status Ditarik)
export async function DELETE(_req: Request, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { status: "Ditarik" } },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ success: false, message: "Produk tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Produk berhasil ditarik dari marketplace" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
