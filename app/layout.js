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
              <div className="navbar bg-base-100">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                  Home
                </Link>
                <Link
                  href="/locations"
                  className="btn btn-ghost normal-case text-xl"
                >
                  Map
                </Link>
                <Link
                  href="/profile"
                  className="btn btn-ghost normal-case text-xl"
                >
                  Profile
                </Link>
                <Link
                  href="/register"
                  className="btn btn-ghost normal-case text-xl"
                >
                  register
                </Link>
                <Link
                  href="/login"
                  className="btn btn-ghost normal-case text-xl"
                >
                  login
                </Link>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
