//import pkgs
const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')

//port adding
const PORT = process.env.PORT || 8080
var coreOption={
    origin:'https://localhost:${PORT}'
}

//pkges using
app.use(cors(coreOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser)

//server running on
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
});