import { useContext, useEffect, useState } from "react"
import { UserContext } from '../App.js'
import style from '../App.module.css'
import axios from 'axios'

export default function Post({props, getPosts}) {

    const user = useContext(UserContext)

    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [likedByUser, setLikedByUser] = useState(false)

    const [userCommentText, setUserCommentText] = useState('')

    useEffect(() => {
        console.log(props)
        getComments()
        getLikes()
    }, [])

    useEffect(() => {
        if (likes.some((like) => like.user === user._id)) {
            setLikedByUser(true)
        } else {
            setLikedByUser(false)
        }
    }, [likes])

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:3001/posts/${props._id}/delete`)
            console.log('Post Deleted')
            await getPosts()
        } catch (e) {
            console.error(e)
        }
    }

    const getComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/posts/${props._id}/comments`)
            setComments(response.data)
        } catch (e) {
            console.error(e)
        }     
    }

    const getLikes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/posts/${props._id}/likes`)
            console.log("LIKES: ",response.data)
            setLikes(response.data)
        } catch (e) {
            console.error(e)
        } 
    }

    const createComment = async () => {
        try {
            const comment = {
                user: user._id,
                post: props._id,
                content: userCommentText
            }
            
            await axios.post('http://localhost:3001/comments/create', comment)
            console.log("Comment Created: ", comment)
            setUserCommentText("")
            await getComments()
        } catch (e) {
            console.error(e)
        }
    }

    const handleLikeStyle = () => {
        return likedByUser ? style.unlikeButton : style.likeButton
    }

    const handleLike = async () => {
        if (likedByUser) {
            await axios.delete(`http://localhost:3001/likes/${likes.find((like) => like.user === user._id)._id}/delete`)
            await getLikes()
        } else {

            const like = {
                user: user._id,
                post: props._id
            }

            await axios.post(`http://localhost:3001/likes/create`, like)
            await getLikes()
        }
    }

    return(
        <div className={style.card}>
            {
                props.image !== "" &&
                <div className={style.postPictureContainer}>
                    <img src={props.image} />
                </div>
            }
            <div className={style.postHeader}>
                <div className={style.postProfilePicContainer}>
                    <img src={props.user.profile_picture} alt="Post Profile" className={style.postProfilePic}/>
                </div>
                <h3>{props.user.username}</h3>
                {
                    props.user._id === user._id 
                        && <button onClick={deletePost}>Delete</button>
                }
            </div>
            <p>{props.content}</p>
            <div className={style.postOptions}>
                <button 
                    className={handleLikeStyle()}
                    onClick={handleLike}>
                        {likedByUser ? "Unlike" : "Like"}
                </button>
                <span>{likes.length} Likes</span>
            </div>
            <div>
                {
                    comments.map((comment) => {
                        return (
                            <div className={style.commentContainer}>
                                <div className={style.commentHeaderContainer}>
                                    <div className={style.commentProfilePicContainer}>
                                        <img src={comment.user.profile_picture} alt='user profile' className={style.commentProfilePic}/>
                                    </div>
                                    <h4>{comment.user.username}</h4>
                                    {
                                        comment.user._id === user._id 
                                        && <button 
                                            className={style.deleteComment} 
                                            onClick={async () => {
                                                try {
                                                    await axios.delete(`http://localhost:3001/comments/${comment._id}/delete`)
                                                    console.log('Comment Deleted')
                                                    await getComments()
                                                } catch (e) {
                                                    console.error(e)
                                                }}}>
                                                Delete
                                            </button>
                                    }
                                </div>
                                <p className={style.commentContent}>{comment.content}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={style.commentFieldContainer}>
                <div className={style.commentProfilePicContainer}>
                    <img src={user.profile_picture} alt="user profile" className={style.commentProfilePic}/>
                </div>
                <textarea 
                    className={style.commentTextField} 
                    placeholder='Leave a comment...' 
                    value={userCommentText} 
                    onChange={(e) => {setUserCommentText(e.target.value)}} />
                <button onClick={createComment}>Comment</button>
            </div>
        </div>
    )
}