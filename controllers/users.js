const User = require('../models/user')
const Profile = require('../models/profile')

module.exports = {
me: showMyProfile

}

function showMyProfile(req, res) {
    const userId = req.session.userId;

}