import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-static';

export async function GET() {
  if (process.env.GITHUB_PAGES === 'true') {
    return NextResponse.json({ status: 'static', database: 'unavailable' });
  }

  try {
    // Verify database connectivity
    await db.user.count();
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch {
    return NextResponse.json(
      { status: 'error', database: 'disconnected' },
      { status: 503 },
    );
  }
}
