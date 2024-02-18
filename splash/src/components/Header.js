import style from '../App.module.css'

export default function Header() {
    return (
        <div className={style.headerContainer}>
            <div className={style.headerTitleContainer}>
                <h1>Splash</h1>
            </div>
            <div className={style.headerProfilePictureContainer}>
                <img src='#' alt='Profile' className={style.headerProfilePicture}/>
            </div>
        </div>
    )
} 