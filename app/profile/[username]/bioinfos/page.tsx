import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBioByUserId } from '../../../../database/bios';
import { getImagesByUserId } from '../../../../database/images';
import { getUserByUsername } from '../../../../database/users';
import AddImage from './AddImage';
import BioForm from './BioForm';

export const dynamic = 'force-dynamic';

type Props = {
  params: { username: string; userId: number; imageId: number };
};

export const metadata = {
  title: 'BE BOULDER - Edit bio info',
  description:
    'Edit the information in your bio and add more pictures to your personal feed.',
  icons: {
    shortcut: '/favicon.svg',
  },
};

export default async function BioInfos({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const bios = await getBioByUserId(user.id);

  const images = await getImagesByUserId(user.id);

  return (
    <main>
      <div
        className="-mt-6 bg-cover bg-center bg-fixed bg-no-repeat hero min-h-screen"
        style={{
          backgroundImage: `url("/images/climbing_wall.jpg") `,
        }}
      >
        <div className="flex flex-col items-center hero-overlay bg-opacity-60">
          <Link href={`/profile/${user.username}`} className="text-white m-2">
            Back to profile
          </Link>
          <BioForm bios={bios} userId={user.id} />
          <AddImage images={images} userId={user.id} />
        </div>
      </div>
    </main>
  );
}
