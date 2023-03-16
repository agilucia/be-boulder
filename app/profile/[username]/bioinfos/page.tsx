import { notFound } from 'next/navigation';
import { getBioByUserId } from '../../../../database/bios';
import { getUserByUsername } from '../../../../database/users';
import BioForm from './BioForm';

type Props = {
  params: { username: string; userId: number };
};

export default async function BioInfos({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const bios = await getBioByUserId(user.id);

  return (
    <main className="flex flex-col items-center">
      <BioForm bios={bios} userId={user.id} />
    </main>
  );
}
