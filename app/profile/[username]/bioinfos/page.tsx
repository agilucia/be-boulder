import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBioByUserId } from '../../../../database/bios';
import { getImagesByUserId } from '../../../../database/images';
import { getUserByUsername } from '../../../../database/users';
import AddImage from './AddImage';
import BioForm from './BioForm';

type Props = {
  params: { username: string; userId: number; imageId: number };
};

export const metadata = {
  title: 'BE BOULDER - Edit bio info',
  description:
    'Edit the information in your bio and add more pictures to your personal feed.',
  icons: {
    shortcut: '/icon_3.svg',
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
        className="-mt-6 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat "
        style={{
          backgroundImage: `url("/images/climbing_wall_background.jpg")`,
        }}
      >
        <div className="flex flex-col items-center">
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
