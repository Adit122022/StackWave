const {Router} = require('express');
const route = Router();

 route.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = route;