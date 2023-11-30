const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true,
  },
  email: String,
  avatar: String,

  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  newUser: Boolean,
 }, { timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User

