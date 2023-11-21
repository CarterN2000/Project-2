const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    location: String,
    jobTitle: String,
    languages: {
        type: String,
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
        type: Image,
        min: 1,
        required: true
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User

