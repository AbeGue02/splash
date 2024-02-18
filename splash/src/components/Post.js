import { useEffect, useState } from "react"
import style from '../App.module.css'

export default function Post(props) {

    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])


    useEffect(() => {
        getComments()
        getLikes()
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
                console.log(data)
                setLikes(data)
            })
    }

    useEffect(() => {
        console.log('LIKES:::', likes)
    }, [likes])

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
                            <div>
                                <p>{comment.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}