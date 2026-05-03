import { NextResponse } from 'next/server';
import { addFarmerToBlockchain, getFarmerFromBlockchain } from '../../../lib/services/blockchain.service';
import Farmer from '../../../lib/models/Farmer';
import dbConnect from '../../../lib/mongodb/client';

export async function POST(req: Request) {
  try {
    await dbConnect(); // pastikan koneksi mongodb sudah ada

    const { name, location, product } = await req.json();

    // 1. Simpan ke blockchain
    const txHash = await addFarmerToBlockchain(name, location, product);

    // 2. Simpan ke database (MongoDB)
    const farmer = await Farmer.create({
      name,
      location,
      product,
      txHash, // hash transaksi
    });

    return NextResponse.json({ success: true, farmer });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
