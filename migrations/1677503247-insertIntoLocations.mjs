const locations = [
  {
    id: 1,
    name: 'KI Kletterzentrum Innsbruck',
    address: 'Matthias-Schmid-Strasse 12c, 6020 Innsbruck',
    website: 'https://www.kletterzentrum-innsbruck.at/',
    price: 'Entrance fee adults: 13,80 EUR',
    opening_hours: 'Mon - Fri: 9am - 11pm , Sat & Sun: 9am - 10pm',
    description:
      "The Innsbruck climbing center is much more than a climbing hall. Newly built in 2017, the KI is one of the largest and most modern halls in the world and is THE meeting place for the climbing scene par excellence. You can let off steam with rope climbing and bouldering on an incredible 5,700 m2 of climbing wall area and 17 meter high walls. A bistro invites you to strengthen yourself with treats after your training session. A wide range of additional offers such as a children's area, seminar room, climbing shop and rental, courses, club training and events make the KI a place that leaves nothing to be desired.",
    lat: 47.27705297596069,
    lng: 11.413515127025953,
  },
  {
    id: 2,
    name: 'Blockfabrik',
    address: 'Schlossgasse 10-12, 1050 Wien',
    website: 'https://www.blockfabrik.at/',
    price: 'Entrance fee adults: 9,50 EUR',
    opening_hours: 'Mon - Sun: 10am - 10pm',
    description:
      'Welcome to the innovative bouldering hall in the heart of Vienna. The Blockfabrik impresses with varied routes in all levels of difficulty, its friendly and family atmosphere as well as with a spacious, sustainable and bright hall concept. Away from bouldering, their bistro and charming inner courtyard invite you to linger in a casual feel-good atmosphere.',
    lat: 48.19045073832679,
    lng: 16.359915411708844,
  },
  {
    id: 3,
    name: 'Boulderbar Salzburg',
    address: 'Richard-Kürth-Strasse 9, 5020 Salzburg',
    website: 'https://boulderbar.net/salzburg',
    price: 'Entrance fee adults: 11,90 EUR',
    opening_hours: 'Mon - Fri 9am - 10:30pm, Sat & Sun 9am - 8pm',
    description:
      "The Boulderbar Salzburg combines bouldering with a cool bar ambience and chilled sound in a bright, stress-free atmosphere. With more than 1,800 m2 bouldering area, 4.5 meter high walls and 300 m2 bar area, there is a lot to experience here. And the little ones don't miss out either: Children from the age of 4 can get a bouldering license with their parents, attend a 5-day holiday camp or celebrate their birthday in the boulder bar.",
    lat: 47.81114687881876,
    lng: 13.060776727039736,
  },
  {
    id: 4,
    name: 'BLOC House',
    address: 'Puchstrasse 17-21, 8020 Graz',
    website: 'https://bloc-house.at/',
    price: 'Entrance fee adults: 10,40 EUR',
    opening_hours: 'Mon - Fri: 7am - 1pm & 4pm - 10pm, Sat & Sun: 9am - 10pm',
    description:
      "In the BLOC House bouldering hall, which opened in 2014, you will find everything that makes the curious and passionate athlete's heart beat faster. On an area of 1100 m2 with levels of difficulty 3 to 8 you can solve many tricky bouldering problems. Afterwards you can make yourself comfortable on one of the many sofas and strengthen yourself at the bar with coffee, drinks and snacks before your journey home.",
    lat: 47.050831431574714,
    lng: 15.43491351721841,
  },
  {
    id: 5,
    name: 'Kletterhalle Wien',
    address: 'Erzherzog Karl Strasse 108, 1220 Wien',
    website: 'https://www.kletterhallewien.at/',
    price: 'Entrance fee adults: 14,50 EUR',
    opening_hours: 'Mon - Fri 9am - 10:30pm, Sat & Sun 9am - 8pm',
    description:
      "The climbing hall in Vienna in the 22nd district is home to a climbing paradise of over 4000 m2 with indoor and outdoor walls. Lead climbing routes, top ropes and toppas await you on 16 meter high walls, and in the outdoor area you can let off steam on the World Cup bouldering wall, on natural stones, 27m transverse boulders and the free-standing block with children's and parkour boulders. Slackline parcours with a total of ten lines are available for slackline fans.",
    lat: 48.230495951031195,
    lng: 16.450756211709916,
  },
  {
    id: 6,
    name: 'Edelweiss Center',
    address: 'Walfischgasse 12/2, 1010 Wien',
    website: 'https://www.edelweiss-center.at/',
    price: 'Entrance fee adults: 5,90 EUR per hour',
    opening_hours: 'Mon - Fri: 12pm - 10:30pm, Sat & Sun: 9am - 7pm',
    description:
      "In the middle of Vienna's city center you will find 1,600 colored boulders of all levels on five floors. In addition, you can prove your skills on a 110 m2 roof area, a 45 degree training wall, 4 x 6 m large, asymmetrical archway wall, a moonboard, four tilting walls and many other elements. But that's not all: If you want to train your muscle strength, you can use the fitness area with 16 equipment stations. Best of all: All rooms are fully air-conditioned!",
    lat: 48.20313689865034,
    lng: 16.372859011709117,
  },
  {
    id: 7,
    name: 'Kletterhalle Salzburg',
    address: 'Wasserfeldstrasse 23, 5020 Salzburg',
    website: 'https://kletterhallesalzburg.at/',
    price: 'Entrance fee adults: 15,50 EUR',
    opening_hours: 'Mon - Fri: 10am - 10pm, Sat & Sun: 10am - 8pm',
    description:
      'The Salzburg climbing hall offers you interesting routes and exciting climbing areas that are equally suitable for beginners and ambitious climbers. You can try your hand at climbing indoors and outdoors on a 2,500 m2 climbing area, and you can end the day comfortably with drinks and snacks in the café next door. In addition, courses for children and adults are offered and guests aged 50+ are also welcome in the hall.',
    lat: 47.825710824731935,
    lng: 13.03284102150119,
  },
  {
    id: 8,
    name: 'Boulderclub Graz',
    address: 'Triester Str. 391, 8055 Graz',
    website: 'https://www.boulderclub.at/',
    price: 'Entrance fee adults: 13,50 EUR',
    opening_hours: 'Mon - Fri: 10am - 10pm, Sat & Sun: 10am - 8pm',
    description:
      'With a total area of over 2100 m2, the Boulderclub is the largest bouldering hall in Austria. Around 300 routes with 7500 climbing holds up to a difficulty level of 8b+ await you. The boulders are color-coded so that you can quickly find the right routes for your level. For new challenges, bouldering enthusiasts invest around 50 hours a week for new routes. The range of training is rounded off by two moonboards, a campus board, a hangboard station, a calisthenics park and a spacious warm-up and cool-down area - everything is fully air-conditioned.',
    lat: 47.025642350074286,
    lng: 15.436361840513994,
  },
  {
    id: 9,
    name: 'Boulderhalle Salzburg',
    address: 'Wasserfeldstr. 23, 5020 Salzburg',
    website: 'https://www.boulderhalle-salzburg.at/',
    price: 'Entrance fee adults: 11,50 EUR',
    opening_hours: 'Mon - Fri: 10am - 10pm, Sat & Sun: 10am - 8pm',
    description:
      "In cooperation with the Salzburg climbing hall, Daniel Harnest and Bruno Vacka realized their fourth project in 2017 and opened the Salzburg bouldering hall. In addition to sufficient wall space and a generous layout that leaves enough space to linger and cheer, you can expect an electrically adjustable training wall and completely new wall concepts ('Reversed Volcano'), which you have definitely not seen before. A symmetrical diamond offers the possibility to screw parallel boulders and thus enables new competition modes and exciting final boulders.",
    lat: 47.826009420512655,
    lng: 13.033232682864181,
  },
  {
    id: 10,
    name: 'boulderbar Wien - Hannovergasse',
    address: 'Hannovergasse 21, 1200 Wien',
    website: 'https://boulderbar.net/hannovergasse',
    price: 'Entrance fee adults: 11,90 EUR',
    opening_hours:
      'Mon, Wed, Thu, Fri: 11am - 11pm, Tue: 7:30am - 11pm, Sat & Sun: 9am - 8pm',
    description:
      'Boulderbar Vienna operates three bouldering halls in the Danube metropolis, the first opened its doors in 2012 in Hannovergasse. There are now two new locations at the main train station and Wienerberg where bouldering fans can let off steam. From September 2021, the boulderbar will open its fourth location in the innovative Graetzl Seestadt: Whether by bike or on the go, the boulderbar Seestadt is perfectly connected and offers decelerated bouldering in the new Vienna.',
    lat: 48.231541166969464,
    lng: 16.368554598215507,
  },
  {
    id: 11,
    name: 'boulderbar Wien - Wienerberg',
    address: 'Gutheil-Schoder-Gasse 8, 1100 Wien',
    website: 'https://boulderbar.net/wienerberg',
    price: 'Entrance fee adults: 11,90 EUR',
    opening_hours:
      'Mon, Tue, Thu, Fri: 11am - 11pm, Wed: 7:30am - 11pm, Sat & Sun: 9am - 8pm',
    description:
      'Boulderbar Vienna operates three bouldering halls in the Danube metropolis, the first opened its doors in 2012 in Hannovergasse. There are now two new locations at the main train station and Wienerberg where bouldering fans can let off steam. From September 2021, the boulderbar will open its fourth location in the innovative Graetzl Seestadt: Whether by bike or on the go, the boulderbar Seestadt is perfectly connected and offers decelerated bouldering in the new Vienna.',
    lat: 48.161498978769295,
    lng: 16.335812742389564,
  },
  {
    id: 12,
    name: 'boulderbar Wien - Hauptbahnhof',
    address: 'Maria-Lassnig-Strasse 18/Tür 2, 1100 Wien',
    website: 'https://boulderbar.net/hauptbahnhof/boulderbar-hauptbahnhof',
    price: 'Entrance fee adults: 11,90 EUR',
    opening_hours:
      'Mon, Tue, Wed, Fri: 10am - 10pm, Thu: 7:30am - 10pm, Sat & Sun: 9am - 8pm',
    description:
      'Boulderbar Vienna operates three bouldering halls in the Danube metropolis, the first opened its doors in 2012 in Hannovergasse. There are now two new locations at the main train station and Wienerberg where bouldering fans can let off steam. From September 2021, the boulderbar will open its fourth location in the innovative Graetzl Seestadt: Whether by bike or on the go, the boulderbar Seestadt is perfectly connected and offers decelerated bouldering in the new Vienna.',
    lat: 48.181543575597345,
    lng: 16.385357398214136,
  },
  {
    id: 13,
    name: 'Steinblock Imst',
    address: 'Bundesstrasse 1a, 6460 Gemeinde Imst',
    website: 'https://steinblock.at/imst/',
    price: 'Entrance fee adults: 12,80 EUR',
    opening_hours: 'Mon - Fri: 10am - 10pm, Sat & Sun: 9am - 7pm',
    description:
      "The former professional boulderer Guntram Mattle and his team operate three stone block halls and have thus become the largest bouldering hall provider in western Austria. After opening the first halls in Rankweil and Imst (Tyrol) in 2016 and 2017, the next expansion in Dornbirn is scheduled for 2020. With 1200 m2 bouldering area, it is the largest hall in Vorarlberg. Bouldering fans can look forward to climbing walls made from local board layers with unusual wall shapes and a large training area with Kilter, Moon and Campus boards. An adventure children's area also provides fun and entertainment for the youngest guests. The feel-good ambience of the stone block runs through the entire hall: natural materials, a lounge area and a bistro with sun terrace round off the diverse range.",
    lat: 47.232702441211465,
    lng: 10.737453413530407,
  },
  {
    id: 14,
    name: 'Steinblock Dornbirn',
    address: 'Eisengasse 42, 6850 Dornbirn',
    website: 'https://steinblock.at/dornbirn/',
    price: 'Entrance fee adults: 13,80 EUR',
    opening_hours: 'Mon - Fri: 10am - 10:30pm, Sat & Sun: 1:30pm - 8pm',
    description:
      "The former professional boulderer Guntram Mattle and his team operate three stone block halls and have thus become the largest bouldering hall provider in western Austria. After opening the first halls in Rankweil and Imst (Tyrol) in 2016 and 2017, the next expansion in Dornbirn is scheduled for 2020. With 1200 m2 bouldering area, it is the largest hall in Vorarlberg. Bouldering fans can look forward to climbing walls made from local board layers with unusual wall shapes and a large training area with Kilter, Moon and Campus boards. An adventure children's area also provides fun and entertainment for the youngest guests. The feel-good ambience of the stone block runs through the entire hall: natural materials, a lounge area and a bistro with sun terrace round off the diverse range.",
    lat: 47.42105009218693,
    lng: 9.747781325183357,
  },
  {
    id: 15,
    name: 'Steinblock Rankweil',
    address: 'Alemannenstrasse 49, 6830 Rankweil',
    website: 'https://steinblock.at/rankweil/',
    price: 'Entrance fee adults: 12,80 EUR',
    opening_hours: 'Mon - Fri: 10am - 10:30pm, Sat & Sun: 1:30pm - 8pm',
    description:
      "The former professional boulderer Guntram Mattle and his team operate three stone block halls and have thus become the largest bouldering hall provider in western Austria. After opening the first halls in Rankweil and Imst (Tyrol) in 2016 and 2017, the next expansion in Dornbirn is scheduled for 2020. With 1200 m2 bouldering area, it is the largest hall in Vorarlberg. Bouldering fans can look forward to climbing walls made from local board layers with unusual wall shapes and a large training area with Kilter, Moon and Campus boards. An adventure children's area also provides fun and entertainment for the youngest guests. The feel-good ambience of the stone block runs through the entire hall: natural materials, a lounge area and a bistro with sun terrace round off the diverse range.",
    lat: 47.276748914229806,
    lng: 9.657203111685199,
  },
  {
    id: 16,
    name: 'Boulderama',
    address: 'Raiffeisenstrasse 12, 9020 Klagenfurt am Wörthersee',
    website: 'https://boulderama.at/',
    price: 'Entrance fee adults: 14 EUR',
    opening_hours: 'Mon, Wed, Fri: 3pm - 10pm, Tue, Thu, Sat, Sun: 10am - 10pm',
    description:
      "In Carinthia's largest bouldering hall, you can let off steam on a 1,300 m2 bouldering area on a wide variety of walls and blocks. Beginners, amateur athletes and professional climbers can put their skills to the test on 200 bouldering problems with various levels of difficulty. In addition, a competition wall is offered, which consists of eight lanes and various wall inclinations. There is also plenty of fun for children: a knight's castle and a pirate ship await them in the separate family area. In addition, there is the new extension with a lead climbing area on a 600 m2 climbing area and a free solo tower on which it is possible to climb to a height of 8.40 meters without a safety rope.",
    lat: 46.605184311105084,
    lng: 14.305095415360734,
  },
  {
    id: 17,
    name: 'Bigwall Bouldering',
    address: 'Pottendorfer Str. 29, 2700 Wiener Neustadt',
    website: 'https://www.bigwall-bouldering.at/',
    price: 'Entrance fee adults: 10,50 EUR',
    opening_hours:
      'Mon, Tue, Wed, Fri: 10am - 10pm, Thu: 7am - 10pm, Fri: 10am - 10pm, Sat & Sun: 10am - 9pm',
    description:
      'With an area of over 1700m2, Bigwall Bouldering is one of the largest bouldering halls in Lower Austria. Natural wood look and light-flooded rooms ensure a feel-good atmosphere that invites you to linger. Bouldering routes set new every week by professional route setters offer regular new challenges, and the wide range of courses for children and adults, as well as the catering area with delicious delicacies, leave nothing to be desired.',
    lat: 47.82566294378836,
    lng: 16.24977355899778,
  },
  {
    id: 18,
    name: 'Kletterhalle Villach',
    address: 'Italiener Str. 54, 9500 Villach',
    website: 'http://kletterhallevillach.at/',
    price: 'Entrance fee adults: 13,50 EUR',
    opening_hours:
      'Mon: 3pm - 10pm, Tue: 9am - 1pm & 4:30pm - 10pm, Wed: 3pm - 10pm, Thu: 9am - 1pm & 4:30pm - 10pm, Fri: 3pm - 10pm, Sat: 10am - 10pm, Sun: 10am - 2pm',
    description:
      'In the Villach climbing hall, an extensive range of bouldering and rope climbing awaits you with a pleasant, cool indoor temperature! On around 2,000 m2 of climbing area you can enjoy the finest climbing fun on 200 climbing routes and 80 bouldering opportunities with heights of 4 - 16.5 meters. Children have their own area and the outer wall is shaded in the morning and lit up by the evening sun and LED strips in the evening. In the spacious gastro area with terrace you can fortify yourself with delicious delicacies from all over the world.',
    lat: 46.60552593911616,
    lng: 13.84048104050334,
  },
  {
    id: 19,
    name: 'Block Monkey',
    address: 'Im Letten 6, 6800 Feldkirch',
    website: 'https://www.blockmonkey.at/',
    price: 'Entrance fee adults: 11 EUR',
    opening_hours: 'Mon - Fri: 2pm - 10pm, Sat & Sun: 10am - 10pm',
    description:
      "With an area of 500 m2 on two floors and eight sectors, the hall in Feldkirch offers around 150 bouldering problems for beginners, advanced and professionals to work out. From overhanging to flat, everything is there that makes the bouldering heart beat faster. For rope climbers, there is a lead climbing and top rope area of almost 100 m2. Kids can let off steam on their own children's climbing wall with a slide and a play area. A spacious training area with system wall, campus board and fitness equipment complete the offer. And after your workout, you can fortify yourself with delicacies in the bistro before your journey home!",
    lat: 47.26826072473203,
    lng: 9.591972098190595,
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO locations ${sql(
      locations,
      'name',
      'address',
      'website',
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
