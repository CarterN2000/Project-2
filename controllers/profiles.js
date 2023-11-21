const User = require('../models/user')

const Profile = require('../models/profile')

module.exports = {
new: newUser,
index,
create,
show, 
}

function newUser(req, res) {
    res.render('profiles/new')
}

async function index(req, res) {
    try {
        const allProfiles = await Profile.find()
        res.render('profiles/index', {
            profile: allProfiles,
        })
    }
    catch(err) {
        console.log(err)
    }
}

async function create(req, res) {
    try {
        await Profile.create(req.body)
        res.redirect('/profiles')
    }
    catch(err) {
        console.log(err)
    }
}

async function show(req, res) {
    try {
        const profile = await Profile.findById(req.params.id)
        res.render('profiles/show', {
            profile,
        })
    }
    catch(err) {
        console.log(err)
    }
}