import { NextResponse } from 'next/server';
import Farmer from '../../../lib/models/Farmer';
import dbConnect from '../../../lib/mongodb/client';
import { AuditLog } from '../../../lib/models/AuditLog';

export async function POST(req: Request) {
  try {
    await dbConnect(); // pastikan koneksi mongodb sudah ada

    const { name, location, product } = await req.json();

    // Simpan ke database (MongoDB)
    const farmer = await Farmer.create({
      name,
      location,
      product,
    });

    await AuditLog.create({
      action: "FARMER_CREATE",
      entityType: "Farmer",
      entityId: farmer._id.toString(),
      metadata: { name, location, product },
    });

    return NextResponse.json({ success: true, farmer });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
