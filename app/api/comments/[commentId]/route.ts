import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Comment,
  deleteCommentById,
  getCommentById,
  updateCommentById,
} from '../../../../database/comments';
import { getUserBySessionToken } from '../../../../database/users';

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
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const commentId = Number(params.commentId);
  const singleCommentCheck = await getCommentById(commentId);

  if (!commentId) {
    return NextResponse.json(
      {
        error: 'Comment id is not valid',
      },
      { status: 404 },
    );
  }

  if (singleCommentCheck && singleCommentCheck.userId === user.id) {
    const singleComment = await deleteCommentById(commentId);

    if (!singleComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ comment: singleComment });
  } else {
    return NextResponse.json(
      { error: 'You cannot delete this comment!' },
      { status: 403 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CommentResponseBodyPut>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const commentId = Number(params.commentId);
  const singleCommentCheck = await getCommentById(commentId);

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
        error: 'Request body is missing a needed property',
      },
      { status: 400 },
    );
  }

  if (singleCommentCheck && singleCommentCheck.userId === user.id) {
    const newComment = await updateCommentById(commentId, result.data.content);

    if (!newComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ comment: newComment });
  } else {
    return NextResponse.json(
      { error: 'You cannot edit this comment!' },
      { status: 403 },
    );
  }
}
