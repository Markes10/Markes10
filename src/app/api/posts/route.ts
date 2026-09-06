import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseBody, postCreateSchema, requireWriteAuth } from '@/lib/api';

export const dynamic = 'force-static';

export async function GET() {
  if (process.env.GITHUB_PAGES === 'true') return NextResponse.json([]);

  const posts = await db.post.findMany({
    include: { author: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const unauthorized = requireWriteAuth(request);
  if (unauthorized) return unauthorized;

  const parsed = await parseBody(request, postCreateSchema);
  if ('error' in parsed) return parsed.error;
  const { title, content, published, authorId } = parsed.data;

  const author = await db.user.findUnique({ where: { id: authorId } });
  if (!author) {
    return NextResponse.json({ error: 'Author not found' }, { status: 404 });
  }

  const post = await db.post.create({
    data: {
      title,
      content: content || null,
      published: published ?? false,
      authorId,
    },
    include: { author: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(post, { status: 201 });
}
