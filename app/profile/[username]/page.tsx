import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getFavoriteByIdWithLocationInfo,
  getFavorites,
} from '../../../database/favorites';
import { getUserByUsername } from '../../../database/users';
import RemoveFavorite from './RemoveFavorite';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  // const favorites = await getFavorites(user.id);
  const favorites = await getFavoriteByIdWithLocationInfo(user.id);

  const favoritesLol = await getFavorites(user.id);

  return (
    <main className="flex flex-col items-center">
      <h1>{user.username}</h1>
      <p>id: {user.id}</p>
      <div>MY FAVORITES:</div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <span>
          {favorites.map((favorite) => {
            return (
              <div key={`location-${favorite.locationId}`}>
                <Link href={`/locations/${favorite.locationId}`}>
                  <figure className="px-10 pt-10">
                    <Image
                      src={`/images/${favorite.locationId}.jpg`}
                      alt="location image"
                      width="200"
                      height="200"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h3 className="card-title">{favorite.locationName}</h3>
                    <p>{favorite.locationOpeningHours}</p>
                  </div>
                </Link>
                <RemoveFavorite
                  favorites={favoritesLol}
                  locationId={favorite.locationId}
                  userId={user.id}
                />
              </div>
            );
          })}
        </span>
      </div>
    </main>
  );
}
