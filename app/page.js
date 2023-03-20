import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'BE BOULDER',
  description:
    'Discover bouldering locations in Austria on a map and get the most important informations.',
  icons: {
    shortcut: '/icon_3.svg',
  },
};

export default function Home() {
  return (
    <main>
      <div
        className="hero min-h-screen -mt-6"
        style={{
          backgroundImage: `url("/images/hero.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">BE BOULDER</h1>
            <p className="mb-5">
              Discover the best bouldering locations in Austria!
            </p>

            <Link href="/locations" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
