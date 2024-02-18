
import { useState } from 'react'
import styles from '../App.module.css'

export default function PostCreator() {
    
    const [postText, setPostText] = useState('')
    
    return (
        <div className={styles.card}>
            <textarea placeholder='Anything on your mind today?' value={postText} onChange={(e) => {setPostText(e.target.value)}} />
            <button>Add an image</button>
            <button>Post</button>
        </div>
    )
}