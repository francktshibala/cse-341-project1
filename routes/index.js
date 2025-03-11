const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;