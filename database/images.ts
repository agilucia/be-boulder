import { cache } from 'react';
import { sql } from './connect';

export type Image = {
  id: number;
  imageUrl: string;
  caption: string;
  userId: number;
};

// get all images
export const getImages = cache(async () => {
  const images = await sql<Image[]>`
  SELECT * FROM images
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
