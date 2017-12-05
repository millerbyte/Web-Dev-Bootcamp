const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hi there, welcome to my assignment!')
})
  .get('/speak/:animal', (req, res) => {
    switch(req.params.animal.toLowerCase()){
      case 'pig':
        res.send('The pig says \'Oink\'');
        break;
      case 'cow':
        res.send('The cow says \'Moo\'');
        break;
      case 'dog':
        res.send('The dog says \'Woof Woof!\'');
        break;
      default:
        res.send(`The ${req.params.animal} says nothing.  It must be dead.`);
        break;
    }
  })
  .get('/repeat/:string/:num', (req, res) => {
    let string = '';
    for(i = 0; i < Number(req.params.num); i++){
      string += `${req.params.string} `;
    }
    res.send(string);
  })
  .get('*', (req, res) => {
    res.status(404).send('Sorry, page not found... What are you doing with your life?');
  });

app.listen(8000, () => {
  console.log('Server running on port 8000');
})
