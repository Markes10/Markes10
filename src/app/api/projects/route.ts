import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseBody, projectCreateSchema, requireWriteAuth } from '@/lib/api';

export const dynamic = 'force-static';

export async function GET() {
  if (process.env.GITHUB_PAGES === 'true') return NextResponse.json([]);

  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const unauthorized = requireWriteAuth(request);
  if (unauthorized) return unauthorized;

  const parsed = await parseBody(request, projectCreateSchema);
  if ('error' in parsed) return parsed.error;
  const { title, description, stack, highlights, url, githubUrl } = parsed.data;

  const project = await db.project.create({
    data: {
      title,
      description,
      stack: stack || '',
      highlights: highlights || '',
      url: url || null,
      githubUrl: githubUrl || null,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
