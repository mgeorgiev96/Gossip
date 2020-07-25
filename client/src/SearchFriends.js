import React,{useContext} from 'react'
import {ChatContext} from './Context'
import axios from 'axios'

function SearchFriends() {
    const[user,setUser,friend,setFriend] = useContext(ChatContext)
    const addFriend = (e)=>{
        let target = e.target
        let container = document.querySelector('.search-friend-container')
        axios.post('/api/add-friend',{
            userRequesting: user.username,
            userRequested: friend.friend,
            thumbnail: friend.pic,
            name: friend.name,
            userName: user.name,
            profilePic: user.thumbnail
        })
        container.style.display = 'none'
    }
    return (
        <div className="search-friend-container">
            <p className="search-friend-result"><img src={friend.pic?friend.pic:"/images/avatar.jpg"}></img>{friend.name?friend.name:''}<i className="fas fa-user-plus" onClick={addFriend}></i></p>
        </div>
    )
}

export default SearchFriends;
