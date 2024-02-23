import { useContext, useEffect, useState } from 'react';
import axios from 'axios'

import style from '../App.module.css'
import Post from '../components/Post';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';

const Profile = () => {

    const { profileId } = useParams()
    
    const userContext = useContext(UserContext)
    
    const [user, setUser] = useState({...userContext})
    const [isLoading, setIsLoading] = useState(true)
    const [profileInfo, setProfileInfo] = useState({})
    const [posts, setPosts] = useState([])
    const [followedByUser, setFollowedByUser] = useState(false)

    const getProfileInfo = async () => {
        try {
            console.log('Getting profile info!')
            let response = await axios.get(`http://localhost:3001/users/${profileId}`)
            setProfileInfo(response.data)
            response = await axios.get(`http://localhost:3001/users/${user._id}`)
            setUser(response.data)
        } catch(e) {
        console.error("There was an error while getting user: ", e)
        }
    }

    const getPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${profileId}/posts`)
            setPosts(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleFollowButtonStyle = () => {
        return user.following.includes(profileInfo._id) && profileInfo.followers.includes(user._id) ? style.unlikeButton : style.likeButton
    }

    const handleFollow = async () => {

        const isFollowing = user.following.includes(profileInfo._id) && profileInfo.followers.includes(user._id)
        setFollowedByUser(isFollowing)

        if (followedByUser) {
            await axios.patch(`http://localhost:3001/users/${user._id}/patch`, {following: user.following.filter((followee) => followee !== profileInfo._id)})
            await axios.patch(`http://localhost:3001/users/${profileInfo._id}/patch`, {followers: profileInfo.followers.filter((follower) => follower !== user._id)})
            setFollowedByUser(false)
        } 
        if (!followedByUser && !profileInfo.followers.includes(user._id)) {
            await axios.patch(`http://localhost:3001/users/${user._id}/patch`, {following: [...user.following, profileInfo._id]})
            await axios.patch(`http://localhost:3001/users/${profileInfo._id}/patch`, {followers: [...profileInfo.followers, user._id]})
            setFollowedByUser(true)
        }
        await getProfileInfo()
    }

    useEffect(() => {
        setIsLoading(true)

        getProfileInfo()
        .then(async () => {
            await getPosts()

            //const isFollowing = user.following.includes(profileInfo._id) && profileInfo.followers.includes(user._id)
            //setFollowedByUser(user.following.includes(profileInfo._id) && profileInfo.followers.includes(user._id))

            await setIsLoading(false)
        })
        .catch(e => {
            console.error(e)
            setIsLoading(false)
        })  
        
    },[])

    useEffect(() => {
        getProfileInfo()
    }, [followedByUser])

    if (!isLoading) {
        return (
            <div className={style.container}>
                <div className={style.card}>
                    <div className={style.profileCardHeader}>
                        <div className={style.profilePicContainer}>
                            <img className={style.postProfilePic} src={profileInfo.profile_picture}/>
                        </div>
                        <h3>{profileInfo.username} {user._id === profileInfo._id && '(Me)'}</h3>
                    </div>
                    <div className={style.profileStatsContainer}>
                        <div className={style.profileStat}>
                            <h3>Posts</h3>
                            <p>{posts.length}</p>
                        </div>
                        <div className={style.profileStat}>
                            <h3>Followers</h3>
                            <p>{profileInfo.followers.length}</p>
                        </div>
                        <div className={style.profileStat}>
                            <h3>Following</h3>
                            <p>{profileInfo.following.length}</p>
                        </div>
                    </div>
                    {
                        profileInfo._id === user._id 
                        ? <button>Edit Profile</button>
                        : <button 
                            className={handleFollowButtonStyle()}
                            onClick={handleFollow}>{user.following.includes(profileInfo._id) && profileInfo.followers.includes(user._id) ? "Unfollow" : "Follow"}</button>
                    }
                </div>
                {
                    posts.map( (post) => (
                        <Post props={post} getPosts={getPosts} key={post._id}/>
                    ))
                }
            </div>
        )
    } else {
        return <>Loading...</>
    }
}

export default Profile