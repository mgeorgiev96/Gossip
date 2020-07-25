import React from 'react'
import NavBar from './NavBar'
import PostTable from './PostTable'
import Chats from './Chats'
import CreatePost from './CreatePost'

function Profile() {
    return (
        <div className='profile_container'>
        <NavBar/>
        <CreatePost/>
        <PostTable/>
        <Chats/>
        </div>
    )
}

export default Profile;
