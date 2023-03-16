import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createReaction,
  ReactionWithUsername,
} from '../../../database/reactions';
import { getUserBySessionToken } from '../../../database/users';

const reactionType = z.object({
  content: z.string(),
  imageId: z.number(),
  userName: z.string(),
});

export type ReactionsResponseBodyPost =
  | { error: string }
  | { reaction: ReactionWithUsername };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ReactionsResponseBodyPost>> {
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

  const result = reactionType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing the needed property content',
      },
      { status: 400 },
    );
  }

  const newReaction = await createReaction(
    result.data.content,
    result.data.imageId,
    user.id,
    result.data.userName,
  );

  if (!newReaction) {
    return NextResponse.json(
      { error: 'Reaction not created!' },
      { status: 500 },
    );
  }

  return NextResponse.json({ reaction: newReaction });
}
