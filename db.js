/* eslint-disable camelcase */
const pg = require('pg');
const client = new pg.Client('postgres:localhost/cal-poly');
client.connect();


const checkForArticles = async (id) => {
  const sql = 'SELECT * FROM articles WHERE author_id = $1';
  const data = client.query(sql, [id]);
  if (data.length === 0) {
    return true;
  }
  else {
    return false;
  }
}


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
  INSERT INTO authors (first_name, last_name)
  VALUES ($1, $2)`;
  const response = await client.query(sql, [first_name, last_name]);
  return response.rows;
}


const readAuthors = async () => {
  const sql = 'SELECT * FROM authors';
  const response = await client.query(sql);
  return response.rows;
}


const readAuthor = async ({ author_id }) => {
  const sql = 'SELECT * FROM authors WHERE author_id = $1';
  const response = await client.query(sql, [author_id]);
  return response.rows;
}


const updateAuthor = async ({ first_name, last_name }) => {
  const sql = 'UPDATE authors SET first_name = $1, last_name = $2';
  const response = await client.query(sql, [first_name, last_name]);
  return response.rows;
}


const deleteAuthor = async ({ author_id }) => {
  const hasArticles = await checkForArticles(author_id);
  if (!hasArticles) {
    const sql = 'DELETE FROM authors WHERE author_id = $1';
    const response = await client.query(sql, [author_id]);
    return response.rows;
  }
  else {
    return 'Delete all article first.'
  }
}


const createArticle = async ({ title, body, author_id }) => {
  const sql = `INSERT INTO articles (title, body, author_id) 
               VALUES ($1, $2, $3)`;
  const response = await client.query(sql, [title, body, author_id]);
  return response.rows;
}


const readArticles = async () => {
  const sql = 'SELECT * FROM articles';
  const response = await client.query(sql);
  return response.rows;
}


const readArticle = async ({ id }) => {
  const sql = 'SELECT * FROM articles WHERE id = $1';
  const response = await client.query(sql, [id]);
  return response.rows;
}


const readArticlesByAuthor = async ({ author_id }) => {
  const sql = 'SELECT * FROM articles WHERE author_id = $1';
  const response = await client.query(sql, [author_id]);
  return response.rows;
}


const updateArticles = async ({ title, body }) => {
  const sql = 'UPDATE articles SET title = $1, body = $2';
  const response = await client.query(sql, [title, body]);
  return response.rows;
}


const deleteArticles = async ({ id }) => {
  const sql = 'DELETE from articles WHERE id = $1';
  const response = await client.query(sql, [id]);
  return response.rows;
}


module.exports = {
  sync,
  createAuthor,
  readAuthors,
  readAuthor,
  readArticlesByAuthor,
  updateAuthor,
  deleteAuthor,
  createArticle,
  readArticles,
  readArticle,
  updateArticles,
  deleteArticles
}
