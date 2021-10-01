const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")

//app
const app = express()

//routing
const poll = require("./routes/poll")

//set public directory
app.use(express.static(path.join(__dirname, "public")))

//body parser midlewere
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//enable cors
app.use(cors())

app.use("/poll", poll)

//port number
const port = 3000

//start server
app.listen(port, () => console.log(`server started on ${port}`))
