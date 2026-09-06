import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseBody, requireWriteAuth, userPatchSchema } from '@/lib/api';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'static' }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (process.env.GITHUB_PAGES === 'true') {
    return NextResponse.json(
      { error: 'API unavailable on GitHub Pages' },
      { status: 404 },
    );
  }
  const { id } = await params;
  const user = await db.user.findUnique({
    where: { id },
    include: { posts: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireWriteAuth(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const parsed = await parseBody(request, userPatchSchema);
  if ('error' in parsed) return parsed.error;
  const { name, email } = parsed.data;

  const existing = await db.user.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const user = await db.user.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireWriteAuth(_request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const existing = await db.user.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  await db.user.delete({ where: { id } });
  return NextResponse.json({ message: 'User deleted' });
}
