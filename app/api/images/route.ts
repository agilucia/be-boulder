import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createImage, Image } from '../../../database/images';
import { getUserBySessionToken } from '../../../database/users';

const imageType = z.object({
  imageUrl: z.string(),
  caption: z.string(),
  // userId: z.number(),
});

export type ImagesResponseBodyPost =
  | {
      error: string;
    }
  | {
      image: Image;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ImagesResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();
  const result = imageType.safeParse(body);

  if (!result.success) {
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed propterites caption & image url',
      },
      { status: 400 },
    );
  }

  const newImage = await createImage(
    result.data.imageUrl,
    result.data.caption,
    user.id,
  );

  if (!newImage) {
    return NextResponse.json({ error: 'Image not created!' }, { status: 500 });
  }
  return NextResponse.json({ image: newImage });
}
