import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getConversations } from '../../database/conversations';
import { getUserBySessionToken } from '../../database/users';
import ConversationForm from './ConversationForm';

type Props = {
  params: { username: string; userId: number; conversationId: string };
};

export default async function Conversations(props: Props) {
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
        className="-mt-6 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat "
        style={{
          backgroundImage: `url("/images/climbing_wall_background.jpg")`,
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-white mt-4">
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
