import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseBody, requireWriteAuth, userCreateSchema } from '@/lib/api';

export async function GET() {
  const users = await db.user.findMany({
    include: { posts: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const unauthorized = requireWriteAuth(request);
  if (unauthorized) return unauthorized;

  const parsed = await parseBody(request, userCreateSchema);
  if ('error' in parsed) return parsed.error;
  const { email, name } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: 'Email already exists' },
      { status: 409 },
    );
  }

  const user = await db.user.create({
    data: { email, name: name || null },
  });

  return NextResponse.json(user, { status: 201 });
}
