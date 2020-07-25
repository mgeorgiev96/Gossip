import React,{useContext} from 'react'
import NavBar from './NavBar'
import Post from './Post'
import Chats from './Chats'
import {ChatContext} from './Context'
import moment from 'moment'
import axios from 'axios'
import CreatePost from './CreatePost'
import firebase from './firebase'
import uniqid from 'uniqid'


function Personal() {
    let weekTime = 10080
    const editDate = (e)=>{
        let date = document.querySelector('.edit_date')
        let save = document.querySelector('.save-date')
        if(e.target.classList.contains('edit-date')){
            if(date.style.display === 'none'){
                date.style.display = 'block'
                save.style.display = 'block'
            }else{
                date.style.display = 'none'
                save.style.display = 'none'
            }
        }
    }
    const saveDate = (e)=>{
        let date = document.querySelector(".user_birthday")
        let target = e.target
        let upDate = moment(new Date(target.parentElement.children[0].value)).format('LL')
        target.parentElement.children[0].style.display = 'none'
        target.style.display = 'none'
        axios.post('/api/update-date',{
            username: user.username,
            param: upDate
        }).then(i=>{
            setUser(i.data)
        })
    }
    const editGender = (e)=>{
        let gender = document.querySelector('.edit_gender')
        let save = document.querySelector('.save-gender')
        if(e.target.classList.contains('edit-gender')){
            if(gender.style.display === 'none'){
                gender.style.display = 'block'
                save.style.display = 'block'
            }else{
                gender.style.display = 'none'
                save.style.display = 'none'
            }
        }
    }
    
    const saveGender = (e)=>{
        let gender = document.querySelector(".user_gender")
        let target = e.target
        let selectedGender = target.parentElement.children[0].value
        target.parentElement.children[0].style.display = 'none'
        target.style.display = 'none'
        axios.post('/api/update-gender',{
            username: user.username,
            param: selectedGender
        }).then(i=>{
            setUser(i.data)
        })
    }
    const editAddress = (e)=>{
        let address = document.querySelector('.edit_address')
        let save = document.querySelector('.save-address')
        if(e.target.classList.contains('edit-address')){
            if(address.style.display === 'none'){
                address.style.display = 'block'
                save.style.display = 'block'
            }else{
                address.style.display = 'none'
                save.style.display = 'none'
            }
        }
    }
    const saveAddress = (e)=>{
        let address = document.querySelector(".user_address")
        let target = e.target
        let selectedAddress = target.parentElement.children[0].value
        target.parentElement.children[0].style.display = 'none'
        target.style.display = 'none'
        axios.post('/api/update-address',{
            username: user.username,
            param: selectedAddress
        }).then(i=>{
            setUser(i.data)
        })
    }

    const editProfile = (e)=>{
        let saveProfile = document.querySelector('.save-profile-picture')
        saveProfile.style.display = 'block'
    }
    const loadProfileFile = (e)=>{
        let target= e.target
        let img = document.querySelector('.edit-profile-picture')
        let span = document.querySelector('.profile-pic-file')
        span.innerHTML = img.files[0].name
       
    }
    const saveProfile = (e)=>{
        let img = document.querySelector('.edit-profile-picture')
        let file= img.files[0]
        if(file){
            let postCreatedTime = moment(Date.now()).format('LTS')
            let storageRef = firebase.storage().ref(`${user.username}/${file.name}${postCreatedTime}`)
            let uploadTask = storageRef.put(file).then(i=>{
    
              let storage= firebase.storage().ref()
              let spaceRef = storage.child(`${user.username}/${file.name}${postCreatedTime}`).getDownloadURL().then((url)=>{
                if(spaceRef){
                  axios.post('/api/edit-profile',{
                    username: user.username,
                    imageURL: url
                  })
                  window.location.reload()
                }
              })
            })
          }else{
              
          }
    }

    const [user,setUser,friend,setFriend,friendPost,setFriendPost]=useContext(ChatContext)
   
    return (
        <div className='profile_container'>
            <NavBar/>
            <CreatePost/>
            <div className="personal_info">
                <div className="inner_container">
                <div className="information-user">
                    <p>{user.name}</p>
                    <p onClick={editDate} className="user_birthday"><i className="fas fa-birthday-cake"></i>{!user.dateOfBirth ? `- -/- -/- - - -` :user.dateOfBirth}<i className="fas fa-edit edit-date"></i></p>
                    <div>
                    <input className="edit_date" type="date"></input>
                    <i className="fas fa-save save-date" onClick={saveDate}></i>
                    </div>
                    <p onClick={editGender} className="user_gender">{!user.gender? '--' : user.gender}<i className="fas fa-edit edit-gender"></i></p>
                    <div>
                    <select className="edit_gender" type="select">
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <i className="fas fa-save save-gender" onClick={saveGender}></i>
                    </div>
                    <p>{!user.friends ? '0 Following' : `${Object.keys(user.friends).length} Following`}</p>
                </div>
                <div className="information-user1">
                    <p>{!user.posts ? '0 Posts' : `${Object.keys(user.posts).length} Posts`}</p>
                    <p className="user_address" onClick={editAddress}><i className="fas fa-map-marker-alt"></i>{!user.address? '----' : user.address}<i className="fas fa-edit edit-address"></i></p>
                    <div>
                    <input className="edit_address" type="text"></input>
                    <i className="fas fa-save save-address" onClick={saveAddress}></i>
                </div>
                </div>
                <div className="profile-picture-container">
                <img src={user.thumbnail} className="thumbnail_pic"></img>
                <i className="fas fa-camera-retro" onClick={editProfile}><input onChange={loadProfileFile} type="file" className="edit-profile-picture"></input></i>
                    <button className="save-profile-picture far fa-save" onClick={saveProfile}></button>
                    <span className="profile-pic-file"></span>
                </div>
                
                </div>
                <div className="personal_post">
                {!user.posts? '':user.posts.map(item=><Post styledItem={(new Date()-item.time)/60000 < weekTime? 'block': 'none'}
            styledImage={item.imageURL===''? 'none': 'block'} likes={item.likes.length} Id={item.id} owner={item.user} commentContainerId={item.id}
             key={uniqid()} time={moment(item.time).fromNow()} text={item.message} image={item.imageURL} profilePIC={user.thumbnail} userName={user.name}
             />)}
                </div>
                <Chats/>
            </div>
        </div>
    )
}

export default Personal;
