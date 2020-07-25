import React,{useContext} from 'react'
import {ChatContext} from './Context'
import axios from 'axios'

function SingleComment(props) {
    const [user,setUser] = useContext(ChatContext)

    const likeUnlikeComment = (e)=>{
        let target = e.target
        let commentID = target.parentElement.classList[2]
        let postID = target.parentElement.classList[1]
        let postOwner = target.parentElement.parentElement.parentElement.lastChild.children[1].classList[2]
        if(target.classList.contains('liked-comment')){
            axios.post('/api/unlike-comment',{
                postOwner: postOwner,
                userPosting: user.username,
                commentID: commentID,
                postID: postID
            })
            target.classList.remove('liked-comment')
        }else{
            axios.post('/api/like-comment',{
                postOwner: postOwner,
                userPosting: user.username,
                commentID: commentID,
                postID: postID
            })
            target.classList.add('liked-comment')
        }
        window.location.reload()
    }
    return (
<p className={`user-comment-post ${props.clas} ${props.commentIdentity}`}><img className="current-image-comment" src={props.userImage}></img>{props.userMessage}<br></br><i onClick={likeUnlikeComment} className="fas fa-heart">1</i></p>
    )
}

export default SingleComment;
