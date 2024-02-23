import { useEffect, useState } from 'react';
import PostCreator from '../components/PostCreator';
import Post from '../components/Post';
import axios from 'axios'

const Feed = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/posts')
            setPosts(response.data)
        } catch (e) {
            console.error("Error in Feed:getPosts(): ", e)
        }
    }

    useEffect(() => { 
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