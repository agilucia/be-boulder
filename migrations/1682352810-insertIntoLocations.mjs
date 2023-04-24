const locations = [
  {
    id: 20,
    name: 'Bludenz Alpenverein Boulderhalle',
    address: 'Untersteinstrasse 5, 6700 Bludenz',
    website:
      'https://www.alpenverein.at/vorarlberg/Services/Boulderhalle-Bludenz/Boulderhalle-Bludenz.php',
    instagram: 'https://www.instagram.com/alpenverein_vorarlberg/?hl=en',
    price: 'Entrance fee adults: 9 EUR',
    opening_hours: 'Mon - Thu: 9am - 12pm & 1pm - 5pm, Fri: 9am - 12pm',
    description:
      'The cozy bouldering room is the perfect place for climbers to practice their skills in a safe and controlled environment. Despite its small size, the room is packed with a variety of challenging routes designed to suit climbers of all levels. The walls are constructed using high-quality materials and feature an array of interesting and varied holds, including crimps, slopers, and jugs. The friendly and experienced staff are always on hand to offer advice and support, making it the perfect place for beginners to learn the basics of bouldering. With a welcoming and relaxed atmosphere, our bouldering room is the perfect place to hang out and climb with friends.',
    lat: 47.156491396328114,
    lng: 9.820999500065097,
  },
  {
    id: 21,
    name: 'K1 Kletterhalle Dornbirn',
    address: 'Bildgasse 10, 6850 Dornbirn',
    website: 'https://www.k1-dornbirn.at/',
    instagram: 'https://www.instagram.com/k1kletterhalle/?hl=en',
    price: 'Entrance fee adults: 14,50 EUR',
    opening_hours: 'Mon - Fri: 8am - 10pm, Sat & Sun: 9am - 9pm',
    description:
      'This bouldering location offers a range of challenging routes suitable for both beginner and advanced climbers. The boulders are made of high-quality rock, with a variety of features such as cracks, pockets, and slopers, providing a unique and exciting climbing experience. Whether you are looking for a fun day out with friends or a serious training session, our bouldering location has something for everyone.',
    lat: 47.41484393146276,
    lng: 9.732701798217565,
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO locations ${sql(
      locations,
      'name',
      'address',
      'website',
      'instagram',
      'price',
      'opening_hours',
      'description',
      'lat',
      'lng',
    )}
  `;
}

export async function down(sql) {
  for (const location of locations) {
    await sql`
      DELETE FROM
        locations
      WHERE
        id = ${location.id}
    `;
  }
}
