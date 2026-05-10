import { NextResponse } from 'next/server';
import { Campaign } from '@/lib/models/Campaign';
import { User } from '@/lib/models/User';
import dbConnect from '@/lib/mongodb/client';

export async function GET() {
  try {
    await dbConnect();

    // Authenticate farmer
    const farmer = await User.findOne({ role: 'Petani' });
    if (!farmer) {
      return NextResponse.json({ success: false, message: 'Farmer not found' }, { status: 404 });
    }

    // Fetch draft campaigns
    const drafts = await Campaign.find({
      farmerId: farmer._id,
      status: 'Draft'
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: drafts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch draft campaigns', error: error.message },
      { status: 500 }
    );
  }
}
