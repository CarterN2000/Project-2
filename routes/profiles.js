const express = require('express');
const router = express.Router();

const profilesCtrl = require('../controllers/profiles')

/* GET users listing. */
router.get('/new', profilesCtrl.new)

router.get('/', profilesCtrl.index)

router.post('/', profilesCtrl.create)

router.get('/:id', profilesCtrl.show)

router.get('/edit', profilesCtrl.edit)

router.put('/:id', profilesCtrl.update)

module.exports = router;
