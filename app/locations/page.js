import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { getLocations } from '../../database/locations';

// import Map from './Map';

// export const dynamic = 'force-dynamic';

const Map = dynamic(() => import('./Map'), { ssr: false });

export const metadata = {
  title: 'Locations',
  description: 'Look at the map and find the nearest bouldering locations',
};

export default async function Locations() {
  const locations = await getLocations();
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl">
        <b>BE BOULDER</b>
      </h1>
      <div>
        <Map locations={locations} />
      </div>
      <span>
        {locations.map((location) => {
          return (
            <div
              key={`location-${location.id}`}
              className="card w-96 bg-base-100 shadow-xl my-2"
            >
              <Link href={`/locations/${location.id}`}>
                <figure className="px-10 pt-10">
                  <Image
                    className="py-2"
                    src={`/images/${location.id}.jpg`}
                    alt={location.name}
                    width="200"
                    height="200"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{location.name}</h3>
                  <p>{location.openingHours}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </span>
    </main>
  );
}
