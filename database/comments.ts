import { cache } from 'react';
import { sql } from './connect';

export type Comment = {
  id: number;
  content: string;
};

// get all animals
export const getComments = cache(async () => {
  const comments = await sql<Comment[]>`
    SELECT * FROM comments
  `;

  return comments;
});

// get a single animal
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

export const createComment = cache(async (content: string) => {
  const [comment] = await sql<Comment[]>`
      INSERT INTO comments
        (content)
      VALUES
        (${content})
      RETURNING *
    `;
  return comment;
});

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