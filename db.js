const pg = require('pg');
const client = new pg.Client('postgres:localhost/cal-poly');
client.connect();

const sync = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS articles;
  DROP TABLE IF EXISTS authors;

  CREATE TABLE authors (
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id UUID PRIMARY KEY DEFAULT uuid_generate_v1()
  );

  CREATE TABLE articles (
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
    author_id UUID REFERENCES authors(author_id)
  );
  `
  const response = await client.query(sql);
  return response.rows;
}


const createAuthor = async ({ first_name, last_name }) => {
  const sql = `
  INSERT INTO authors (first_name, lat_name)
  VALUES ($1, $2)`;
  const response = await client.query(sql, [first_name, last_name]);
  return response.rows;
}


module.exports = {
  sync,
  createAuthor
}
