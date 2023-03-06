import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Comment,
  deleteCommentById,
  getCommentById,
  updateCommentById,
} from '../../../../database/comments';

const commentType = z.object({
  content: z.string(),
});

export type CommentResponseBodyGet = { error: string } | { comment: Comment };

export type CommentResponseBodyPut = { error: string } | { comment: Comment };

export type CommentResponseBodyDelete =
  | { error: string }
  | { comment: Comment };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyGet>> {
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

  if (!singleComment) {
    return NextResponse.json({ error: 'Comment not found' }, { status: 400 });
  }

  return NextResponse.json({ comment: singleComment });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyDelete>> {
  const commentId = Number(params.commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 404 },
    );
  }

  const singleComment = await deleteCommentById(commentId);

  if (!singleComment) {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
  }

  return NextResponse.json({ comment: singleComment });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyPut>> {
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

  if (!newComment) {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
  }

  return NextResponse.json({ comment: newComment });
}
