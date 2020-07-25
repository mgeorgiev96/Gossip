const router = require('express').Router()
const path = require('path')
const session = require('express-session')

const UserAuth = (req,res,next)=>{
    if(!session.user && !req.user){
        res.redirect('/')
    }else{
        next()
    }
}

router.get('/',UserAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/public/index.html"))
})

module.exports = router