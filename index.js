
const express = require('express')
const app = express()
const PORT = 5000 || process.env.PORT
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const path = require('path')
const basicRoutes = require('./routes/basic-routes')
const profileRoutes = require('./routes/profile-routes')
const personalRoute = require('./routes/personal')
const passportSetup = require('./config/passportSetup')
const router = require('./routes/basic-routes')
const socket = require('socket.io')
const User = require('./models/model')


mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true ,useUnifiedTopology: true})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api',basicRoutes)
app.use('/profile',profileRoutes)
app.use(personalRoute)


app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/wrong-username',(req,res)=>{
    res.render('wusername')
})
app.get('/wrong-password',(req,res)=>{
    res.render('wpassword')
})
app.get('/fail',(req,res)=>{
    res.render('error')
})

app.use(express.static(path.join(__dirname,"client/public")))

const server = app.listen(PORT,console.log(`Server Running on ${PORT}`))

let io = socket(server)

io.on('connection',(socket)=>{
    socket.on('chat',(data)=>{
        io.sockets.emit('context',data);
    })
})
