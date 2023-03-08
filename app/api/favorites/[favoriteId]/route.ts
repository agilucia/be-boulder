import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
import {
  deleteFavoriteById,
  Favorite,
  getFavoriteById,
} from '../../../../database/favorites';
import { getUserBySessionToken } from '../../../../database/users';

export type FavoriteResponseBodyGet =
  | { error: string }
  | { favorite: Favorite };

export type FavoriteResponseBodyDelete =
  | { error: string }
  | { favorite: Favorite };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<FavoriteResponseBodyGet>> {
  const favoriteId = Number(params.favoriteId);

  if (!favoriteId) {
    return NextResponse.json(
      { error: 'Favorite id is not valid' },
      { status: 400 },
    );
  }

  const singleFavorite = await getFavoriteById(favoriteId);

  if (!singleFavorite) {
    return NextResponse.json({ error: 'Favorite not found' }, { status: 400 });
  }

  return NextResponse.json({ favorite: singleFavorite });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<FavoriteResponseBodyDelete>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const favoriteId = Number(params.favoriteId);
  const singleFavoriteCheck = await getFavoriteById(favoriteId);

  if (!favoriteId) {
    return NextResponse.json(
      { error: 'Favorite id is not valid' },
      { status: 404 },
    );
  }

  if (singleFavoriteCheck && singleFavoriteCheck.userId === user.id) {
    const singleFavorite = await deleteFavoriteById(favoriteId);

    if (!singleFavorite) {
      return NextResponse.json(
        { error: 'Favorite not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ favorite: singleFavorite });
  } else {
    return NextResponse.json(
      { error: 'You cannot delete this favorite!' },
      { status: 403 },
    );
  }
}
