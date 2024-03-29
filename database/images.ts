import { cache } from 'react';
import { sql } from './connect';

export type Image = {
  id: number;
  imageUrl: string | null;
  caption: string | null;
  userId: number | null;
};

// get all images
export const getImages = cache(async () => {
  const images = await sql<Image[]>`
  SELECT * FROM images
  `;

  return images;
});

// get images for single user
export const getImagesByUserId = cache(async (userId: number) => {
  const images = await sql<Image[]>`
  SELECT
    *
  FROM
    images
  WHERE
    images.user_id = ${userId}
  `;

  return images;
});

// get single image by id
export const getImageById = cache(async (id: number) => {
  const [image] = await sql<Image[]>`
  SELECT
   *
  FROM
    images
  WHERE
    id = ${id}
  `;

  return image;
});

// create an image
export const createImage = cache(
  async (imageUrl: string, caption: string, userId: number) => {
    const [image] = await sql<Image[]>`
  INSERT INTO images
    (image_url, caption, user_id)
  VALUES
    (${imageUrl}, ${caption}, ${userId})
  RETURNING *
  `;

    return image;
  },
);

// delete image by
export const deleteImageById = cache(async (id: number) => {
  const [image] = await sql<Image[]>`
  DELETE FROM
    images
  WHERE
    id = ${id}
  RETURNING *
  `;

  return image;
});
