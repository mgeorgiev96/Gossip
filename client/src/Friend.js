import React, { useContext } from 'react'
import axios from 'axios'
import {ChatContext} from './Context'

function Friend(props) {
  const [user,setUser,friend,setFriend,friendPost,setFriendPost,profileUser,setProfileUser] = useContext(ChatContext)
  const saveChatViewProfile = ()=>{
    let chatContainer = document.querySelector('.chat_container')
    if(chatContainer.children[0] && user.username){
      let receiverUser = chatContainer.children[0].classList[1]
      if(chatContainer.children[0].children[1].innerHTML!==''){
        axios.post('/api/save-chat',{
          container1: `window${receiverUser}window${user.username}`,
          container2: `window${user.username}window${receiverUser}`,
          sender: user.username,
          receiver: receiverUser,
          chatContent: chatContainer.children[0].children[1].innerHTML
        }).then(i=>{
          window.location.replace('/view-user-profile')
        })
      }else{
        window.location.replace('/view-user-profile')
      }
    }else{
      window.location.replace('/view-user-profile')
    }
  }
  const openProfile = (e)=>{
    let target = e.target
    let email = target.classList[2]
    axios.post('/api/view-profile-user',{
      username: email
    }).then(res=>{
      if(res.data==='reload'){
        saveChatViewProfile()
      }
    })
  }
  const removeFriend = (e)=>{
    let target = e.target
}
    return (
      <li className='friend'><i className="far fa-circle" style={props.userActivity}></i><img onClick={openProfile} className={`${props.friendImage} ${props.friendName} ${props.email}`} src={props.friendImage}></img>{props.friendName}<i className="fas fa-minus"></i><i className="fas fa-comment-dots"></i></li>
    )
}

export default Friend;
