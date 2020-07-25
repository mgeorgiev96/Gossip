const passport = require('passport')
const router = require('express').Router()
const User = require('../models/model')
const bcrypt = require('bcrypt')
const session = require('express-session')

router.get('/logout',(req,res)=>{
    
    if(!req.user){
        User.update({username:session.user.username},{
            $set:{online:'off'}
        }).then(i=>session.user = null)
    }else{
        User.update({username:req.user.username},{
            $set:{online:'off'}
        }).then(i=>req.logout())
    }
    res.redirect('/')
})

router.post('/view-profile-user',(req,res)=>{
    let profile = ''
    User.findOne({username:req.body.username}).then(user=>{
        profile=user
        profile.password = ''
        session.userProfile = profile
    }).then(i=>res.send('reload')).catch(err=>console.log(err))
})
router.get('/view-profile-account',(req,res)=>{
    res.send(session.userProfile)
})

router.get('/info',(req,res)=>{
    if(!req.user){
        User.findOne({username:session.user.username}).then(user=>{
            
            res.send({
                username: user.username,
                name: user.name,
                thumbnail: user.thumbnail,
                dateOfBirth: user.dateOfBirth,
                posts: user.posts,
                friends: user.friends,
                chats: user.chats,
                address: user.address,
                gender: user.gender,
                likes: user.likes,
                online: user.online,
                added: user.added
            })
        }).catch(err=>console.log(err))
    }else{
        User.findOne({username:req.user.username}).then(user=>{
            res.send({
                username: req.user.username,
                name: req.user.name,
                thumbnail: req.user.thumbnail,
                dateOfBirth: req.user.dateOfBirth,
                posts: req.user.posts,
                friends: req.user.friends,
                chats: req.user.chats,
                address: req.user.address,
                gender: req.user.gender,
                likes: req.user.likes,
                online: req.user.online,
                added: req.user.added
            })
        })
    }
})

router.post('/login',(req,res)=>{

    User.findOne({username:req.body.username}).then(user=>{
        if(!user){
            res.redirect('/wrong-username')
        }else{
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(result){
                    User.update({username:req.body.username},{
                        $set: {online: 'on'}
                    }).then(i=>{
                        req.logout()
                        session.user={
                            username: user.username,
                            name: user.name,
                            thumbnail: user.thumbnail,
                            dateOfBirth: user.dateOfBirth,
                            posts: user.posts,
                            friends: user.friends,
                            chats: user.chats,
                            address: user.address,
                            gender: user.gender,
                            likes: user.likes,
                            online: user.online,
                            added: user.added
                        }
                        res.redirect('/profile')
                    })
                    
                }else{
                    res.redirect('/wrong-password')
                }
            })
        }
    }).catch(err=>console.log(err))
})

router.post('/signup/user',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        User.findOne({username:req.body.username}).then(user=>{
            if(user){
                res.redirect('/fail')
            }else{
                if(!req.body.name || req.body.password){
                    res.redirect('/fail')
                }else{
                    new User({
                        username: req.body.username,
                        password: hash,
                        name: req.body.name,
                        thumbnail: '/images/avatar.jpg',
                        dateOfBirth: '',
                        posts: [],
                        friends: [],
                        chats: [],
                        address: '',
                        gender: '',
                        likes: [],
                        online: 'off',
                        added: []
                    }).save().catch(err=>console.log(err))
                    res.redirect('/')
                }
            }
        })
    })
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/save-post',(req,res)=>{
    User.update({username:req.body.username},{
        $push: {posts:{
            user: req.body.username,
            imageURL: req.body.imageURL,
            thumbnail: '',
            message: req.body.message,
            name: req.body.name,
            time: req.body.time,
            likes: [],
            comments: [],
            id: req.body.id
        }}
    }).catch(err=>console.log(err))
})

router.post('/leave-comment',(req,res)=>{
    let post = []
    User.findOne({username:req.body.userOwner}).then(user=>{
        user.posts.map(item=>item.id===req.body.id? post=item:"")
        post.comments.push(req.body.comment)
    }).then(i=>{
        User.update({username:req.body.userOwner},{
            $pull: {posts:{id:req.body.id}}
        }).then(i=>{
            User.update({username:req.body.userOwner},{
                $push: {posts:post}
            }).catch(err=>console.log(err))
        })
    }).catch(err=>console.log(err))
})

router.post('/like-comment',(req,res)=>{
    let post = ''
    User.findOne({username:req.body.postOwner}).then(user=>{
         user.posts.map(item=>item.id == req.body.postID ? post=item : '')
         if(post!==''){
            post.comments.map(i=>i.identifier==req.body.commentID? i.likes.push(req.body.userPosting):'')
            post.comments.map(comment=>comment.likes = [...new Set(comment.likes)])
            User.update({username:req.body.postOwner},{
                $pull: {posts:{id:req.body.postID}}
            }).then(i=>{
                User.update({username:req.body.postOwner},{
                    $push: {posts:post}
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
         }else{

         }
    }).catch(err=>console.log(err))

})

router.post('/unlike-comment',(req,res)=>{
    let post = ''
    User.findOne({username:req.body.postOwner}).then(user=>{
         user.posts.map(item=>item.id == req.body.postID ? post=item : '')
         if(post!==''){
            post.comments.map(i=>i.identifier==req.body.commentID? i.likes.splice(i.likes.indexOf(req.body.userPosting),1):'')
            User.update({username:req.body.postOwner},{
                $pull: {posts:{id:req.body.postID}}
            }).then(i=>{
                User.update({username:req.body.postOwner},{
                    $push: {posts:post}
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
         }else{

         }
    }).catch(err=>console.log(err))
})

router.post('/like-post',(req,res)=>{
    let post = ''
    User.findOne({username:req.body.postOwner}).then(user=>{
        user.posts.map(item=>item.id==req.body.postID? post = item:"")
        if(post!==''){
            post.likes.push(req.body.postLiker)
            post.likes = [...new Set(post.likes)]
            User.update({username:req.body.postOwner},{
                $pull: {posts:{id:req.body.postID}}
            }).then(user=>{
                User.update({username:req.body.postOwner},{
                    $push: {posts:post}
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
            res.redirect('/profile')
        }
    }).catch(err=>console.log(err))
})
router.post('/unlike-post',(req,res)=>{
    let post = ''
    User.findOne({username:req.body.postOwner}).then(user=>{
        user.posts.map(item=>item.id==req.body.postID? post = item:"")
        if(post!==''){
            post.likes.map(like=>post.likes.includes(req.body.postLiker? post.likes.splice(post.likes.indexOf(req.body.postLiker),1) : ''))
            User.update({username:req.body.postOwner},{
                $pull: {posts:{id:req.body.postID}}
            }).then(user=>{
                User.update({username:req.body.postOwner},{
                    $push: {posts:post}
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
            
        }
    }).catch(err=>console.log(err))
})

router.post('/update-date',(req,res)=>{
    User.update({username:req.body.username},{
        dateOfBirth: req.body.param
    }).then(user=>{
        User.findOne({username:req.body.username}).then(user=>{
            res.send({
                username: user.username,
                name: user.name,
                thumbnail: user.thumbnail,
                dateOfBirth: user.dateOfBirth,
                posts: user.posts,
                friends: user.friends,
                chats: user.chats,
                address: user.address,
                gender: user.gender,
                likes: user.likes,
                online: user.online,
                added: user.added
            })
        })
    }).catch(err=>cosnole.log(err))
})
router.post('/update-address',(req,res)=>{
    User.update({username:req.body.username},{
        address: req.body.param
    }).then(user=>{
        User.findOne({username:req.body.username}).then(user=>{
            res.send({
                username: user.username,
                name: user.name,
                thumbnail: user.thumbnail,
                dateOfBirth: user.dateOfBirth,
                posts: user.posts,
                friends: user.friends,
                chats: user.chats,
                address: user.address,
                gender: user.gender,
                likes: user.likes,
                online: user.online,
                added: user.added
            })
        })
    }).catch(err=>cosnole.log(err))
})
router.post('/update-gender',(req,res)=>{
    User.update({username:req.body.username},{
        gender: req.body.param
    }).then(user=>{
        User.findOne({username:req.body.username}).then(user=>{
            res.send({
                username: user.username,
                name: user.name,
                thumbnail: user.thumbnail,
                dateOfBirth: user.dateOfBirth,
                posts: user.posts,
                friends: user.friends,
                chats: user.chats,
                address: user.address,
                gender: user.gender,
                likes: user.likes,
                online: user.online,
                added: user.added
            })
        })
    }).catch(err=>cosnole.log(err))
})

router.post('/friend-search',(req,res)=>{
    User.findOne({username:req.body.searchFriend}).then(user=>{
        if(user){
            res.send({
                friend: user.username,
                pic: user.thumbnail,
                name: user.name
            })
            res.end()
        }else{
            res.send('no user')
            res.end()

        }
    }).catch(err=>console.log(err))
})

router.post('/add-friend',(req,res)=>{
    User.findOne({username:req.body.userRequesting}).then(user=>{
        
        if(user.added.includes(req.body.userRequested)){
            res.end()
        }else{
            User.update({username:req.body.userRequesting},{
                $push: {friends: {
                    user: req.body.userRequested,
                    profile_pic: req.body.thumbnail,
                    name: req.body.name
                }}
            }).catch(err=>console.log(err))
            User.update({username:req.body.userRequesting},{
                $push: {added: req.body.userRequested}
            }).then(i=>{
                User.findOne({username:req.body.userRequested}).then(user=>{
                    if(user.added.includes(req.body.userRequesting)){

                    }else{
                        User.update({username:req.body.userRequested},{
                            $push: {friends: {
                                user: req.body.userRequesting,
                                profile_pic: req.body.profilePic,
                                name: req.body.userName
                            }}
                        }).then(i=>{
                            User.update({username:req.body.userRequested},{
                                $push: {added: req.body.userRequesting}
                            }).then(i=>res.end()).catch(err=>console.log(err))
                        })
                    }
                })
            }).then(i=>res.end()).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
})

router.post('/edit-profile',(req,res)=>{
    User.update({username:req.body.username},{
        thumbnail: req.body.imageURL
    }).catch(err=>console.log(err))
})

router.post('/info-friends',(req,res)=>{
    let friends = []
    let pic = []
    
    User.findOne({username:req.body.requested}).then( user=>{
        if(user.added.length>0){
           user.added.map(i=>User.findOne({username:i}).then(i=>{
               friends.push(i.posts)
               friends.map(post=>post.map(it=>it.user === i.username ? it.thumbnail=i.thumbnail:''))
               pic.push(i)
               pic.map(item=>item.password='')
               if(friends.length===user.friends.length){
                   res.send({
                       friends,
                       pic
                   })
               }else{
                   
               }
           }))
        }else{
            res.send({
                friends: [],
                pic: []
            })
        }
    }).catch(err=>console.log(err))
})

router.post('/save-chat',(req,res)=>{
    let chat = ''
    User.findOne({username:req.body.sender}).then(user=>{
        chat=user.chats

        if(chat===''){
            User.update({username:req.body.sender},{
                $push: {chats:{
                    with: req.body.container1,
                    context: req.body.chatContent
                }}
            }).then(i=>req.body.logOFF? res.send('logout'):res.send('reload')).catch(err=>console.log(err))
        }else if(chat!==''){
            User.update({username:req.body.sender},{
                $pull: {chats:{with:req.body.container1}}
            }).then(i=>{
                User.update({username:req.body.sender},{
                    $push: {chats:{
                        with: req.body.container1,
                        context: req.body.chatContent
                    }}
                }).then(i=>req.body.logOFF? res.send('logout'):res.send('reload')).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
        
        if(chat===''){
            User.update({username:req.body.receiver},{
                $push: {chats:{
                    with: req.body.container2,
                    context: req.body.chatContent
                }}
            }).then(i=>req.body.logOFF? res.send('logout'):res.send('reload')).catch(err=>console.log(err))
        }else if(chat!==''){
            User.update({username:req.body.receiver},{
                $pull: {chats:{with:req.body.container2}}
            }).then(i=>{
                User.update({username:req.body.receiver},{
                    $push: {chats:{
                        with: req.body.container2,
                        context: req.body.chatContent
                    }}
                }).then(i=>req.body.logOFF? res.send('logout'):res.send('reload')).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
})

router.post('/remove-friend',(req,res)=>{
    User.update({username:req.body.myEmail},{
        $pull: {friends: {user:req.body.removingFriend}}
    }).then(i=>{
        User.update({username:req.body.myEmail},{
            $pull: {added:req.body.removingFriend}
        }).then(i=>{
            User.update({username:req.body.myEmail},{
                $pull: {chats:{with:`window${req.body.removingFriend}window${req.body.myEmail}`}}
            }).then(i=>{
                User.update({username:req.body.removingFriend},{
                    $pull: {friends: {user:req.body.myEmail}}
                }).then(i=>{
                    User.update({username:req.body.removingFriend},{
                        $pull: {added:req.body.myEmail}
                    }).then(i=>{
                        User.update({username:req.body.removingFriend},{
                            $pull: {chats:{with:`window${req.body.myEmail}window${req.body.removingFriend}`}}
                        }).then(i=>res.send('user removed')).catch(err=>console.log(err))
                    })
        })
            })
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.get('/google',passport.authenticate('google',{
    scope: ['https://www.googleapis.com/auth/plus.login',"email"],
    prompt: ["select_account"]
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    User.update({username:req.user.username},{
        $set: {online:'on'}
    }).then(i=>session.user = null)
    res.redirect('/profile')
})

module.exports = router