import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Conversation,
  deleteConversationById,
  getConversationById,
  updateConversationById,
} from '../../../../database/conversations';
import { getUserBySessionToken } from '../../../../database/users';

const conversationType = z.object({
  content: z.string(),
});

export type ConversationResponseBodyGet =
  | { error: string }
  | { conversation: Conversation };

export type ConversationResponseBodyPut =
  | { error: string }
  | { conversation: Conversation };

export type ConversationResponseBodyDelete =
  | { error: string }
  | { conversation: Conversation };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ConversationResponseBodyGet>> {
  const conversationId = Number(params.conversationId);

  if (!conversationId) {
    return NextResponse.json(
      {
        error: 'Conversation id is not valid',
      },
      { status: 400 },
    );
  }

  const singleConversation = await getConversationById(conversationId);

  if (!singleConversation) {
    return NextResponse.json(
      { error: 'Conversation not found' },
      { status: 400 },
    );
  }

  return NextResponse.json({ conversation: singleConversation });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ConversationResponseBodyDelete>> {
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

  const conversationId = Number(params.conversationId);
  const singleConversationCheck = await getConversationById(conversationId);

  if (!conversationId) {
    return NextResponse.json(
      {
        error: 'Conversation id is not valid',
      },
      { status: 404 },
    );
  }

  if (singleConversationCheck && singleConversationCheck.userId === user.id) {
    const singleConversation = await deleteConversationById(conversationId);

    if (!singleConversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ conversation: singleConversation });
  } else {
    return NextResponse.json(
      { error: 'You cannot delete this conversation!' },
      { status: 403 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ConversationResponseBodyPut>> {
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

  const conversationId = Number(params.conversationId);
  const singleConversationCheck = await getConversationById(conversationId);

  if (!conversationId) {
    return NextResponse.json(
      {
        error: 'Conversation id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = conversationType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing a needed property',
      },
      { status: 400 },
    );
  }

  if (singleConversationCheck && singleConversationCheck.userId === user.id) {
    const newConversation = await updateConversationById(
      conversationId,
      result.data.content,
    );

    if (!newConversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ conversation: newConversation });
  } else {
    return NextResponse.json(
      { error: 'You cannot edit this conversation!' },
      { status: 403 },
    );
  }
}
