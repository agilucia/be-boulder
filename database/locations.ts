import { cache } from 'react';
import { sql } from './connect';

export type Location = {
  id: number;
  name: string;
  address: string;
  website: string;
  price: string;
  openingHours: string;
  description: string;
  lat: number;
  lng: number;
};

// get all locations
export const getLocations = cache(async () => {
  const locations = await sql<Location[]>`
    SELECT * FROM locations
  `;
  return locations;
});

// get a single location
export const getLocation = cache(async (id: number) => {
  const [location] = await sql<Location[]>`
  SELECT * FROM locations WHERE id = ${id}`;
  return location;
});

// creating a new location
export const createLocation = cache(
  async (
    name: string,
    address: string,
    website: string,
    price: string,
    openingHours: string,
    description: string,
    lat: number,
    lng: number,
  ) => {
    const [location] = await sql<Location[]>`
    INSERT INTO locations
      (name, address, website, price, openingHours, description, lat, lng)
    VALUES
      (${name}, ${address}, ${website}, ${price}, ${openingHours}, ${description}, ${lat}, ${lng})
    RETURNING *
    `;
    return location;
  },
);

// updating a location
export const updateLocationById = cache(
  async (
    id: number,
    name: string,
    address: string,
    website: string,
    price: string,
    openingHours: string,
    description: string,
    lat: number,
    lng: number,
  ) => {
    const [location] = await sql<Location[]>`
    UPDATE
      locations
    SET
      name = ${name},
      address = ${address},
      website = ${website},
      price = ${price},
      openingHours = ${openingHours},
      description = ${description}
      lat = ${lat},
      lng = ${lng}
    WHERE
      id = ${id}
    RETURNING *
    `;
    return location;
  },
);

// deleting a product
export const deleteLocationById = cache(async (id: number) => {
  const [location] = await sql<Location[]>`
  DELETE FROM
    locations
  WHERE
    id = ${id}
  RETURNING *
  `;
  return location;
});
