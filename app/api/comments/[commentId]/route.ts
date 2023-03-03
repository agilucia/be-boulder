import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteCommentById,
  getCommentById,
  updateCommentById,
} from '../../../../database/comments';

const commentType = z.object({
  content: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const singleComment = await getCommentById(commentId);

  return NextResponse.json({ comment: singleComment });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const singleComment = await deleteCommentById(commentId);

  return NextResponse.json({ comment: singleComment });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = commentType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing the needed property content',
      },
      { status: 400 },
    );
  }

  const newComment = await updateCommentById(commentId, result.data.content);

  return NextResponse.json({ comment: newComment });
}
