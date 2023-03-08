'use client';
import { useState } from 'react';
import {
  Favorite,
  FavoriteWithLocationInfo,
} from '../../../database/favorites';

type Props = {
  favorites: FavoriteWithLocationInfo[];
};

export default function RemoveFavorite(props: Props) {
  const [favorites, setFavorites] = useState<FavoriteWithLocationInfo[]>(
    props.favorites,
  );
  // const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [error, setError] = useState<string>();

  return (
    <main>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      {favorites.map((favorite) => (
        <div key={`favorite-${favorite.favoriteId}`}>
          <button
            onClick={async () => {
              // const locationId = props.locationId;

              const response = await fetch(`/api/favorites/${favorite.favoriteId}`, {
                method: 'DELETE',
              });

              const data = await response.json();

              if (data.error) {
                setError(data.error);
                return;
              }

              setFavorites(
                favorites.filter(
                  (favoriteOnState) => favoriteOnState.favoriteId !== data.favorite.id,
                ),
              );
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </main>
  );
}
