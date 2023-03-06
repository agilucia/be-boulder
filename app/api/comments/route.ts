import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Comment, createComment } from '../../../database/comments';

const commentType = z.object({
  content: z.string(),
});

export type CommentsResponseBodyPost = { error: string } | { comment: Comment };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentsResponseBodyPost>> {
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

  if (!newComment) {
    return NextResponse.json(
      { error: 'Comment not created!' },
      { status: 500 },
    );
  }

  return NextResponse.json({ comment: newComment });
}
