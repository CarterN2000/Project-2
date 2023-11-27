const Profile = require('../models/profile')

module.exports = {
    new: newUser,
    index,
    create,
    show,
    edit,
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
    catch (err) {
        console.log(err)
    }
}

function create(req, res) {
    try {
        Profile.create(req.body)
        res.redirect('/profiles')
    }
    catch (err) {
        console.log(err)
    }
}

async function show(req, res) {
    try {
        const profile = await Profile.findById(req.params.id)
        const age = calculateAge(profile.birthday)
        res.render('profiles/show', {
            profile,
            age,
        })
    }
    catch (err) {
        console.log(err)
    }
}

async function edit(req, res) {
    try {
        const myProfile = await Profile.findById(req.params.id)
        res.render('profiles/edit', {
            profile: myProfile,
        })
    }
    catch (err) {
        console.log(err)
    }
}

function calculateAge(birthDate) {
    const currentDate = new Date();
    const birthYear = birthDate.getFullYear();
    const currentYear = currentDate.getFullYear();

    let age = currentYear - birthYear;

    // Adjust age if the birthday hasn't occurred yet this year
    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();
    const birthDay = birthDate.getDate();
    const currentDay = currentDate.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--
    }

    return age;
}