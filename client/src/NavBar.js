import React, {useEffect , useState ,useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import DropdownButton from 'react-bootstrap/DropdownButton'
import axios from 'axios'
import {ChatContext} from './Context'
import SearchFriends from './SearchFriends'
import Friend from './Friend'
import uniqid from 'uniqid'



function NavBar() {
  const [user,setUser,friend,setFriend,friendPost,setFriendPost,profileUser,setProfileUser,index,setIndex,pass,setPass,passMessage,setPassMessage,count,setCount] = useContext(ChatContext)
  let socket = io.connect('https://gossip-c.herokuapp.com')
  let form = document.querySelector('.user-chat-form')
  const saveChatLogout = ()=>{
    let chatContainer = document.querySelector('.chat_container')
    if(chatContainer.children[0] && user.username){
      let receiverUser = chatContainer.children[0].classList[1]
      if(chatContainer.children[0].children[1].innerHTML!==''){
        axios.post('/api/save-chat',{
          container1: `window${receiverUser}window${user.username}`,
          container2: `window${user.username}window${receiverUser}`,
          sender: user.username,
          receiver: receiverUser,
          chatContent: chatContainer.children[0].children[1].innerHTML,
          logOFF: true
        }).then(i=>{
          if(i.data==='logout'){
            axios.get('/api/logout').then(i=>window.location.replace('/'))
          }
        })
      }else{
        axios.get('/api/logout').then(i=>window.location.replace('/'))
      }
    }else{
      axios.get('/api/logout').then(i=>window.location.replace('/'))
    }
  }
  const saveChatProfile = ()=>{
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
          window.location.replace('/profile')
        })
      }else{
        window.location.replace('/profile')
      }
    }else{
      window.location.replace('/profile')
    }
  }
  const saveChatPersonal = ()=>{
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
          window.location.replace('/personal')
        })
      }else{
        window.location.replace('/personal')
      }
    }else{
      window.location.replace('/personal')
    }
  }
  const sendMessageEnter = (e)=>{
    let chatContainer = document.querySelector('.chat_container')
    setPassMessage(true)
    if(chatContainer.children.length!==0 && e.keyCode===13){
        let windowChat = chatContainer.children[0].children[1]
        let message = chatContainer.children[0].children[2].children[0]
        if(user && friendPost && index &&  passMessage && message.value!==''){

          socket.emit('chat',{
            note: message.value,
            userSendingTo: chatContainer.classList[1],
            userSending: user.username,
            pic: user.thumbnail,
            container1: `window${chatContainer.classList[1]}`,
            container2: `window${user.username}`,
            id: message.id
          })}
    }
}
window.addEventListener('keydown',sendMessageEnter)
  const sendMessage = (e)=>{
    let target=e.target
    let message = target.parentElement.children[0]
    setPassMessage(true)
    
    if(target.classList.contains('fa-share') && message.value!==''){
      let privateChatWindow = target.parentElement.parentElement.id
      let privateChatWindowUser = target.id
      if(user && friendPost && index &&  passMessage){
      socket.emit('chat',{
        note: message.value,
        userSendingTo: target.classList[2],
        userSending: user.username,
        pic: user.thumbnail,
        container1: privateChatWindow,
        container2: privateChatWindowUser,
        id: message.id
      })
    }
    }

  }

  useEffect(()=>{
    
    socket.on('context',(data)=>{
      if(data && data.pic){
        setPassMessage(false)
        if(user && friendPost && index && passMessage){
          let windowContainer = document.getElementById(`${data.container1}${data.container2}`)
          let windowContainer1 = document.getElementById(`${data.container2}${data.container1}`)
          let chatBox = document.getElementById(data.id)
          let chatInfo = document.querySelector('.chat_container')
          if(windowContainer){
            windowContainer.innerHTML+=`<p class="message_chat_user"><img src="${data.pic}">${data.note}</p>`
            chatBox.value = ''
            windowContainer.scrollTop = windowContainer.scrollHeight
            axios.post('/api/save-chat',{
              container1: `window${data.userSendingTo}window${user.username}`,
              container2: `window${user.username}window${data.userSendingTo}`,
              sender: user.username,
              receiver: data.userSendingTo,
              chatContent:  windowContainer.innerHTML
            })
          }
          if(windowContainer1){
            windowContainer1.innerHTML+=`<p class="message_chat_user"><img src="${data.pic}">${data.note}</p>`
            chatBox.value = ''
            windowContainer1.scrollTop = windowContainer1.scrollHeight
            axios.post('/api/save-chat',{
              container1: `window${data.userSendingTo}window${user.username}`,
              container2: `window${user.username}window${data.userSendingTo}`,
              sender: user.username,
              receiver: data.userSendingTo,
              chatContent:  windowContainer1.innerHTML
            })
          }
        }
      }
    })
  
  })

  const searchPerson = (e)=>{
    e.preventDefault()
    let friendSearched = document.querySelector('.search_friend')
    let container = document.querySelector('.search-friend-container')
    friendSearched.classList.remove('fail-search')
    if(friendSearched.value===user.username){
      friendSearched.classList.add('fail-search')
      container.style.display = 'none'
    }else{
      axios.post('/api/friend-search',{
        searchFriend: friendSearched.value,
        user: user.username
      }).then(res=>{
        if(res.data.friend){
          container.style.display = 'flex'
          friendSearched.value = ''
          setFriend(res.data)
        }else{
          friendSearched.classList.add('fail-search')
          friendSearched.value = ''
          container.style.display = 'none'
        }
      })
    }
  }


  const showCreatePost = ()=>{
    let makePost = document.querySelector('.post_container')
    if(makePost.style.display=='block'){
      makePost.style.display='none'
    }else{
      makePost.style.display='block'
    }
  }

  const showChats = ()=>{
    let chat_container  = document.querySelector(".chat_container")
    if(index){
      chat_container.style.display = 'grid'
    }else{
      chat_container.style.display = 'none'
    }

    setIndex(!index)
  }

  const createPrivateChat = (e)=>{
    let chatContainer = document.querySelector('.chat_container')
    let target = e.target
    if(target.classList[1]=='fa-comment-dots'){
    let emoji = document.querySelector('.fa-smile-wink')
    let user_name = target.parentElement.children[1].classList[1]
    let user_pic = target.parentElement.children[1].classList[0]
    let email  = target.parentElement.children[1].classList[2]
    if(target.classList.contains('fa-comment-dots')){
      setCount(0)
      if(chatContainer.style.display==='grid' && chatContainer.children.length>0){
        if(chatContainer.children[0].children[1].innerHTML!==''){
          let content = chatContainer.children[0].children[1].innerHTML
          window.location.reload()
        }
      }else{
        
      }
       chatContainer.innerHTML = `<div class="chat_window ${email}" id="window${email}">
      <p class="current_user"><img src='${user_pic}'>${user_name}<i class="fas fa-times"></i></p>
      <div class="window" id="window${email}window${user.username}">${user.chats.map(i=>i.with===`window${email}window${user.username}`?i.context:'')}</div>
      <div class="controls">
      <input type="text" class="current_message" id="${uniqid()}">
      <i class="fas fa-share ${email}" id="window${user.username}"></i>
      <i class="fas fa-smile-wink">
      <i class="fas fa-smile"></i>
      <div class="emoji_container">
      <p class="emoji">&#128540;</p>
      <p class="emoji">&#128512;</p>
      <p class="emoji">&#128513;</p>
      <p class="emoji">&#128514;</p>
      <p class="emoji">&#128515;</p>
      <p class="emoji">&#128516;</p>
      <p class="emoji">&#128517;</p>
      <p class="emoji">&#128518;</p>
      <p class="emoji">&#128519;</p>
      <p class="emoji">&#128520;</p>
      <p class="emoji">&#128521;</p>
      <p class="emoji">&#128522;</p>
      <p class="emoji">&#128523;</p>
      <p class="emoji">&#128524;</p>
      <p class="emoji">&#128525;</p>
      <p class="emoji">&#128526;</p>
      <p class="emoji">&#128527;</p>
      <p class="emoji">&#128528;</p>
      <p class="emoji">&#128529;</p>
      <p class="emoji">&#128530;</p>
      <p class="emoji">&#128526;</p>
      <p class="emoji">&#128527;</p>
      <p class="emoji">&#128528;</p>
      <p class="emoji">&#128529;</p>
      <p class="emoji">&#128530;</p>
      <p class="emoji">&#128531;</p>
      <p class="emoji">&#128536;</p>
      <p class="emoji">&#128533;</p>
      <p class="emoji">&#128538;</p>
      <p class="emoji">&#128552;</p>
      <p class="emoji">&#128557;</p>
      <p class="emoji">&#128564;</p>
      <p class="emoji">&#128567;</p>
      <p class="emoji">&#129297;</p>
      <p class="emoji">&#129488;</p>
      </div>
      </i>
      </div>
      </div>
      `
      let windowAdjust = chatContainer.children[0].children[1]
      chatContainer.style.display = 'grid'
      chatContainer.classList.add(email)
      setIndex(false)
      windowAdjust.scrollTop = windowAdjust.scrollHeight
    }}
  }

window.addEventListener('click',sendMessage)


    return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand>gossip</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link><i className="fas fa-home" onClick={saveChatProfile}></i></Nav.Link>
    <Nav.Link><i className="fas fa-user" onClick={saveChatPersonal}></i></Nav.Link>
      <Nav.Link> <i className="fas fa-users"><DropdownButton id="dropdown-basic-button" title="">
        <ul className="friend_list" onClick={createPrivateChat}>
           {friendPost? friendPost.pic.map(friend=><Friend userActivity={friend.online==='on' ? {backgroundColor: "seagreen"}:{backgroundColor:"gray"}} key={uniqid()} email={friend.username} friendImage={friend.thumbnail?friend.thumbnail:''} friendName={friend.name.match(/^\S*/)}/>):''}
        </ul>
</DropdownButton></i></Nav.Link>
      <Nav.Link><i className="fas fa-comments" onClick={showChats}></i></Nav.Link>
      <Nav.Link><i onClick={showCreatePost} className="fas fa-plus-circle"></i></Nav.Link>
      <Nav.Link><i className="fas fa-sign-out-alt" onClick={saveChatLogout}></i></Nav.Link>
    </Nav>
    <Form inline className="search-friend-form">
      <FormControl type="text" placeholder="Email" className={"mr-sm-2 search_friend"} />
      <button type="submit" className="fas fa-user-friends" onClick={searchPerson}></button>
      <SearchFriends/>
    </Form>
  </Navbar.Collapse>
</Navbar>
    )
}

export default NavBar;
