'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Favorite } from '../../../database/favorites';

type Props = {
  favorites: Favorite[];
  locationId: number;
  userId: number;
};

export default function AddFavorite(props: Props) {
  const [favorites, setFavorites] = useState<Favorite[]>(props.favorites);
  // const [error, setError] = useState<string>();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  return (
    <main>
      <button
        className="pt-6 -mr-4"
        onClick={async () => {
          const locationId = props.locationId;
          const userId = props.userId;

          const response = await fetch('/api/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              locationId,
            }),
          });

          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          setFavorites([...favorites, data.favorite]);
          setSuccess(true);
          router.refresh();
        }}
      >
        📌
      </button>
      {success && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <p>Saved!</p>
          </div>
        </div>
      )}

      {errors.map((error) => (
        <div key={`error-${error.message}`}>{error.message}</div>
      ))}
    </main>
  );
}
