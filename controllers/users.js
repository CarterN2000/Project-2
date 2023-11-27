const User = require('../models/user')
const Profile = require('../models/profile')

module.exports = {
me: showMyProfile

}

async function showMyProfile(req, res) {
    const userId = req.session.userId;
    const profileId = req.params.userId

    const userProfile = await Profile.findById(req.params.id)

    if (userId === profileId) {
        try {
            res.render('users/myProfile', {
                user: userProfile
            })
        }
        catch(err) {
            console.log(err)
        }
    }
    else {
        res.render('profiles/index')
    }
}