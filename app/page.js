import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Locations',
  description: 'Look at the map and find the nearest bouldering locations',
};

export default function Home() {
  return (
    <main>
      <h1 className="text-xl text-red-600">BE BOULDER</h1>
      <Link href="/locations">
        Discover the best bouldering locations in Austria!
      </Link>
    </main>
  );
}
