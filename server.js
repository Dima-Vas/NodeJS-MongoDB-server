require('dotenv').config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const dbname = process.env.DBNAME

mongoose.connect(`${process.env.DBURL}${dbname}`)
const db = mongoose.connection
db.on("error", (error) => {console.error(error)})
db.once("open", () => {console.log("Connected to database " + dbname)})

app.use(express.json())
const playersRouter = require("./routes/players")
app.use("/players", playersRouter)

app.listen(3000, () => {console.log("Hello, Node.js!")})

