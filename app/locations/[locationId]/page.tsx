import Image from 'next/image';
// import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocation } from '../../../database/locations';
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

  return (
    <main>
      <div>
        <h1>{singleLocation.name}</h1>
        <Image
          src={`/images/${singleLocation.id}.jpg`}
          alt={singleLocation.name}
          width="200"
          height="200"
        />
        <p>{singleLocation.description}</p>
        <div>
          Address: {singleLocation.address}
          <br />
          Opening hours: {singleLocation.openingHours}
          <br />
          {singleLocation.price}
          <br />
          Got to their website:{' '}
          <a href={singleLocation.website}>{singleLocation.website}</a>
        </div>
      </div>
    </main>
  );
}
