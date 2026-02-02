const mongoose = require('mongoose');
const Url = mongoose.Schema({
    url: {type: String, required: true, unique: true},
    shortUrl: {type: String, required: true, unique: true},
    visitHistory: [{type: String, date: Date.now()}],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    

},{timestamps: true});
const UrlModel = mongoose.model('UrlModel',Url);
module.exports = UrlModel