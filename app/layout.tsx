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
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <div>
              <div className="navbar bg-base-100 justify-center">
                <Link href="/" className="btn btn-ghost normal-case text-lg">
                  Home
                </Link>
                <Link
                  href="/locations"
                  className="btn btn-ghost normal-case text-lg"
                >
                  Map
                </Link>
                <div>
                  {user ? (
                    <>
                      <Link
                        href={`/profile/${user.username}`}
                        className="btn btn-ghost normal-case text-lg"
                      >
                        {user.username}
                      </Link>
                      <Link
                        href="/logout"
                        prefetch={false}
                        className="btn btn-ghost normal-case text-lg"
                      >
                        logout
                      </Link>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                {/* <Link
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
                {/* <Link
                  className="btn btn-ghost normal-case text-lg"
                  href="/logout"
                  prefetch={false}
                >
                  logout
                </Link>
                {user && user.username} */}
              </div>
            </div>
          </nav>
        </header>
        <div className="btm-nav">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
          <button className="active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
        </div>
        {props.children}
      </body>
    </html>
  );
}
