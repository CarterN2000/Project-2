const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer();


const ensureLoggedIn = require('../config/ensureLoggedIn')

const profilesCtrl = require('../controllers/profiles')

/* GET users listing. */
router.get('/me', ensureLoggedIn, profilesCtrl.showMe)

router.get('/new', profilesCtrl.new)

router.get('/match', ensureLoggedIn, profilesCtrl.match)

router.get('/me/delete', ensureLoggedIn, profilesCtrl.deletePage)

router.get('/me/edit', ensureLoggedIn, profilesCtrl.edit)

router.get('/', profilesCtrl.checkNewUser, profilesCtrl.index)

router.get('/match/:id', profilesCtrl.showMatch)

router.get('/me/addPhoto', profilesCtrl.addPhoto)

router.get('/:id', profilesCtrl.show)

router.post('/', ensureLoggedIn, profilesCtrl.create)

router.post('/me', upload.single("imageUpload"), profilesCtrl.imageUpload)

router.put('/me', ensureLoggedIn, profilesCtrl.update)

router.put('/:id', ensureLoggedIn, profilesCtrl.addLike)

router.put('/dislike/:id', ensureLoggedIn, profilesCtrl.dislike)

router.delete('/me/delete', ensureLoggedIn, profilesCtrl.destroy)

module.exports = router;

