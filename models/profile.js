const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
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
        required: true
    },
    pronouns: {
        type: String,
        enum: ['', 'he/him', 'she/her', 'they/them', 'other', 'prefer not to say'],
    },
    images: {
        type: String,
        min: 1,
    },
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile

