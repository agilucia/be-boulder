import Map from './components/Map';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>BE BOULDER</h1>
      <div className={styles.map_container}>
        <Map />
      </div>
    </main>
  );
}
