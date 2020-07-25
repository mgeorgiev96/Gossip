import React, { useContext } from 'react'
import {ChatContext} from './Context'
import axios from 'axios'

function Chats() {
    const [user,setUser,friend,setFriend,friendPost,setFriendPost,profileUser,setProfileUser,index,setIndex,pass,setPass,passMessage,setPassMessage,count,setCount]= useContext(ChatContext)

    const showEmoji=(e)=>{
        let target= e.target
        let emoji = document.querySelector('.fa-smile-wink')

        if(target.classList.contains('fa-minus')){
            let friendEmail = target.parentElement.children[1].classList[2]
            if(user.username && friendPost && index && pass && passMessage){
                axios.post('/api/remove-friend',{
                    removingFriend: friendEmail,
                    myEmail: user.username
                }).then(i=>{
                    if(i){
                        window.location.reload()
                    }
                })
            }
        }

        if(target.classList.contains('fa-smile-wink')){
            target.style.zIndex = '0'
            target.children[0].style.zIndex = '1'
            target.children[1].style.display = 'grid'
        }
        if(target.classList.contains('fa-smile')){
            target.style.zIndex = '-1'
            target.parentElement.style.zIndex = '1'
            target.parentElement.children[1].style.display = 'none'
        }
        if(target.classList.contains('emoji')){
            let message  = target.parentElement.parentElement.parentElement.children[0]
            let result = ''
                result = (Array.from(new Set(target.innerHTML)).join(''))
                if(result && !friendPost && user){

                    if(pass){
                        message.value += result
                    }else if(!pass){
                        message.value += result
                    }
                }

        }
        if(target.classList.contains('fa-times')){
            let closeChat = target.parentElement.parentElement
            let container = target.parentElement.parentElement.parentElement

            if(user.username){
                let windowContainer = document.getElementById( `window${target.parentElement.parentElement.classList[1]}window${user.username}`)
                if(windowContainer){
                    axios.post('/api/save-chat',{
                        container1: `window${target.parentElement.parentElement.classList[1]}window${user.username}`,
                        container2: `window${user.username}window${target.parentElement.parentElement.classList[1]}`,
                        sender: user.username,
                        receiver: target.parentElement.parentElement.classList[1],
                        chatContent: windowContainer.innerHTML
                      })
                      if(container && closeChat){
                        container.removeChild(closeChat)
                        window.location.reload()
                      }
                }
            }
        }
      }
      window.addEventListener('click',showEmoji)
    return (
        <>
        <div className='chat_container'>
        </div>
        </>
    )
}

export default Chats;
