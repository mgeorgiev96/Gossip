import React,{createContext,useState,useEffect} from 'react'
import axios from 'axios'


export const ChatContext = createContext()

export const ChatProvider = (props)=>{
    
    const [user,setUser] = useState('')
    const [friend,setFriend] = useState('')
    const [friendPost,setFriendPost] = useState(undefined)
    const [profileUser,setProfileUser] = useState('')
    const [index,setIndex] = useState(true)
    const [pass,setPass] = useState(false)
    const [passMessage,setPassMessage] = useState(false)
    const [count,setCount] = useState(0)

    useEffect(()=>{
        axios.get('/api/info').then(info=>{
          setUser(info.data)
        })
        
      },[])
      if(!friendPost){
        axios.post('/api/info-friends',{
            requested: user.username
        }).then(i=>{
            setFriendPost(i.data) 
            setPass(!pass)
        })
    }
    
    return(
        <ChatContext.Provider value={[user,setUser,friend,setFriend,friendPost,setFriendPost,profileUser,setProfileUser,index,setIndex,pass,setPass,passMessage,setPassMessage,count,setCount]}>
            {props.children}
        </ChatContext.Provider>
    )
}