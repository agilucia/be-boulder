import '../global.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Profile',
  description: 'This is your personal profile',
};

export default function ProfilePage() {
  return (
    <main>
      <h1>Profile</h1>
      <b>I love climbing! 💞</b>
    </main>
  );
}
