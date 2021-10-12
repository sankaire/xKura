const mongoose = require("mongoose")
const Schema = mongoose.Schema

 //database schema
const VoteSchema = new Schema({
    zt:{
        type:String,
        required:true
    },
    points:{
        type:String,
        required:true
    }
})
//create collections and add schema
const Vote = mongoose.model("Vote", VoteSchema)

module.exports = Vote
