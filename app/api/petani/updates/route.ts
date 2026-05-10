import { NextResponse } from 'next/server';
import { getLiveFarmUpdates } from '@/lib/services/farm-update.service';

export async function GET() {
  try {
    const updates = await getLiveFarmUpdates();

    return NextResponse.json({ success: true, data: updates });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data update petani', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
