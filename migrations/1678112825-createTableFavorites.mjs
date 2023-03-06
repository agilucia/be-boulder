export async function up(sql) {
  await sql`
    CREATE TABLE favorites (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      location_id integer REFERENCES locations (id) ON DELETE CASCADE,
      user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE favorites
  `;
}
