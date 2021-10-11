// const MongoClient = require("mongodb").MongoClient
// const url = 'mongodb+srv://tepela:ZAS0706x@cluster0.ns3va.mongodb.net/cluster0?retryWrites=true&w=majority'

// const dbName = "polls"
// MongoClient.connect(url, { useNewUrlParser: true }, 
//     (err, client) => {
//     if (err) return console.log(err)
  
//     // Storing a reference to the database so you can use it later
//     db = client.db(dbName)
//     console.log(`Connected MongoDB: ${url}`)
//     console.log(`Database: ${dbName}`)
//   })
const mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb+srv://tepela:ZAS0706x@cluster0.ns3va.mongodb.net/cluster0?retryWrites=true&w=majority")
.then(() => console.log("Mongo DB connected"))
.catch(err => console.log(err))