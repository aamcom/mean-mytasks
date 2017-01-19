var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
res.send('LA LA LA INDEX')
});

module.exports = router;

