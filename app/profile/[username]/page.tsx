import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getBioByUserId } from '../../../database/bios';
import { getImageById, getImagesByUserId } from '../../../database/images';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import AddImage from './bioinfos/AddImage';
import BioForm from './bioinfos/BioForm';
import RemoveImage from './RemoveImage';

type Props = {
  params: { username: string; userId: number; imageId: number };
};

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
    <main className="flex flex-col items-center">
      <h1>
        <b>{user.username}</b>
      </h1>
      <p>About me:</p>
      <span>
        {bios.map((bio) => {
          return <div key={`bio-${bio.userId}`}>{bio.content}</div>;
        })}
      </span>
      {currentUser.id === user.id ? (
        <Link href={`/profile/${user.username}/bioinfos`}>Edit profile</Link>
      ) : (
        // <BioForm bios={bios} userId={user.id} />
        ''
      )}
      {/* <p>id: {user.id}</p> */}
      <Link href={`/profile/${user.username}/userfavorites`}>
        see my favorites
      </Link>
      {/* {currentUser.id === user.id ? (
        <AddImage images={images} userId={user.id} />
      ) : (
        ''
      )} */}
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
                <div className="card-body items-center text-center">
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
    </main>
  );
}
