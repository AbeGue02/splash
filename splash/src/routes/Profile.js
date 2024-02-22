import { useContext, useEffect, useId, useState } from 'react';
import axios from 'axios'

import style from '../App.module.css'
import Post from '../components/Post';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';

const Profile = () => {

    const { profileId } = useParams()
    
    const user = useContext(UserContext)
    
    const [profileInfo, setProfileInfo] = useState({})

    const getProfileInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${profileId}`)
            setProfileInfo(response.data)
        } catch(e) {
        console.error("There was an error while getting user: ", e)
        }
    }

    useEffect(() => {
        getProfileInfo()
    },[])

    useEffect(() => {
        console.log(profileInfo)
    },[profileInfo])

    return (
        <div className={style.card}>
            <div>
                <div className={style.postProfilePicContainer}>
                    <img className={style.postProfilePic} src={profileInfo.profile_picture}/>
                </div>
                <h3>{profileInfo.username} {user._id === profileInfo._id && '(Me)'}</h3>
            </div>
        </div>
    )
}

export default Profile