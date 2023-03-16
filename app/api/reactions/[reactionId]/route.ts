import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteReactionById,
  getReactionById,
  ReactionWithUsername,
  updateReactionById,
} from '../../../../database/reactions';
import { getUserBySessionToken } from '../../../../database/users';

const reactionType = z.object({
  content: z.string(),
});

export type ReactionResponseBodyGet =
  | { error: string }
  | { reaction: ReactionWithUsername };

export type ReactionResponseBodyPut =
  | { error: string }
  | { reaction: ReactionWithUsername };

export type ReactionResponseBodyDelete =
  | { error: string }
  | { reaction: ReactionWithUsername };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ReactionResponseBodyGet>> {
  const reactionId = Number(params.reactionId);

  if (!reactionId) {
    return NextResponse.json(
      {
        error: 'Reaction id is not valid',
      },
      { status: 400 },
    );
  }

  const singleReaction = await getReactionById(reactionId);

  if (!singleReaction) {
    return NextResponse.json({ error: 'Reaction not found' }, { status: 400 });
  }

  return NextResponse.json({ reaction: singleReaction });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ReactionResponseBodyDelete>> {
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

  const reactionId = Number(params.reactionId);
  const singleReactionCheck = await getReactionById(reactionId);

  if (!reactionId) {
    return NextResponse.json(
      {
        error: 'Reaction id is not valid',
      },
      { status: 404 },
    );
  }

  if (singleReactionCheck && singleReactionCheck.userId === user.id) {
    const singleReaction = await deleteReactionById(reactionId);

    if (!singleReaction) {
      return NextResponse.json(
        { error: 'Reaction not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ reaction: singleReaction });
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
): Promise<NextResponse<ReactionResponseBodyPut>> {
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

  const reactionId = Number(params.reactionId);
  const singleReactionCheck = await getReactionById(reactionId);

  if (!reactionId) {
    return NextResponse.json(
      {
        error: 'Reaction id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = reactionType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing a needed property',
      },
      { status: 400 },
    );
  }

  if (singleReactionCheck && singleReactionCheck.userId === user.id) {
    const newReaction = await updateReactionById(
      reactionId,
      result.data.content,
    );

    if (!newReaction) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ reaction: newReaction });
  } else {
    return NextResponse.json(
      { error: 'You cannot edit this comment!' },
      { status: 403 },
    );
  }
}
