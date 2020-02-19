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
})

app.listen(PORT, () => console.log('Listening on port ', PORT));
