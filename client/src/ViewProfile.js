import React,{useContext, useEffect} from 'react'
import NavBar from './NavBar'
import Post from './Post'
import Chats from './Chats'
import {ChatContext} from './Context'
import moment from 'moment'
import axios from 'axios'
import CreatePost from './CreatePost'
import uniqid from 'uniqid'

function ViewProfile() {
    const [user,setUser,friend,setFriend,friendPost,setFriendPost,profileUser,setProfileUser]= useContext(ChatContext)
    let weekTime = 10080
    useEffect(()=>{
        axios.get('/api/view-profile-account').then(i=>{
            setProfileUser(i.data)
        })
    },[])
    return (
        <div className='profile_container'>
            <NavBar/>
            <CreatePost/>
            <div className="personal_info">
                <div className="inner_container">
                <div className="information-user">
                    <p>{profileUser.name}</p>
                    <p className="user_birthday"><i className="fas fa-birthday-cake"></i>{!profileUser.dateOfBirth ? `- -/- -/- - - -` :profileUser.dateOfBirth}</p>
                    <div>
                    </div>
                    <p className="user_gender">{!profileUser.gender? '--' : profileUser.gender}</p>
                    <div>
                    </div>
                    <p>{!profileUser.friends ? '0 Following' : `${Object.keys(profileUser.friends).length} Following`}</p>
                </div>
                <div className="information-user1">
                    <p>{!profileUser.posts ? '0 Posts' : `${Object.keys(profileUser.posts).length} Posts`}</p>
                    <p className="user_address"><i className="fas fa-map-marker-alt"></i>{!profileUser.address? '----' : profileUser.address}</p>
                    <div>
                </div>
                </div>
                <div className="profile-picture-container">
                <img src={profileUser.thumbnail} className="thumbnail_pic"></img>
                </div>
                
                </div>
                <div className="personal_post">
                {!profileUser.posts? '':profileUser.posts.map(item=><Post styledItem={(new Date()-item.time)/60000 < weekTime? 'block': 'none'}
            styledImage={item.imageURL===''? 'none': 'block'} likes={item.likes.length} Id={item.id} owner={item.user} commentContainerId={item.id}
             key={uniqid()} time={moment(item.time).fromNow()} text={item.message} image={item.imageURL} profilePIC={profileUser.thumbnail} userName={profileUser.name}
             />)}
                </div>
                <Chats/>
            </div>
        </div>
    )
}

export default ViewProfile;
