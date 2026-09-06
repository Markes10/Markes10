import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseBody, postPatchSchema, requireWriteAuth } from '@/lib/api';

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
  const post = await db.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, email: true } } },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireWriteAuth(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const parsed = await parseBody(request, postPatchSchema);
  if ('error' in parsed) return parsed.error;
  const { title, content, published } = parsed.data;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const post = await db.post.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
      ...(published !== undefined && { published }),
    },
    include: { author: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireWriteAuth(_request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  await db.post.delete({ where: { id } });
  return NextResponse.json({ message: 'Post deleted' });
}
