import '../global.scss';
import Link from 'next/link';
import { getLocations } from '../../database/locations';
import Map from '../components/Map';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Locations',
  description: 'Look at the map and find the nearest bouldering locations',
};

export default async function Locations() {
  const locations = await getLocations();
  return (
    <main className={styles.main}>
      <h1>BE BOULDER</h1>
      <div className={styles.map_container}>
        <Map />
      </div>
      <div>
        <span>
          {locations.map((location) => {
            return (
              <div key={`location-${location.id}`}>
                <Link href={`/locations/${location.id}`}>
                  <h3>{location.name}</h3>
                </Link>
              </div>
            );
          })}
        </span>
      </div>
    </main>
  );
}
