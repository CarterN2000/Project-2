var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new', userCtrl.new)

module.exports = router;
