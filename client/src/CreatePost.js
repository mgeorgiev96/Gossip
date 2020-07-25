import React,{useState, useContext} from 'react'
import Emoji from './Emoji';
import Post from './Post';
import axios from 'axios'
import moment from 'moment'
import {ChatContext} from './Context'
import firebase from './firebase'
import uniqid from 'uniqid'
import Spinner from 'react-bootstrap/Spinner'

function CreatePost() {
    const [user,setUser] = useContext(ChatContext)
    const loadFileName = ()=>{
      let fileName = document.querySelector('.file_name')
      let img = document.querySelector('.current-post-image')
      fileName.innerHTML = img.files[0].name
    }
    const createPost =  (e)=>{
        let target = e.target
        let post_container = document.querySelector('.profile_container')
        let msg = document.querySelector('.current-post-message')
        let img = document.querySelector('.current-post-image')
        let file = img.files[0]
        let spinner = document.querySelector('.spinner-border')
        spinner.style.display = 'block'
        if(file){
          let postCreatedTime = moment(Date.now()).format('LTS')
          let storageRef = firebase.storage().ref(`${user.username}/${file.name}${postCreatedTime}`)
          let uploadTask = storageRef.put(file).then(i=>{
  
            let storage= firebase.storage().ref()
            let spaceRef = storage.child(`${user.username}/${file.name}${postCreatedTime}`).getDownloadURL().then((url)=>{
              if(spaceRef){
                axios.post('/api/save-post',{
                  username: user.username,
                  name: user.name,
                  imageURL: url,
                  message: msg.value,
                  time: Date.now(),
                  id: uniqid()
                })
                spinner.style.display = 'none'
                window.location.reload()
              }
            })
          })
        }else{
          axios.post('/api/save-post',{
            username: user.username,
            profilePic: user.thumbnail,
            name: user.name,
            imageURL: '',
            message: msg.value,
            time: Date.now(),
            id: uniqid()
          })
          window.location.reload()
        }
        
    }
  
    return (
      
      <div className="post_container">
          <h3>What's on your mind?</h3>
          <div className='post_content'>
          <textarea className="current-post-message">

          </textarea>
            <Emoji/>
          <i className="far fa-images"><input className="current-post-image" type="file" onChange={loadFileName}></input></i>
          <span className="file_name"></span>
          <Spinner animation="border" role="status">
           <span className="sr-only">Loading...</span>
         </Spinner>
          </div>
         <button className="fas fa-share-alt" onClick={createPost}></button>
      </div>
    );
  }
  
  export default CreatePost;
