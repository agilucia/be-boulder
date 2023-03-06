export async function up(sql) {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(200) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      location_id integer REFERENCES locations (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE comments
  `;
}
