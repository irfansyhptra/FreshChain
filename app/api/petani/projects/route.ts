import { NextResponse } from 'next/server';
import { getActiveFarmProjects } from '@/lib/services/farm-project.service';

export async function GET() {
  try {
    const projects = await getActiveFarmProjects();

    return NextResponse.json({ success: true, data: projects });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data proyek petani', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
