import express from 'express';
import db from './db';
// Set up the express app
var cors = require('cors')
var app = express()

app.use(cors())


app.get('/api/photos', (req, res) => {
  let page = +req.query.page;
  page = (page > 0? page: 1);
  const offset = ((page-1) % 10) * 50;
  const limit = 50;
  const photos = (page * 50);
  res.status(200).send({
    success: 'true',
    result: db.photos.slice(offset, offset+limit)
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
