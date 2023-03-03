import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createComment } from '../../../database/comments';

const commentType = z.object({
  content: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = commentType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missnig the needed property content',
      },
      { status: 400 },
    );
  }

  const newComment = await createComment(result.data.content);

  return NextResponse.json({ comment: newComment });
}
