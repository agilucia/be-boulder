import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getFavoriteByIdWithLocationInfo } from '../../../database/favorites';
import { getImagesByUserId } from '../../../database/images';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import AddImage from './AddImage';
import RemoveImage from './RemoveImage';
import RemoveFavorite from './userfavorites/RemoveFavorite';

type Props = {
  params: { username: string; userId: number };
};

export default async function UserProfile({ params }: Props) {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const currentUser = token && (await getUserBySessionToken(token.value));

  if (!currentUser) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/locations`)
    );
  }

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
      {currentUser.id === user.id ? (
        <AddImage images={images} userId={user.id} />
      ) : (
        ''
      )}
      <span>
        {images.map((image) => {
          return (
            <div
              key={`user-${image.userId}`}
              className="card w-96 bg-base-100 shadow-xl my-2 items-center"
            >
              <figure className="px-10 pt-10">
                <Image
                  src={`${image.imageUrl}`}
                  alt="user generated image"
                  width="200"
                  height="200"
                />
              </figure>
              <div className="card-body items-center text-center">
                <p>{image.caption}</p>
              </div>
              <div className="mb-2 -mt-5">
                <RemoveImage image={image} />
              </div>
            </div>
          );
        })}
      </span>
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
