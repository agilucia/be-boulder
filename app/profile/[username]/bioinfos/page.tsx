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

export default async function BioInfos({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const bios = await getBioByUserId(user.id);

  const images = await getImagesByUserId(user.id);

  return (
    <main className="flex flex-col items-center">
      <Link href={`/profile/${user.username}`}>Back to profile</Link>
      <BioForm bios={bios} userId={user.id} />
      <AddImage images={images} userId={user.id} />
    </main>
  );
}
