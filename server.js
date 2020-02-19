const express = require('express');
const path = require('path');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));


app.post('/syncdata', async (req, res, next) => {
  try {
    const data = await db.sync();
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.post('/authors', async (req, res, next) => {
  try {
    const data = await db.createAuthor(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.get('/authors', async (req, res, next) => {
  try {
    const data = await db.readAuthors();
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.get('/author', async (req, res, next) => {
  try {
    const data = await db.readAuthor(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
})


app.put('/authors', async (req, res, next) => {
  try {
    const data = await db.updateAuthor(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.delete('/authors', async (req, res, next) => {
  try {
    const data = await db.deleteAuthor(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.post('/articles', async (req, res, next) => {
  try {
    const data = await db.createArticle(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    res.send(err.message)
  }
});


app.get('/articles', async (req, res, next) => {
  try {
    const data = await db.readArticles();
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.get('/article', async (req, res, next) => {
  try {
    const data = await db.readArticle(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.get('/articlesbyauthor', async (req, res, next) => {
  try {
    const data = await db.readArticlesByAuthor(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
})


app.put('/articles', async (req, res, next) => {
  try {
    const data = await db.updateArticles(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.delete('/articles', async (req, res, next) => {
  try {
    const data = await db.deleteArticles(req.body);
    res.status(200).send(data);
  }
  catch (err) {
    next(err);
  }
});


app.listen(PORT, () => console.log('Listening on port ', PORT));
