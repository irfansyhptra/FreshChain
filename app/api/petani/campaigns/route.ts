import { NextResponse } from 'next/server';
import { Campaign } from '@/lib/models/Campaign';
import { User } from '@/lib/models/User';
import dbConnect from '@/lib/mongodb/client';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // In a real application, extract farmerId from an authenticated session.
    // For now, we will query the first available Petani or create a dummy user reference.
    let farmer = await User.findOne({ role: 'Petani' });
    if (!farmer) {
      // Create a temporary user if none exists
      farmer = await User.create({
        name: 'Petani Default',
        email: 'petani@default.com',
        password: 'dummy',
        role: 'Petani',
      });
    }

    const calculatedTargetAmount = (body.activities || []).reduce((sum: number, act: any) => {
      const itemsTotal = (act.items || []).reduce((itemSum: number, item: any) => itemSum + (Number(item.total) || 0), 0);
      return sum + itemsTotal;
    }, 0);

    // Validate funding deadline if publishing
    if (body.status === "Funding") {
      if (!body.investmentTerms?.fundingDeadline) {
         return NextResponse.json({ success: false, message: 'Batas Waktu Pengumpulan Dana harus diisi' }, { status: 400 });
      }
      const deadlineDate = new Date(body.investmentTerms.fundingDeadline);
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 60); // 60 days
      if (deadlineDate > maxDate) {
         return NextResponse.json({ success: false, message: 'Batas Waktu Pengumpulan Dana maksimal 2 bulan (60 hari)' }, { status: 400 });
      }
    }

    const newCampaign = await Campaign.create({
      title: body.title,
      description: body.description || `Campaign for ${body.commodity}`,
      commodity: body.commodity,
      landArea: Number(body.landArea),
      locationGPS: body.locationGPS,
      targetHarvest: body.targetHarvest,
      bannerUrl: body.bannerUrl,
      farmerId: farmer._id,
      targetAmount: calculatedTargetAmount > 0 ? calculatedTargetAmount : body.targetAmount,
      currentAmount: 0,
      status: body.status || 'Draft',
      investmentTerms: body.investmentTerms,
      returnSimulation: body.returnSimulation,
      activities: body.activities || []
    });

    return NextResponse.json({ success: true, data: newCampaign }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat proyek', error: error.message },
      { status: 500 }
    );
  }
}
