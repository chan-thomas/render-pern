//backend app.js
const express = require('express')
const cors = require('cors')
const passport = require("passport")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require('path')
const logger = require('./config/logger')



//----------------------------------------- END OF IMPORTS---------------------------------------------------
const app = express()
const db = require('./db')

const port = process.env.PORT || 4002
const reactClientURL = 'http://localhost:3000' // react client

// Let express serve the files in the built React-app's build folder
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: reactClientURL, // <-- location of the react app were connecting to
        credentials: true,
    })
)
app.use(
    session({
        secret: "secretcode-pg",
        resave: false,
        saveUninitialized: true,
    })
)
app.use(cookieParser("secretcode-pg"))
app.use(passport.initialize())
app.use(passport.session())
require("./auth/passportConfig")(passport)

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
app.get('/logout', (req, res)=>{
    req.logout((err) => {
        if (err) { return next(err); }
        res.json({message: 'bye'});
      });
})
app.post('/login',
    passport.authenticate('local',
        {
            failureMessage: true,  //Turn on failureMessage
            failureRedirect: '/fail'
        }),
    (req, res) => {
        res.json({ authorized: true })
    })
 
app.get('/fail', (req, res) => {
    console.log(req.session)
    req.session.messages = []// reset/clear out the failureMessage 
    res.send('Login fail')
})


app.get('/', (req, res) => {
    res.send('hello')
})
app.get('/getUsers', db.getUsers)
app.get('/getLoginUser', db.getLoginUser)
app.post('/register', db.addUser)



app.listen(port, () => {
    logger.info(`server is up on port ${port}`)
})




