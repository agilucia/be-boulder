import Image from 'next/image';
import Link from 'next/link';
import { getLocations } from '../../database/locations';
import Map from './Map';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Locations',
  description: 'Look at the map and find the nearest bouldering locations',
};

export default async function Locations() {
  const locations = await getLocations();
  return (
    <main>
      <h1>BE BOULDER</h1>
      <div>
        <Map locations={locations} />
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <span>
          {locations.map((location) => {
            return (
              <div key={`location-${location.id}`}>
                <Link href={`/locations/${location.id}`}>
                  <figure>
                    <Image
                      src={`/images/${location.id}.jpg`}
                      alt={location.name}
                      width="200"
                      height="200"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{location.name}</h3>
                    <p>{location.openingHours}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </span>
      </div>
    </main>
  );
}
