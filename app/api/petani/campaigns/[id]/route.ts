import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb/client';
import mongoose from 'mongoose';
import { Campaign } from '@/lib/models/Campaign';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'ID Proyek tidak valid' },
        { status: 400 }
      );
    }

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return NextResponse.json(
        { success: false, message: 'Proyek tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: campaign });
  } catch (error: any) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'ID Proyek tidak valid' },
        { status: 400 }
      );
    }

    // Hitung ulang targetAmount jika RAB dikirimkan
    let calculatedTargetAmount = 0;
    if (body.activities && Array.isArray(body.activities)) {
      body.activities.forEach((act: any) => {
        if (act.items && Array.isArray(act.items)) {
          act.items.forEach((item: any) => {
            calculatedTargetAmount += Number(item.total) || 0;
          });
        }
      });
    }

    const updateData = {
      title: body.title,
      description: body.description,
      commodity: body.commodity,
      landArea: body.landArea ? Number(body.landArea) : undefined,
      locationGPS: body.locationGPS,
      targetHarvest: body.targetHarvest,
      bannerUrl: body.bannerUrl,
      targetAmount: calculatedTargetAmount > 0 ? calculatedTargetAmount : body.targetAmount,
      status: body.status || 'Draft',
      investmentTerms: body.investmentTerms,
      returnSimulation: body.returnSimulation,
      activities: body.activities || []
    };

    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return NextResponse.json(
        { success: false, message: 'Proyek tidak ditemukan untuk diupdate' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: campaign });
  } catch (error: any) {
    console.error('Error updating campaign:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Terjadi kesalahan saat update' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'ID Proyek tidak valid' }, { status: 400 });
    }

    const allowedStatusTransitions: Record<string, string[]> = {
      Draft: ['Funding'],
      Funding: ['In_Progress', 'Failed'],
      In_Progress: ['Completed', 'Failed'],
    };

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return NextResponse.json({ success: false, message: 'Proyek tidak ditemukan' }, { status: 404 });
    }

    const currentStatus = campaign.status as string;
    const newStatus = body.status as string;
    const allowed = allowedStatusTransitions[currentStatus] || [];

    if (!allowed.includes(newStatus)) {
      return NextResponse.json(
        { success: false, message: `Tidak bisa mengubah status dari ${currentStatus} ke ${newStatus}` },
        { status: 400 }
      );
    }

    if (newStatus === 'Funding' && !campaign.investmentTerms?.fundingDeadline) {
      return NextResponse.json(
        { success: false, message: 'Isi Batas Waktu Pendanaan sebelum mempublikasi proyek.' },
        { status: 400 }
      );
    }

    campaign.status = newStatus as any;
    await campaign.save();

    return NextResponse.json({ success: true, data: campaign });
  } catch (error: any) {
    console.error('Error patching campaign status:', error);
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan' }, { status: 500 });
  }
}
