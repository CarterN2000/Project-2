const Profile = require('../models/profile')
const User = require('../models/user')

module.exports = {
    new: newUser,
    index,
    create,
    show,
    edit,
    update,
    addPhoto,
    showMe,
    checkNewUser,
    addLike,
    deletePage, 
    destroy, 
    match,
    showMatch,
    imageUpload,
    dislike
}

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const {clConfig} = require("../config/cloudinary.js");
cloudinary.config(clConfig);

function newUser(req, res) {
    const user = req.user
    res.render('profiles/new', {
        user,
    })
}

async function index(req, res) {
    try {
        const allProfiles = await Profile.find()
        const myProfile = await Profile.findById(req.user.profile)
        const notDisliked = allProfiles.filter(function(profile){
            if(!myProfile.dislikes.includes(profile._id)){
                return profile
            }
        })
        res.render('profiles/index', {
            profile: notDisliked,
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

async function addPhoto(req, res) {
    res.render('profiles/addPhoto', {
        
    })
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

        if (likedProfile.likedProfiles.includes(userProfile._id)) {
            userProfile.matchedProfiles.push(likedProfile._id)
            likedProfile.matchedProfiles.push(userProfile._id)
            await userProfile.save()
            await likedProfile.save()
        }
        else {
            userProfile.likedProfiles.push(likedProfile._id)
            await userProfile.save()
        }
        res.redirect('/profiles')
    }
    catch(err) {
        console.log(err)
    }
}

async function dislike(req, res) {
    const userProfile = await Profile.findById(req.user.profile)
    const dislikedProfile = await Profile.findById(req.params.id)

    // console.log(userProfile)
    // console.log(dislikedProfile._id)

    userProfile.dislikes.push(dislikedProfile._id)
    await userProfile.save()

    res.redirect('/profiles')
}

async function deletePage(req, res) {
    try {
        const profileToDelete = await Profile.findById(req.user.profile)
        res.render('profiles/deleteAccount', {
            profile: profileToDelete,
        })
    }
    catch(err) {
        console.log(err)
    }
}

async function destroy(req, res) {
    const userBeGone = await User.deleteOne(req.user._id)
    const profileBeGone = await Profile.deleteOne(req.user.profile)
    res.redirect('/')
    // if (!userBeGone && !profileBeGone) {
    //     res.redirect('/')
    // }
    // else {
    //     console.log('PROFILE DELETION ERROR')
    // }
}

async function match (req, res) {
    try {
        const allMatches = await Profile.findById(req.user.profile)
        const matchIds = allMatches.matchedProfiles
        const matchedProfiles = await Profile.find({ _id: { $in: matchIds } })
        res.render('profiles/match', {
            matches: matchedProfiles
        })
    }
    catch(err){
        console.log(err)
    }
}

async function showMatch(req, res) {
    try {
        const myMatch = await Profile.findById(req.params.id)
        let age = 0
        if (myMatch.birthday) {
           age = calculateAge(myMatch.birthday)
        }
        res.render('profiles/showMatch', {
            match: myMatch,
            age,
        })
    }
    catch(err){
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


async function imageUpload(req,res,next){
    try {
        let result = await streamUpload(req)

        console.log(req.user.profile)
        const profile = await Profile.findById(req.user.profile)
        const newImage = { url: result.url, alt: req.body.alt}
        profile.images.push(newImage)
        await profile.save()
        
        res.redirect('/profiles/me')
    }catch(err){
        console.log(err)
        next(err)
    }
}

function streamUpload (req){
    return new Promise(function (resolve, reject){
        let stream = cloudinary.uploader.upload_stream( function(error, result){
            if(result){
                console.log(result)
                resolve(result)
            }else{
                reject(error)
            }
        });
        
        streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
}