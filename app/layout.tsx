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
      <body className="mt-6">
        {/* <header> */}
        {/* <nav>
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
                </div> */}

        {/* <Link
                  href="/register"
                  classNameName="btn btn-ghost normal-case text-lg"
                >
                  register
                </Link>
                <Link
                  href="/login"
                  classNameName="btn btn-ghost normal-case text-lg"
                >
                  login
                </Link>
                {/* we want to disable prefetch for logout link */}
        {/* <Link
                  classNameName="btn btn-ghost normal-case text-lg"
                  href="/logout"
                  prefetch={false}
                >
                  logout
                </Link>
                {user && user.username} */}
        {/* </div>
            </div>
          </nav>
        </header> */}

        {props.children}
        <div className="btm-nav">
          <Link href="/">
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
          </Link>
          <Link href="/locations">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </Link>
          <button className="dropdown dropdown-top dropdown-end h-5 w-5">
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36">
              {user ? (
                <>
                  <li>
                    <Link
                      href={`/profile/${user.username}`}
                      className="btn btn-ghost normal-case text-lg"
                    >
                      {user.username}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logout"
                      prefetch={false}
                      className="btn btn-ghost normal-case text-lg"
                    >
                      logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/register"
                      className="btn btn-ghost normal-case text-lg"
                    >
                      register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="btn btn-ghost normal-case text-lg"
                    >
                      login
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content mb-16">
          <div>
            <p>Copyright © 2023 - All right reserved by BE BOULDER</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
