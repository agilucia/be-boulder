export async function up(sql) {
  await sql`
  CREATE TABLE locations (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(80) NOT NULL,
    address varchar(150) NOT NULL,
    website varchar(300) NOT NULL,
    price varchar(100) NOT NULL,
    opening_hours varchar(150) NOT NULL,
    description varchar(1000) NOT NULL,
    lat varchar(20) NOT NULL,
    lng varchar(20) NOT NULL
)
`;
}

export async function down(sql) {
  await sql`
    DROP TABLE locations
  `;
}
