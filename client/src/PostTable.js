import React, { useContext, useEffect } from 'react'
import Post from './Post'
import PostMessage from './PostMessage';
import { ChatContext } from './Context';
import uniqid from 'uniqid'
import moment from 'moment'
import axios from 'axios'

function PostTable() {
    const [user,setUser,friend,setFriend,friendPost,setFriendPost] = useContext(ChatContext)
    let weekTime = 10080


    return (
        <div className="post_users">
            {!friendPost? '':friendPost.friends.map(i=>i.map(item=><Post styledItem={(new Date()-item.time)/60000 < weekTime? 'block': 'none'}
            styledImage={item.imageURL===''? 'none': 'block'} likes={item.likes? item.likes.length : '0'} Id={item.id} owner={item.user} commentContainerId={item.id}
             key={uniqid()} time={moment(item.time).fromNow()} text={item.message} image={item.imageURL} profilePIC={item.thumbnail?item.thumbnail:''} userName={item.name}
             />))}

            {!user.posts? '':user.posts.map(item=><Post styledItem={(new Date()-item.time)/60000 < weekTime? 'block': 'none'}
            styledImage={item.imageURL===''? 'none': 'block'} likes={item.likes.length} Id={item.id} owner={item.user} commentContainerId={item.id}
             key={uniqid()} time={moment(item.time).fromNow()} text={item.message} image={item.imageURL} userName={user.name} profilePIC={user.thumbnail}
             />)}
        </div>
    )
}

export default PostTable;
