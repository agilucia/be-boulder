import { UserWithLocationFavorites } from '../database/users';

export function getUserWithLocationFavorites(
  usersWithLocationFavorites: UserWithLocationFavorites[],
) {
  if (typeof usersWithLocationFavorites[0] === 'undefined') {
    throw new Error('No user found');
  }

  const userWithLocationFavorites = {
    id: usersWithLocationFavorites[0].userId,
    userName: usersWithLocationFavorites[0].userName,
    favorites: usersWithLocationFavorites.map((favorite) => {
      return {
        id: favorite.favoriteId,
      };
    }),
    locations: usersWithLocationFavorites.map((location) => {
      return {
        id: location.locationId,
        name: location.locationName,
      };
    }),
  };
  return userWithLocationFavorites;
}
