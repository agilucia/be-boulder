import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getBioByUserId } from '../../../database/bios';
import { getImagesByUserId } from '../../../database/images';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import { profileNotFoundMetadata } from './not-found';
import RemoveImage from './RemoveImage';

type Props = {
  params: { username: string; userId: number; imageId: number };
};

export async function generateMetadata(props: Props) {
  const user = await getUserByUsername(props.params.username);

  if (!user) {
    return profileNotFoundMetadata;
  }

  return {
    title: `BE BOULDER - ${user.username}`,
    description: `Find out about ${user.username} and check out their picture feed`,
    icons: {
      shortcut: '/icon_3.svg',
    },
  };
}

export default async function UserProfile(props: Props) {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const currentUser = token && (await getUserBySessionToken(token.value));

  if (!currentUser) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/locations`)
    );
  }

  const user = await getUserByUsername(props.params.username);

  if (!user) {
    notFound();
  }

  const images = await getImagesByUserId(user.id);

  const bios = await getBioByUserId(user.id);

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
            <h1 className="text-2xl text-black mt-4">
              <b>{user.username}</b>
            </h1>
            <br />
            <p>
              <b>About me:</b>
            </p>
            <span>
              {bios.map((bio) => {
                return <div key={`bio-${bio.userId}`}>{bio.content}</div>;
              })}
            </span>
            <br />
            {currentUser.id === user.id ? (
              <Link href={`/profile/${user.username}/bioinfos`}>
                Edit profile 🖊️
              </Link>
            ) : (
              // <BioForm bios={bios} userId={user.id} />
              ''
            )}
            {/* <p>id: {user.id}</p> */}
            <Link href={`/profile/${user.username}/userfavorites`}>
              See my favorites 📌
            </Link>
            {/* {currentUser.id === user.id ? (
        <AddImage images={images} userId={user.id} />
      ) : (
        ''
      )} */}
          </div>
          <span>
            {images.map((image) => {
              return (
                <div
                  key={`user-${image.userId}`}
                  className="card w-96 bg-base-100 shadow-xl my-2 items-center"
                >
                  <Link href={`/profile/${user.username}/${image.id}`}>
                    <figure className="px-10 pt-10">
                      <Image
                        src={`${image.imageUrl}`}
                        alt="user generated image"
                        width="200"
                        height="200"
                      />
                    </figure>
                    <div className="card-body items-center text-center text-black">
                      <p>{image.caption}</p>
                    </div>
                  </Link>
                  <div className="mb-2 -mt-5">
                    {currentUser.id === user.id ? (
                      <RemoveImage image={image} />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              );
            })}
          </span>
        </div>
      </div>
    </main>
  );
}
