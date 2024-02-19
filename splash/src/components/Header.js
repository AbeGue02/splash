import style from '../App.module.css'
import { UserContext } from '../App.js'
import { useContext } from "react"

export default function Header() {

    const user = useContext(UserContext)

    return (
        <div className={style.headerContainer}>
            <div className={style.headerTitleContainer}>
                <h1>Splash</h1>
            </div>
            <div className={style.headerProfilePictureContainer}>
                <img src={user.profile_picture} alt='Profile' className={style.headerProfilePicture}/>
            </div>
        </div>
    )
} 