import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterForm from './RegisterForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegisterPage(props: Props) {
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
  return (
    <main>
      <div
        className="-mt-6 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat "
        style={{
          backgroundImage: `url("/images/climbing_wall_background.jpg")`,
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-white mt-4 mb-1">
            <b>REGISTER</b>
          </h1>
          <div className="flex items-center justify-center">
            <RegisterForm returnTo={props.searchParams.returnTo} />
          </div>
        </div>
      </div>
    </main>
  );
}
