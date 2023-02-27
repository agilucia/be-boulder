import './global.scss';
import Link from 'next/link';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Locations',
  description: 'Look at the map and find the nearest bouldering locations',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>BE BOULDER</h1>
      <Link href="/locations">
        Discover the best bouldering locations in Austria!
      </Link>
    </main>
  );
}
