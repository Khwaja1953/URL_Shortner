const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "NORMAL", enum: ["ADMIN","NORMAL"]},
    profile: {type: String},
    isVerified: {type: Boolean, default: false},
    storedOtp: {
        otp: {type: Number},
        validTill: {type: Date, default: Date.now() + 5 * 60 * 1000}
    }
    
},{timestamps: true});
const User = mongoose.model("User",userSchema)
module.exports = User;