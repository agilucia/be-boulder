import Link from 'next/link';
import { getAllUsers } from '../../database/users';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'BE BOULDER - Users',
  description:
    'Discover other users of BE BOULDER and find out more about them by clicking on their profile.',
  icons: {
    shortcut: '/icon_3.svg',
  },
};

export default async function Users() {
  const users = await getAllUsers();
  return (
    <main>
      <div
        className="-mt-6 bg-cover bg-center bg-fixed bg-no-repeat hero min-h-screen"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg") `,
        }}
      >
        <div className="flex flex-col items-center text-black hero-overlay bg-opacity-60">
          <div className="card w-96 bg-base-100 shadow-xl my-2 items-center pb-4 mt-4 bg-opacity-90">
            <h1 className="text-xl mt-4">
              <b>Get to know other users:</b>
            </h1>

            <br />
            <span>
              {users.map((user) => {
                return (
                  <div key={`user-${user.id}`}>
                    <Link href={`/profile/${user.username}`}>
                      <h3>
                        {user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)}
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
