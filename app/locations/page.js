import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { getLocations } from '../../database/locations';

// import LocationsMap from './LocationsMap';

// export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/naming-convention
const LocationsMap = dynamic(() => import('./LocationsMap'), { ssr: false });

export const metadata = {
  title: 'BE BOULDER - locations',
  description:
    'Discover bouldering locations in Austria on a map and get the most important informations.',
  icons: {
    shortcut: '/favicon.svg',
  },
};

export default async function Locations() {
  const locations = await getLocations();
  return (
    <main>
      <div
        className="-mt-6 bg-cover bg-center bg-fixed bg-no-repeat hero min-h-screen"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg") `,
        }}
      >
        <div className="flex flex-col items-center hero-overlay bg-opacity-60 ">
          <h1 className="text-2xl text-white mt-2">
            <b>BE BOULDER</b>
          </h1>
          <div>
            <LocationsMap locations={locations} />
          </div>
          <span className="flex flex-col md:flex-row md:flex-wrap md:justify-center">
            {locations.map((location) => {
              return (
                <div
                  key={`location-${location.id}`}
                  className="card w-80 bg-base-100 shadow-xl hover:shadow-primary my-2 bg-opacity-90 md:mx-2"
                >
                  <Link href={`/locations/${location.id}`}>
                    <div className="card-body items-center text-center">
                      <h3 className="card-title">{location.name}</h3>
                      <figure>
                        <Image
                          className="py-2"
                          src={`/images/${location.id}.jpg`}
                          alt={location.name}
                          width="300"
                          height="300"
                        />
                      </figure>

                      <p>🕑: {location.openingHours}</p>
                    </div>
                  </Link>
                  <a href={location.instagram}>
                    <Image
                      src="/Instagram_logo.svg.webp"
                      alt="instagram"
                      width="25"
                      height="25"
                      className="m-3 -mt-6"
                    />
                  </a>
                </div>
              );
            })}
          </span>
        </div>
      </div>
    </main>
  );
}
