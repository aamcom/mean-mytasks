var express = require('express');
var router = express.Router();

router.get('/tasks', (req, res, next) => {
res.send('LA LA LA TASKS API')
});

module.exports = router;
