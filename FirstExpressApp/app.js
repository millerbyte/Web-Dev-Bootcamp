const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const ip = process.env.IP || 'localhost';

app.get('/', (req, res) => {
  res.send('Hi there!');
})
  .get('/bye', (req, res) => {
    res.send('Goodbye!');
  })
  .get('/dog', (req, res) => {
    res.send('Meow!');
  })
  .get('/test/:id', (req, res) => {
    res.send(req.params.id);
  })
  .get('*', (req, res) => {
    res.status(404).send('Page not found');
  });

app.listen(port, ip, () => {
  console.log(`Listening on ${ip}:${port}`);
});
