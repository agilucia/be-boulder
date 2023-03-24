import { cache } from 'react';
import { sql } from './connect';

export type Reaction = {
  id: number;
  content: string;
  imageId: number;
  userId: number;
};

export type ReactionWithUsername = {
  id: number;
  content: string;
  userId: number | null;
  imageId: number | null;
  userName: string | null;
};

export const getReactionForImageWithUsername = cache(
  async (imageId: number | null) => {
    const reactionsWithUsername = await sql<ReactionWithUsername[]>`
  SELECT
    *
  FROM
    reactions
  INNER JOIN
    users ON reactions.user_id = users.id
  WHERE
    reactions.image_id = ${imageId || null}
    `;

    return reactionsWithUsername;
  },
);

// get all reactions for single image
export const getReactionsForImage = cache(async (imageId: number) => {
  const reactions = await sql<ReactionWithUsername[]>`
    SELECT * FROM reactions WHERE reactions.image_id = ${imageId}
  `;

  return reactions;
});

// get a single reaction
export const getReactionById = cache(async (id: number) => {
  const [reaction] = await sql<ReactionWithUsername[]>`
    SELECT
      *
    FROM
      reactions
    WHERE
      id = ${id}
  `;
  return reaction;
});

export const createReaction = cache(
  async (
    content: string,
    imageId: number,
    userId: number,
    userName: string,
  ) => {
    const [reaction] = await sql<ReactionWithUsername[]>`
    INSERT INTO reactions
      (content, image_id, user_id, user_name)
    VALUES
      (${content}, ${imageId}, ${userId}, ${userName})
    RETURNING *
  `;
    return reaction;
  },
);

export const updateReactionById = cache(async (id: number, content: string) => {
  const [reaction] = await sql<ReactionWithUsername[]>`
    UPDATE
      reactions
    SET
      content = ${content}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return reaction;
});

export const deleteReactionById = cache(async (id: number) => {
  const [reaction] = await sql<ReactionWithUsername[]>`
    DELETE FROM
      reactions
    WHERE
      id = ${id}
    RETURNING *
  `;
  return reaction;
});
