import { NextResponse } from 'next/server';
import { Campaign } from '@/lib/models/Campaign';
import dbConnect from '@/lib/mongodb/client';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'ID tidak valid' }, { status: 400 });
    }

    const campaign = await Campaign.findOne({
      _id: id,
      status: { $in: ['Funding', 'In_Progress', 'Completed', 'Draft'] }
    }).populate('farmerId', 'name organizationName');

    if (!campaign) {
      return NextResponse.json({ success: false, message: 'Proyek tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: campaign });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
