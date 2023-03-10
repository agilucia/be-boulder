import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }

  // if no render login component
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl">
        <b>LOGIN</b>
      </h1>
      <div className="flex items-center justify-center">
        <LoginForm returnTo={props.searchParams.returnTo} />
      </div>
    </main>
  );
}
