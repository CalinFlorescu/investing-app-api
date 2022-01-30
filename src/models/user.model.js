const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    token: {
        type: String,
        required: true
    },
    portofolio_id: {
        type: Number,
        default: 0,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
      required: true
    }
});
  
const User = mongoose.model("User", UserSchema);

module.exports = User