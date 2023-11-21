const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema ({
    userId: String,
    likedUserId: String,
    isMatch: Boolean,
})