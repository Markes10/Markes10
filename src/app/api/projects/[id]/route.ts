import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseBody, projectPatchSchema, requireWriteAuth } from '@/lib/api';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireWriteAuth(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const parsed = await parseBody(request, projectPatchSchema);
  if ('error' in parsed) return parsed.error;
  const { title, description, stack, highlights, url, githubUrl } = parsed.data;

  const existing = await db.project.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const project = await db.project.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(stack !== undefined && { stack }),
      ...(highlights !== undefined && { highlights }),
      ...(url !== undefined && { url }),
      ...(githubUrl !== undefined && { githubUrl }),
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireWriteAuth(_request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const existing = await db.project.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  await db.project.delete({ where: { id } });
  return NextResponse.json({ message: 'Project deleted' });
}
