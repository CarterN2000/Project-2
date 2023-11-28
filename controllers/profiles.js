const Profile = require('../models/profile')
const User = require('../models/user')

module.exports = {
    new: newUser,
    index,
    create,
    show,
    edit,
    update,
    showMe,
    checkNewUser,
    addLike,
}

function newUser(req, res) {
    console.log(req.user)
    const user = req.user
    res.render('profiles/new', {
        user,
    })
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
        let age = 0
        if (profile.birthday) {
           age = calculateAge(profile.birthday)
        }
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
        const myProfile = await Profile.findById(req.user.profile)
        res.render('profiles/edit', {
            profile: myProfile,
        })
    }
    catch (err) {
        console.log(err)
    }
}

async function update(req, res) {
    await Profile.findByIdAndUpdate(req.user.profile, req.body, {new: true})
    await User.findByIdAndUpdate(req.user._id, {newUser: false})
    res.redirect('/profiles/me')
}

async function showMe(req, res) {
    const userProfile = await Profile.findById(req.user.profile)
    res.render('profiles/myProfile', {
        profile: userProfile
    })
}

async function addLike(req, res) {
    try {
        const userProfile = await Profile.findById(req.user.profile)
        const likedProfile = await Profile.findById(req.params.id)

        userProfile.likedProfiles.push(likedProfile._id)

        await userProfile.save()

        console.log('saved user')

        if (likedProfile.likedProfiles.includes(userProfile._id)) {
            console.log('wooohoooo')
        }
        res.redirect('/profiles')
    }
    catch(err) {
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

function checkNewUser(req, res, next) {
    const { user } = req

    if(user && user.newUser) {
        res.redirect('profiles/new')
    }
    else {
        next()
    }
}