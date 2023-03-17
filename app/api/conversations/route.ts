import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Conversation,
  createConversation,
} from '../../../database/conversations';
import { getUserBySessionToken } from '../../../database/users';

const conversationType = z.object({
  content: z.string(),
  userName: z.string(),
});

export type ConversationsResponseBodyPost =
  | { error: string }
  | { conversation: Conversation };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ConversationsResponseBodyPost>> {
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

  const result = conversationType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing the needed property content',
      },
      { status: 400 },
    );
  }

  const newConversation = await createConversation(
    result.data.content,
    user.id,
    result.data.userName,
  );

  if (!newConversation) {
    return NextResponse.json(
      { error: 'Conversation not created!' },
      { status: 500 },
    );
  }

  return NextResponse.json({ conversation: newConversation });
}
