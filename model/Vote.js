const mangoose = require("mongoose")
const Schema = mangoose.Schema

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
const Vote = mangoose.model("Vote", VoteSchema)

module.exports = Vote
