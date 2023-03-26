import { getUserWithLocationFavorites } from '../dataStructure';

test('reduces user location favorite', () => {
  const userWithLocationFavorites = [
    {
      userId: 1,
      userName: 'katja',
      favoriteId: 3,
      locationId: 1,
      locationName: 'KI Kletterzentrum Innsbruck',
    },
    {
      userId: 1,
      userName: 'katja',
      favoriteId: 5,
      locationId: 5,
      locationName: 'Kletterhalle Wien',
    },
  ];

  expect(getUserWithLocationFavorites(userWithLocationFavorites)).toStrictEqual(
    {
      id: 1,
      userName: 'katja',
      favorites: [{ id: 3 }, { id: 5 }],
      locations: [
        { id: 1, name: 'KI Kletterzentrum Innsbruck' },
        { id: 5, name: 'Kletterhalle Wien' },
      ],
    },
  );
});
