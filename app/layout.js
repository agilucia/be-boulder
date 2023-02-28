import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: {
    default: 'be boulder',
    template: '%s | be boulder',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <div>
              <div>
                <Link href="/">Home</Link>
                <Link href="/locations">Map</Link>
                <Link href="/profile">Profile</Link>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
