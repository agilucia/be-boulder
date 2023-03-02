import './globals.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const metadata = {
  title: {
    default: 'be boulder',
    template: '%s | be boulder',
  },
};

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <div>
              <div className="navbar bg-base-100">
                <Link href="/" className="btn btn-ghost normal-case text-lg">
                  Home
                </Link>
                <Link
                  href="/locations"
                  className="btn btn-ghost normal-case text-lg"
                >
                  Map
                </Link>
                <Link
                  href="/register"
                  className="btn btn-ghost normal-case text-lg"
                >
                  register
                </Link>
                <Link
                  href="/login"
                  className="btn btn-ghost normal-case text-lg"
                >
                  login
                </Link>
                {/* we want to disable prefetch for logout link */}
                <Link href="/logout" prefetch={false}>
                  logout
                </Link>
                {user && user.username}
              </div>
            </div>
          </nav>
        </header>
        {props.children}
      </body>
    </html>
  );
}
