var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
        "id": "21650",
        "name": "Ancient Qiraji Ripper"
    },
    {
        "id": "22737",
        "name": "Atiesh, Greatstaff of the Guardian"
    },
    {
        "id": "23038",
        "name": "Band of Unnatural Forces"
    }]);
});

module.exports = router;
