const express = require('express');
const app = express();

let stickers = []; // DB 역할

app.use(express.static('./public'));
app.use(express.json());

app.get('/api/stickers', (req, res) => {
  res.send(stickers);
});

app.post('/api/stickers', (req, res) => {
  if (!req.body) {
    // body에 내용 없으면 bad request
    res.sendStatus(400);
    return;
  }
  stickers = req.body;
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('listening on ', 3000);
});
