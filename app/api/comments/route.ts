import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Comment, createComment } from '../../../database/comments';
import { getUserBySessionToken } from '../../../database/users';

const commentType = z.object({
  content: z.string(),
  locationId: z.number(),
  // userId: z.number(),
});

export type CommentsResponseBodyPost = { error: string } | { comment: Comment };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentsResponseBodyPost>> {
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

  const newComment = await createComment(
    result.data.content,
    result.data.locationId,
    user.id,
  );

  if (!newComment) {
    return NextResponse.json(
      { error: 'Comment not created!' },
      { status: 500 },
    );
  }

  return NextResponse.json({ comment: newComment });
}
