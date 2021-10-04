const mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb+srv://Tepela:ZAS0706x@cluster0.ns3va.mongodb.net/cluster0retryWrites=true&w=majority")
.then(() => console.log("mangoDB connected"))
.catch(err => console.log(err))