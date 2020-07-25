import React, { useState, useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Emoji from './Emoji'
import axios from 'axios'
import {ChatContext} from './Context'
import SingleComment from './SingleComment'
import uniqid from 'uniqid'

function Post(props) {

  const [commentsHide,setHide] = useState(true)
  const [user,setUser,friend,setFriend,friendPost,setFriendPost] = useContext(ChatContext)
  useEffect(()=>{
    let postedComment = document.querySelectorAll('.user-comment-post')
    let postLikes = document.querySelectorAll('.like-comment-button')
    
    if(user.posts && user.posts.length!==0){
      for(let i=0;i<postedComment.length;i++){
        user.posts.map(item=>postedComment[i].classList[1]==item.id? item.comments.map(com=>{
          com.identifier==postedComment[i].classList[2] ? postedComment[i].children[2].innerHTML= com.likes.length : ''
        }):'')
        user.posts.map(item=>postedComment[i].classList[1]==item.id? item.comments.map(com=>{
          com.identifier==postedComment[i].classList[2] ? com.likes.includes(user.username) ? postedComment[i].children[2].classList.add('liked-comment') :''  : ''
        }):'')
      }
      if(friendPost){
        for(let i=0;i<postedComment.length;i++){
          friendPost.friends.map(item=>item.map(inner=>inner.id==postedComment[i].classList[1]? inner.comments.map(com=>{
            com.identifier==postedComment[i].classList[2] ? com.likes.includes(user.username) ? postedComment[i].children[2].classList.add('liked-comment') :''  : ''
          }) : ''))

          friendPost.friends.map(item=>item.map(inner=>inner.id==postedComment[i].classList[1]? inner.comments.map(com=>{
            com.identifier==postedComment[i].classList[2] ? postedComment[i].children[2].innerHTML= com.likes.length : ''
          }) : ''))
        }
      }

      for(let i=0;i<postLikes.length;i++){
        if(user.posts){
          user.posts.map(item=>item.id == postLikes[i].classList[3] ? item.likes.includes(user.username) ? postLikes[i].classList.add('liked-post') : '' : '')
        }
        if(friendPost){
          friendPost.friends.map(item=>item.map(inner=>inner.id == postLikes[i].classList[3] ? inner.likes.includes(user.username) ? postLikes[i].classList.add('liked-post') : '' : ''))
        }
      }
    }
  },[])
  const likeUnlikePost = (e)=>{
    let target = e.target
    let postOwner = target.classList[2]
    let postLiker = user.username
    let postID = target.classList[3]

    if(target.classList.contains('liked-post')){
      axios.post('/api/unlike-post',{
        postOwner,
        postLiker,
        postID
      })
    }else{ 
    axios.post('/api/like-post',{
      postOwner,
      postLiker,
      postID
    })
    }

    window.location.reload()

  }
    const openComment = (e)=>{
        let comments = e.target.parentElement.parentElement.children[5]
        let comment = e.target.parentElement.parentElement.children[6]
        if(comment.style.display === 'none' || comment.style.display === '' ){     
          comment.style.display = 'block'
          comments.style.display = 'block'
        }else{
          comment.style.display = 'none'
          comments.style.display = 'none'
        }
    }
    const hideComment = (e)=>{
      let comments = e.target.parentElement.parentElement.children[5]
      let comment = e.target.parentElement.parentElement.children[6]
      if(e.target.classList.contains('fa-comment-slash')){
        
      }
      
      comment.style.display = 'none'
    }
    const leaveComment = (e)=>{
        e.preventDefault()
        let message = e.target.children[0] 
        let comments = e.target.parentElement.children[5]
        let id = uniqid()
        comments.innerHTML += `<p class="user-comment-post ${id}"><img class="current-image-comment" src=${user.thumbnail}>${message.value}<br><i class="fas fa-heart"></i></p>`

        axios.post('/api/leave-comment',{
          userOwner: e.target.children[1].classList[2],
          userPosting: user.username,
          comment: {
            msg: message.value,
            pic: user.thumbnail,
            identifier: id,
            likes: []
          },
          id: e.target.children[1].classList[1]
          
        })
        message.value = ''
    }
    return (
      <>
              <Card style={{display: props.styledItem}}>
              <Card.Img variant="top" src={props.image} style={{display: props.styledImage}}></Card.Img>
        <Card.Body>
        <h5 style={{fontWeight:"bold"}}>{props.userName}</h5>
        <img className='profile_pic' src={props.profilePIC}></img>
        <span className='time_post'>{props.time}</span>

          <Card.Text>
          {props.text}
          </Card.Text>
          <div className="likes">
          <i className={`fas fa-heart ${props.owner } ${props.Id} like-comment-button`} onClick={likeUnlikePost}>{props.likes}</i>
          <i className="fas fa-comments" onClick={openComment}></i>
          </div>
          <div className={`comments ${props.commentContainerId}`}>
            {user.posts ? user.posts.map(item=>item.comments.map(inner=>props.commentContainerId==item.id?<SingleComment 
            clas={item.id} commentIdentity={inner.identifier} key={uniqid()} userImage={inner.pic} userMessage={inner.msg}/>:'')
            ):''}
            {friendPost ? friendPost.friends.map(i=>i.map(item=>item.comments.map(inner=>props.commentContainerId==item.id?<SingleComment 
            clas={item.id} commentIdentity={inner.identifier} key={uniqid()} userImage={inner.pic} userMessage={inner.msg}/>:''))
            ):''}
          </div>
          <form onSubmit={leaveComment} className="user_comment_form">
              <textarea className='user_comment' placeholder='Leave Comment'></textarea>
              <button className={`post_button ${props.Id} ${props.owner}`}type="submit"><i className="fas fa-arrow-circle-up"></i></button>
              <Emoji/>
          </form>
        </Card.Body>
      </Card>
            </>
    )
}

export default  Post;
