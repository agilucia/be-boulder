import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFavoriteByIdWithLocationInfo } from '../../../../database/favorites';
import { getUserByUsername } from '../../../../database/users';
import { profileNotFoundMetadata } from '../not-found';
import RemoveFavorite from './RemoveFavorite';

export const dynamic = 'force-dynamic';

type Props = {
  params: { username: string; userId: number };
};

export async function generateMetadata({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return profileNotFoundMetadata;
  }

  return {
    title: `BE BOULDER - ${user.username}'s favorites`,
    description: `Discover ${user.username}'s favorite locations`,
    icons: {
      shortcut: '/favicon.svg',
    },
  };
}

export default async function UserFavorites({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const favorites = await getFavoriteByIdWithLocationInfo(user.id);

  return (
    <main>
      <div
        className="-mt-6 bg-cover bg-center bg-fixed bg-no-repeat hero min-h-screen"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg") `,
        }}
      >
        <div className="flex flex-col items-center hero-overlay bg-opacity-60">
          <h1 className="text-2xl text-white mt-4">
            <b>MY FAVORITES:</b>
          </h1>

          <span>
            {favorites.map((favorite) => {
              return (
                <div
                  key={`location-${favorite.locationId}`}
                  className="card w-80 bg-base-100 shadow-xl my-2 items-center"
                >
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
                  <div className="mb-2 -mt-5">
                    <RemoveFavorite favorite={favorite} />
                  </div>
                </div>
              );
            })}
          </span>
        </div>
      </div>
    </main>
  );
}
