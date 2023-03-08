import { cache } from 'react';
import { sql } from './connect';

export type Comment = {
  id: number;
  content: string;
  locationId: number;
  userId: number;
};

// get all comments for single location
export const getCommentsForLocation = cache(async (locationId: number) => {
  const comments = await sql<Comment[]>`
    SELECT * FROM comments WHERE comments.location_id = ${locationId}
  `;

  return comments;
});

// get a single comment
export const getCommentById = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
    SELECT
      *
    FROM
      comments
    WHERE
      id = ${id}
  `;
  return comment;
});

export const createComment = cache(
  async (content: string, locationId: number, userId: number) => {
    const [comment] = await sql<Comment[]>`
      INSERT INTO comments
        (content, location_id, user_id)
      VALUES
        (${content}, ${locationId}, ${userId})
      RETURNING *
    `;
    return comment;
  },
);

export const updateCommentById = cache(async (id: number, content: string) => {
  const [comment] = await sql<Comment[]>`
      UPDATE
        comments
      SET
        content = ${content}
      WHERE
        id = ${id}
      RETURNING *
    `;
  return comment;
});

export const deleteCommentById = cache(async (id: number) => {
  const [comment] = await sql<Comment[]>`
    DELETE FROM
      comments
    WHERE
      id = ${id}
    RETURNING *
  `;
  return comment;
});
