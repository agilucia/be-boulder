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
    title: singleLocation.name,
    description: `Discover all information about ${singleLocation.name} and add it to your favorites`,
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
    <main className="flex flex-col items-center">
      <div className="card w-96 bg-base-100 shadow-xl my-2">
        <figure>
          <Image
            src={`/images/${singleLocation.id}.jpg`}
            alt={singleLocation.name}
            width="300"
            height="300"
            className="py-5"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title">
            {singleLocation.name}{' '}
            <AddFavorite
              favorites={favorites}
              locationId={singleLocation.id}
              userId={user.id}
            />
          </h1>
          <p>{singleLocation.description}</p>
          <div>
            <b>Address:</b> {singleLocation.address}
            <br />
            <b>Opening hours:</b> {singleLocation.openingHours}
            <br />
            <b>{singleLocation.price}</b>
            <br />
            <b>Got to their website:</b>{' '}
            <a href={singleLocation.website}>{singleLocation.website}</a>
          </div>

          <CommentForm
            comments={comments}
            locationId={singleLocation.id}
            userId={user.id}
            userName={user.username}
          />
        </div>
      </div>
    </main>
  );
}
