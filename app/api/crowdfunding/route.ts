import { NextResponse } from 'next/server';
import { Campaign } from '@/lib/models/Campaign';
import dbConnect from '@/lib/mongodb/client';

export async function GET() {
  try {
    await dbConnect();

    const campaigns = await Campaign.find({
      status: { $in: ['Funding', 'In_Progress', 'Completed'] }
    })
      .sort({ createdAt: -1 })
      .select('title description commodity landArea targetHarvest targetAmount currentAmount status bannerUrl investmentTerms returnSimulation createdAt farmerId');

    return NextResponse.json({ success: true, data: campaigns });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Gagal mengambil data kampanye' },
      { status: 500 }
    );
  }
}
