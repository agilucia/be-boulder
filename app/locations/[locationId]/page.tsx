import { cookies } from 'next/headers';
import Image from 'next/image';
// import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getCommentsForLocation } from '../../../database/comments';
import { getLocation } from '../../../database/locations';
import { getValidSessionByToken } from '../../../database/sessions';
import CommentForm from './CommentForm';
import { locationNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    locationId: string;
  };
};

export async function generateMetadata(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // for example you may also check if session user is an admin role

  if (!session) {
    redirect(`/login?returnTo=/locations/${props.params.locationId}`);
  }

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
  const singleLocation = await getLocation(parseInt(props.params.locationId));

  if (!singleLocation) {
    // throw new error
    notFound();
  }

  const comments = await getCommentsForLocation(singleLocation.id);

  return (
    <main className="flex flex-col items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <Image
            src={`/images/${singleLocation.id}.jpg`}
            alt={singleLocation.name}
            width="200"
            height="200"
            className="py-5"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title">
            {singleLocation.name} <button>📌</button>
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

          <CommentForm comments={comments} locationId={singleLocation.id} />
        </div>
      </div>
    </main>
  );
}
