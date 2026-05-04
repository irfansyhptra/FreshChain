import { NextResponse } from 'next/server';
import { getFarmerDashboardData } from '@/lib/services/farmer-dashboard.service';

export async function GET() {
  try {
    const data = await getFarmerDashboardData();

    if (!data) {
      return NextResponse.json({ success: false, message: 'Data petani tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data dashboard petani', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
