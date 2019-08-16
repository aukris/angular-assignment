import express from 'express';
import db from './db';
// Set up the express app
const app = express();


app.get('/api/photos', (req, res) => {
  let page = +req.query.page;
  page = (page > 0? page: 1);
  const offset = ((page-1) % 10) * 50;
  const limit = 50;
  const photos = (page * 50);
  res.header('Access-Control-Allow-Origin', '*');
  res.status(200).send({
    success: 'true',
    result: db.photos.slice(offset, offset+limit)
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
