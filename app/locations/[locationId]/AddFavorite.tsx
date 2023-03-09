'use client';
import { useState } from 'react';
import { Favorite } from '../../../database/favorites';

type Props = {
  favorites: Favorite[];
  locationId: number;
  userId: number;
};

export default function AddFavorite(props: Props) {
  const [favorites, setFavorites] = useState<Favorite[]>(props.favorites);
  const [error, setError] = useState<string>();

  return (
    <main>
      <button
        onClick={async () => {
          const locationId = props.locationId;

          const response = await fetch('/api/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              locationId,
            }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }

          setFavorites([...favorites, data.favorite]);
        }}
      >
        📌
      </button>
    </main>
  );
}
