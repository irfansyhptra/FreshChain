import { NextResponse } from 'next/server';
import { getInvestorDashboardData } from '@/lib/services/investor-dashboard.service';

export async function GET() {
  try {
    const data = await getInvestorDashboardData();

    if (!data) {
      return NextResponse.json({ success: false, message: 'Data investor tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data dashboard investor', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
