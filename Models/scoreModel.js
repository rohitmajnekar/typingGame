const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreModel = new Schema( {
    email:String,
    score:String,
});

const Score = mongoose.model('Score', scoreModel)

module.exports = Score