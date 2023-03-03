import Image from 'next/image';
// import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getComments } from '../../../database/comments';
import { getLocation } from '../../../database/locations';
import CommentForm from './CommentForm';
import { locationNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    locationId: string;
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
  const singleLocation = await getLocation(parseInt(props.params.locationId));

  if (!singleLocation) {
    // throw new error
    notFound();
  }

  const comments = await getComments();

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
          <h1 className="card-title">{singleLocation.name}</h1>
          <p>{singleLocation.description}</p>
          <div>
            <b>Address:</b> {singleLocation.address}
            <br />
            <b>Opening hours:</b> {singleLocation.openingHours}
            <br />
            {singleLocation.price}
            <br />
            <b>Got to their website:</b>{' '}
            <a href={singleLocation.website}>{singleLocation.website}</a>
          </div>

          <CommentForm comments={comments} />
        </div>
      </div>
    </main>
  );
}
