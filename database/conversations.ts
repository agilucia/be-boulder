import { cache } from 'react';
import { sql } from './connect';

export type Conversation = {
  id: number;
  content: string;
  userId: number | null;
  userName: string | null;
};

export const getConversations = cache(async () => {
  const conversations = await sql<Conversation[]>`
    SELECT * FROM conversations
  `;
  return conversations;
});

// get a single conversation
export const getConversationById = cache(async (id: number) => {
  const [conversation] = await sql<Conversation[]>`
    SELECT
      *
    FROM
      conversations
    WHERE
      id = ${id}
  `;
  return conversation;
});

export const createConversation = cache(
  async (content: string, userId: number, userName: string) => {
    const [conversation] = await sql<Conversation[]>`
    INSERT INTO conversations
      (content, user_id, user_name)
    VALUES
      (${content}, ${userId}, ${userName})
    RETURNING *
  `;
    return conversation;
  },
);

export const updateConversationById = cache(
  async (id: number, content: string) => {
    const [conversation] = await sql<Conversation[]>`
    UPDATE
      conversations
    SET
      content = ${content}
    WHERE
      id = ${id}
    RETURNING *
  `;
    return conversation;
  },
);

export const deleteConversationById = cache(async (id: number) => {
  const [conversation] = await sql<Conversation[]>`
    DELETE FROM
      conversations
    WHERE
      id = ${id}
    RETURNING *
  `;
  return conversation;
});
