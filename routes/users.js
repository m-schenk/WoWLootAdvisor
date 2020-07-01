var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{ "id":"1", "name":"Malvida"}, { "id":"2", "name":"Fabix"}, { "id":"13", "name":"Mareda"}]);
});

module.exports = router;
