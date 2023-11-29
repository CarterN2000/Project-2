const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')

const profilesCtrl = require('../controllers/profiles')

/* GET users listing. */
router.get('/me', ensureLoggedIn, profilesCtrl.showMe)

router.get('/new', profilesCtrl.new)

router.get('/match', ensureLoggedIn, profilesCtrl.match)

router.get('/', profilesCtrl.checkNewUser, profilesCtrl.index)

router.post('/', ensureLoggedIn, profilesCtrl.create)

router.get('/:id', profilesCtrl.show)

router.get('/me/edit', ensureLoggedIn, profilesCtrl.edit)

router.put('/me', ensureLoggedIn, profilesCtrl.update)

router.put('/:id', ensureLoggedIn, profilesCtrl.addLike)

router.get('/me/delete', ensureLoggedIn, profilesCtrl.deletePage)

router.delete('/me/delete', ensureLoggedIn, profilesCtrl.destroy)



module.exports = router;

