//import pkgs
const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const { JWTverify,currentUser } = require('./middleware/JWTverify')

//port adding
const PORT = process.env.PORT || 8081
var coreOption = {
    origin:`https://localhost:${PORT}`
}

//pkges using
app.use(cors(coreOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//routes
const roleRouter = require('./routes/roleRouter.js')
const regiRouter = require('./routes/registerRouter.js')
const loginRouter = require('./routes/loginRouter.js')
const logoutRouter = require('./routes/normalUserLogoutRouter.js')
const counterUserLogout = require('./routes/counterUserLogoutRouter.js')
const normalUserHome = require('./routes/normalUserHomeRouter.js')
const { format } = require('mysql2')

//use routes
app.use('/',roleRouter)
app.use('/register',regiRouter)
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.use('/counterlogout',JWTverify,counterUserLogout)
app.use('/home',JWTverify,normalUserHome)

//server running on
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
}); 
