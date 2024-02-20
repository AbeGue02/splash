
import { useState, useContext } from 'react'
import styles from '../App.module.css'
import { UserContext } from '../App.js'
import axios from 'axios'

export default function PostCreator({getPosts}) {

    const user = useContext(UserContext)
    
    const [postText, setPostText] = useState('')
    const [imageLink, setImageLink] = useState('')

    const createPost = async () => {
        try {
            const post = {
                user: user._id,
                image: imageLink,
                content: postText
            }
            
            await axios.post('http://localhost:3001/posts/create', post)
            console.log("Post Created: ", post)
            setPostText("")
            setImageLink('')
            await getPosts()
        } catch (e) {
            console.error(e)
        }
    }
    
    return (
        <div className={styles.card}>
            <textarea placeholder='Anything on your mind today?' value={postText} onChange={(e) => {setPostText(e.target.value)}} />
            <textarea placeholder='Have an image for your post?' value={imageLink} onChange={(e) => {setImageLink(e.target.value)}} />
            <button onClick={createPost}>Post</button>
        </div>
    )
}