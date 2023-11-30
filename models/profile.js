const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema ({
    url: {type: String, required: true},
    description: { type: String},
    alt: {type: String, default:""}
})

const profileSchema = new Schema ({
    name: {
        type: String,
        // required: true,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-binary', 'Other']
    },
    location: String,
    jobTitle: String,
    languages: {
        type: [String],
        enum: ['C++',  'C', 'C#', 'Python', 'Javascript', 'HTML', 'CSS', 'Java', 'Ruby', 'Go', 'PHP',],
    },
    desires: {
        type: String,
        enum: ['Long-Term Relationship', 'Short-Term Fun', 'Open-Relationship', 'Undecided'],
    },
    aboutMe: {
        type: String,
        // required: true
    },
    pronouns: {
        type: String,
        enum: ['', 'he/him', 'she/her', 'they/them', 'other', 'prefer not to say'],
    },
    images: [imageSchema],
    likedProfiles: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
      }],
    matchedProfiles: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    }],
    socials: String,
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile

