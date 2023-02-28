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
      <div>
        <span>
          {locations.map((location) => {
            return (
              <div key={`location-${location.id}`}>
                <Link href={`/locations/${location.id}`}>
                  <h3>{location.name}</h3>
                  <div>{location.openingHours}</div>
                  <Image
                    src={`/images/${location.id}.jpg`}
                    alt={location.name}
                    width="200"
                    height="200"
                  />
                </Link>
              </div>
            );
          })}
        </span>
      </div>
    </main>
  );
}
