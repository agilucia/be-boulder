import { cookies } from 'next/headers';
import Image from 'next/image';
// import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getCommentsForLocation } from '../../../database/comments';
import { getFavorites } from '../../../database/favorites';
import { getLocation } from '../../../database/locations';
import { getUserBySessionToken } from '../../../database/users';
import AddFavorite from './AddFavorite';
import CommentForm from './CommentForm';
import { locationNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    locationId: string;
    // userId: string;
  };
};

export async function generateMetadata(props: Props) {
  const singleLocation = await getLocation(parseInt(props.params.locationId));

  if (!singleLocation) {
    return locationNotFoundMetadata;
  }

  return {
    title: `BE BOULDER - ${singleLocation.name}`,
    description: `Discover all information about ${singleLocation.name} and add it to your favorites`,
    icons: {
      shortcut: '/icon_3.svg',
    },
  };
}

export default async function LocationPage(props: Props) {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  const singleLocation = await getLocation(parseInt(props.params.locationId));

  if (!user) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/locations/${props.params.locationId}`)
    );
  }

  if (!singleLocation) {
    // throw new error
    notFound();
  }

  const comments = await getCommentsForLocation(singleLocation.id);

  const favorites = await getFavorites(singleLocation.id);

  return (
    <main>
      <div
        className="-mt-6 bg-cover bg-center bg-fixed bg-no-repeat hero min-h-screen"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg") `,
        }}
      >
        <div className="flex flex-col items-center hero-overlay bg-opacity-60">
          <div className="card w-96 bg-base-100 shadow-xl my-2 flex bg-opacity-90">
            <div className="card-body -mt-12">
              <div className="self-end ">
                <AddFavorite
                  favorites={favorites}
                  locationId={singleLocation.id}
                  userId={user.id}
                />
              </div>
              <h1 className="card-title">{singleLocation.name} </h1>
              <figure>
                <Image
                  src={`/images/${singleLocation.id}.jpg`}
                  alt={singleLocation.name}
                  width="350"
                  height="350"
                  className="py-5"
                />
              </figure>

              <p>{singleLocation.description}</p>
              <div>
                <div className="py-1">
                  <b>📍Address:</b> {singleLocation.address}
                </div>

                <div className="py-1">
                  <b>🕑Opening hours:</b> {singleLocation.openingHours}
                </div>

                <div className="py-1">
                  <b>💰{singleLocation.price}</b>
                </div>

                <div className="py-1">
                  <b>🌐Got to their website:</b>{' '}
                  <a href={singleLocation.website}>{singleLocation.website}</a>
                </div>

                <div className="py-1">
                  <a href={singleLocation.instagram}>
                    <Image
                      src="/Instagram_logo.svg.webp"
                      alt="instagram"
                      width="25"
                      height="25"
                    />
                  </a>
                </div>
              </div>

              <CommentForm
                comments={comments}
                locationId={singleLocation.id}
                userId={user.id}
                userName={user.username}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
