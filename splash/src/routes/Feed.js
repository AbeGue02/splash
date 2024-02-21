import styles from '../App.module.css';
import { createContext, useEffect, useState } from 'react';

import PostCreator from '../components/PostCreator';
import Post from '../components/Post';

const Feed = () => {
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState([])

    const getUser = () => {
        fetch('http://localhost:3001/users/65cfd6197abd65f76176d1bc')
        .then((response) => response.json())
        .then((data) => {
            setUser(data)
        })
        .catch(e => console.error(e))
    }

    const getPosts = () => {
        fetch('http://localhost:3001/posts')
        .then((response) => response.json())
        .then((data) => {
            setPosts(data)
        })
        .catch(e => console.error(e))
    }

    useEffect(() => {
        getUser() 
        getPosts()
    }, [])

    return (
        <>
            <PostCreator getPosts={getPosts} />
            {
                posts.map( (post) => (
                <Post props={post} getPosts={getPosts} key={post._id}/>
                ))
            }
        </>
    )
}

export default Feed