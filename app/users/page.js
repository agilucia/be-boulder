import Link from 'next/link';
import { getAllUsers } from '../../database/users';

export const metadata = {
  title: 'Users',
  description: 'Get to know different users',
};

export default async function Users() {
  const users = await getAllUsers();
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl">
        <b>USERS:</b>
      </h1>
      <p>Get to know other users</p>
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
    </main>
  );
}
