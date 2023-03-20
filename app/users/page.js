import Link from 'next/link';
import { getAllUsers } from '../../database/users';

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
        className="-mt-6 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat "
        style={{
          backgroundImage: `url("/images/climbing_wall_background.jpg")`,
        }}
      >
        <div className="flex flex-col items-center text-black">
          <div className="card w-96 bg-base-100 shadow-xl my-2 items-center pb-4 mt-4">
            <h1 className="text-2xl mt-4">
              <b>USERS:</b>
            </h1>
            <br />
            <p>Get to know other users</p>
            <br />
            <span>
              {users.map((user) => {
                return (
                  <div key={`user-${user.id}`}>
                    <Link href={`/profile/${user.username}`}>
                      <h3>{user.username}</h3>
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
