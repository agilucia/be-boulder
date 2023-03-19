import { cookies } from 'next/headers';
import Image from 'next/image';
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
      shortcut: '/icon_3.svg',
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
        className="-mt-6 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat "
        style={{
          backgroundImage: `url("/images/climbing_wall_background.jpg")`,
        }}
      >
        <div className="flex flex-col items-center">
          <div className="card w-96 bg-base-100 shadow-xl my-2 items-center mt-4 pb-4">
            <figure className="px-10 pt-10">
              <Image
                src={`${singleImage.imageUrl}`}
                alt="user generated image"
                width="200"
                height="200"
              />
            </figure>
            <div className="card-body items-center text-center">
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
