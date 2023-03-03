export async function up(sql) {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(200) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE comments
  `;
}
