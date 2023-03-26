import { cookies } from 'next/headers';
// import Image from 'next/image';
// import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getImageById } from '../../../../database/images';
import { getReactionsForImage } from '../../../../database/reactions';
import { getUserBySessionToken } from '../../../../database/users';
import { imageNotFoundMetadata } from './not-found';
import ReactionForm from './ReactionForm';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    imageId: string;
  };
};

export async function generateMetadata(props: Props) {
  const singleImage = await getImageById(parseInt(props.params.imageId));

  if (!singleImage) {
    return imageNotFoundMetadata;
  }

  return {
    titel: singleImage.id,
    description: `Image nr. ${singleImage.id}`,
    icons: {
      shortcut: '/favicon.svg',
    },
  };
}

export default async function ImagePage(props: Props) {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  const singleImage = await getImageById(parseInt(props.params.imageId));

  if (!user) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/locations/${props.params.imageId}`)
    );
  }

  if (!singleImage) {
    // throw new error
    notFound();
  }

  const reactions = await getReactionsForImage(singleImage.id);

  return (
    <main>
      <div
        className="-mt-6 bg-cover bg-center bg-fixed bg-no-repeat hero min-h-screen"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg") `,
        }}
      >
        <div className="flex flex-col items-center hero-overlay bg-opacity-60">
          <div className="card w-80 bg-base-100 shadow-xl my-2 items-center mt-4 pb-4 bg-opacity-90 ">
            <figure className="px-10 pt-10 py-5 w-80 md:w-96">
              <img
                src={singleImage.imageUrl || undefined}
                alt=""
                width="350"
                height="350"
              />
            </figure>
            <div className="card-body items-center text-center -my-4">
              <p>{singleImage.caption}</p>
            </div>

            <ReactionForm
              reactions={reactions}
              imageId={singleImage.id}
              userId={user.id}
              userName={user.username}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
