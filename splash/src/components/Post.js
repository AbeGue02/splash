import { useContext, useEffect, useState } from "react"
import { UserContext } from '../App.js'
import style from '../App.module.css'

export default function Post(props) {

    const user = useContext(UserContext)

    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])


    useEffect(() => {
        getComments()
        getLikes()
        console.log('USER', user)
    }, [])

    const getComments = () => {
        fetch(`http://localhost:3001/posts/${props.props._id}/comments`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setComments(data)
            })
    }

    const getLikes = () => {
        fetch(`http://localhost:3001/posts/${props.props._id}/likes`)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data)
                setLikes(data)
            })
    }

    return(
        <div className={style.card}>
            <div className={style.postHeader}>
                <div className={style.postProfilePicContainer}>
                    <img src={props.props.user.profile_picture} alt="Post Profile" className={style.postProfilePic}/>
                </div>
                <h3>{props.props.user.username}</h3>
            </div>
            <p>{props.props.content}</p>
            <div className={style.postOptions}>
                <button>Like</button>
                <span>{likes.length}</span>
            </div>
            <div>
                {
                    comments.map((comment) => {
                        return (
                            <div className={style.commentContainer}>
                                <div className={style.commentHeaderContainer}>
                                    <div className={style.commentProfilePicContainer}>
                                        <img src={comment.user.profile_picture} className={style.commentProfilePic}/>
                                    </div>
                                    <h4>{comment.user.username}</h4>
                                </div>
                                <p className={style.commentContent}>{comment.content}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={style.commentFieldContainer}>
                <div className={style.commentProfilePicContainer}>
                    <img src={user.profile_picture} className={style.commentProfilePic}/>
                </div>
                <textarea className={style.commentTextField} placeholder='Leave a comment...' />
                <button>Comment</button>
            </div>
        </div>
    )
}