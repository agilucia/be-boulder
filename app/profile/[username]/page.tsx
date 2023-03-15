import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFavoriteByIdWithLocationInfo } from '../../../database/favorites';
import { getImagesByUserId } from '../../../database/images';
import { getUserByUsername } from '../../../database/users';
import AddImage from './AddImage';
import RemoveFavorite from './userfavorites/RemoveFavorite';

type Props = {
  params: { username: string; userId: number };
};

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  // const favorites = await getFavoriteByIdWithLocationInfo(user.id);
  const images = await getImagesByUserId(user.id);

  return (
    <main className="flex flex-col items-center">
      <h1>
        <b>{user.username}</b>
      </h1>
      {/* <p>id: {user.id}</p> */}
      <Link href={`/profile/${user.username}/userfavorites`}>
        <b>SEE MY FAVORITES</b>
      </Link>
      <AddImage images={images} userId={user.id} />

      {/* <span>
        {favorites.map((favorite) => {
          return (
            <div
              key={`location-${favorite.locationId}`}
              className="card w-96 bg-base-100 shadow-xl my-2 items-center"
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
      </span> */}
    </main>
  );
}
