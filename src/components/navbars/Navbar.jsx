import { useNavigate } from "react-router-dom";
import logo from '../../assets/logodbmini.png'
import { useUserDetails } from '../../shared/hooks'

const NavLogo = () => {
    return (
        <div className="nav-logo-container">
            <img
                className="nav-logo"
                width='78%'
                height='100%'
                src={logo}
                alt="Logo"
            />
        </div>
    )
}

const NavButton = ({ text, onClickHandler }) => {
    return (
        <span className="nav-button" onClick={onClickHandler}>
            {text}
        </span>
    )
}

export const Navbar = () => {
    const { isLogger, logout } = useUserDetails()

    const navigate = useNavigate()

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }

    const handleNavigateToSettingPage = () => {
        navigate('/settings')
    }

    const handleNavigateToNewPostPage = () => {
        navigate('/newpost')
    }

    const handleNavigateToHomePage = () => {
        navigate('/')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="nav-container">
            <div className="logo-box">
                <NavLogo />
                <NavButton text='INICIO' onClickHandler={handleNavigateToHomePage} />
            </div>
            <div className="nav-buttons-container">
                {!isLogger ? (
                    <div>
                        <NavButton text='INICIA SESION' onClickHandler={handleNavigateToAuthPage} />
                        <i className="fa-solid fa-right-to-bracket"></i>
                    </div>
                ) : (
                    <div className="sidebar">
                        <i className="fa-solid fa-square-plus"></i>
                        <NavButton text='Nuevo Post' onClickHandler={handleNavigateToNewPostPage} />
                        <br></br>
                        <i className="fa-solid fa-user"></i>
                        <NavButton text='Mi Cuenta' onClickHandler={handleNavigateToSettingPage} />
                        <br></br>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <NavButton text='Salir' onClickHandler={handleLogout} />
                    </div>
                )}
            </div>
        </div>
    )
}