const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')

const profilesCtrl = require('../controllers/profiles')

/* GET users listing. */
router.get('/me', ensureLoggedIn, profilesCtrl.showMe)

router.get('/new', ensureLoggedIn, profilesCtrl.new)

router.get('/', profilesCtrl.index)

router.post('/', ensureLoggedIn, profilesCtrl.create)

router.get('/:id', profilesCtrl.show)

router.get('/me/edit', ensureLoggedIn, profilesCtrl.edit)

router.put('/:id', ensureLoggedIn, profilesCtrl.update)

module.exports = router;

