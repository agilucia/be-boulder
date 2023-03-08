import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  locationId: number;
  userId: number;
};

// get all favorites for single user
export const getFavorites = cache(async (userId: number) => {
  const favorites = await sql<Favorite[]>`
  SELECT * FROM favorites WHERE favorites.user_id = ${userId}
  `;

  return favorites;
});

// get a single favorite
export const getFavoriteById = cache(async (id: number) => {
  const [favorite] = await sql<Favorite[]>`
  SELECT
    *
  FROM
    favorites
  WHERE
    id = ${id}
  `;

  return favorite;
});

export const createFavorite = cache(
  async (locationId: number, userId: number) => {
    const [favorite] = await sql<Favorite[]>`
    INSERT INTO favorites
     (location_id, user_id)
    VALUES
      (${locationId}, ${userId})
    RETURNING *
  `;

    return favorite;
  },
);

export const deleteFavoriteById = cache(async (id: number) => {
  const [favorite] = await sql<Favorite[]>`
    DELETE FROM
      favorites
    WHERE
      id = ${id}
    RETURNING *
  `;
  return favorite;
});

export type FavoriteWithLocationInfo = {
  favoriteId: number;
  locationId: number;
  locationName: string;
  locationOpeningHours: string;
  userId: number;
};

export const getFavoriteByIdWithLocationInfo = cache(async (userId: number) => {
  const favoritesWithLocationInfo = await sql<FavoriteWithLocationInfo[]>`
  SELECT
    favorites.id AS favorite_id,
    locations.id AS location_id,
    locations.name AS location_name,
    locations.opening_hours AS location_opening_hours
  FROM
    favorites
  INNER JOIN
    locations ON favorites.location_id = locations.id
  WHERE
    favorites.user_id = ${userId}
  `;
  return favoritesWithLocationInfo;
});
