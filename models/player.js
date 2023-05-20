const mongoose = require("mongoose")

// TODO : convert to NF
const playerSchema = new mongoose.Schema({
    nickname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    subscribeDate : {
        type : Date,
        required : true,
        default : Date.now
    },
    gamesPlayed : {
        type : Number,
        required : true,
        default : 0
    },
    gamesWonAsMafia : {
        type : Number,
        required : true,
        default : 0
    },
    gamesWonTotal : {
        type : Number,
        required : true,
        default : 0
    }
})

module.exports = mongoose.model("Player", playerSchema)
