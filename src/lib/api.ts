import { NextResponse } from 'next/server';
import { z } from 'zod';

export const userCreateSchema = z
  .object({
    email: z.email().max(320),
    name: z.string().trim().min(1).max(100).nullable().optional(),
  })
  .strict();

export const userPatchSchema = userCreateSchema
  .partial()
  .refine(value => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

export const postCreateSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    content: z.string().max(50_000).nullable().optional(),
    published: z.boolean().optional().default(false),
    authorId: z.string().trim().min(1),
  })
  .strict();

export const postPatchSchema = postCreateSchema
  .omit({ authorId: true })
  .partial()
  .refine(value => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

export const projectCreateSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(50_000),
    stack: z.string().max(2_000).optional().default(''),
    highlights: z.string().max(10_000).optional().default(''),
    url: z.url().nullable().optional(),
    githubUrl: z.url().nullable().optional(),
  })
  .strict();

export const projectPatchSchema = projectCreateSchema
  .partial()
  .refine(value => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

export function requireWriteAuth(request: Request): NextResponse | null {
  const key = process.env.API_WRITE_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'Write API is not configured' },
      { status: 503 },
    );
  }

  if (request.headers.get('authorization') !== `Bearer ${key}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

export async function parseBody<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<{ data: T } | { error: NextResponse }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return {
      error: NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }),
    };
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return {
      error: NextResponse.json(
        { error: 'Invalid request body', details: result.error.issues },
        { status: 400 },
      ),
    };
  }

  return { data: result.data };
}
