import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createFavorite, Favorite } from '../../../database/favorites';
import { getUserBySessionToken } from '../../../database/users';

const favoriteType = z.object({
  locationId: z.number(),
});

export type FavoritesResponseBodyPost =
  | { error: string }
  | { favorite: Favorite };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<FavoritesResponseBodyPost>> {
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

  const body = await request.json();

  const result = favoriteType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing a needed property',
      },
      { status: 400 },
    );
  }

  const newFavorite = await createFavorite(result.data.locationId, user.id);

  if (!newFavorite) {
    return NextResponse.json(
      { error: 'Favorite not created!' },
      { status: 500 },
    );
  }

  return NextResponse.json({ favorite: newFavorite });
}
