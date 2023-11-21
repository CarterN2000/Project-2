const mongoose = require('mongoose')
const Schema = mongoose.Schema

chatSchema = new Schema ({
    messages: [String], 
    userId: String,
    likedUserId: String,
    readRecipt: Boolean
})
