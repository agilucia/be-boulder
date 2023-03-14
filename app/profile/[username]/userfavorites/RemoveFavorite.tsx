'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FavoriteWithLocationInfo } from '../../../../database/favorites';

type Props = {
  favorite: FavoriteWithLocationInfo;
};

export default function RemoveFavorite(props: Props) {
  // const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [error, setError] = useState<string>();

  const router = useRouter();

  return (
    <main>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}

      <div key={`favorite-${props.favorite.favoriteId}`}>
        <button
          onClick={async () => {
            // const locationId = props.locationId;

            const response = await fetch(
              `/api/favorites/${props.favorite.favoriteId}`,
              {
                method: 'DELETE',
              },
            );

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              return;
            }

            router.refresh();
          }}
        >
          🗑️
        </button>
      </div>
    </main>
  );
}
