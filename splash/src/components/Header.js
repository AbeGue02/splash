import style from '../App.module.css'
import { UserContext } from '../App.js'
import { useContext } from "react"
import { Link } from 'react-router-dom'

export default function Header() {

    const user = useContext(UserContext)

    return (
        <div className={style.headerContainer}>
            <div className={style.headerTitleContainer}>
                <Link to='/'><h1>Splash</h1></Link>
            </div>
            <div className={style.headerProfilePictureContainer}>
                <Link to='/profile'><img src={user.profile_picture} alt='Profile' className={style.headerProfilePicture}/></Link>
            </div>
        </div>
    )
} 