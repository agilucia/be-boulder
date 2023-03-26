import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getConversations } from '../../database/conversations';
import { getUserBySessionToken } from '../../database/users';
import ConversationForm from './ConversationForm';

export const dynamic = 'force-dynamic';

// type Props = {
//   params: { username: string; userId: number; conversationId: string };
// };

export const metadata = {
  title: 'BE BOULDER - Lobby',
  description:
    'Use this lobby to chat with other users and talk about your bouldering habits and experiences.',
  icons: {
    shortcut: '/favicon.svg',
  },
};

export default async function Conversations() {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/conversations`)
    );
  }

  // if (!user) {
  //   notFound();
  // }

  const conversations = await getConversations();
  return (
    <main>
      <div
        className="-mt-6 bg-cover bg-center bg-fixed bg-no-repeat hero min-h-screen"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg") `,
        }}
      >
        <div className="flex flex-col items-center hero-overlay bg-opacity-60 my-4">
          <h1 className="text-2xl text-white my-4">
            <b>Lobby</b>
          </h1>
        </div>

        <ConversationForm
          conversations={conversations}
          userId={user.id}
          userName={user.username}
        />
      </div>
    </main>
  );
}
