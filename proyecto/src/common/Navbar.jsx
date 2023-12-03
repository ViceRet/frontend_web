import logo from '/assets/img/logo.png';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useContext } from "react";
import { AuthContext } from '../auth/authContext';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';



function Navbar() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const navRef = useRef();
    
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    }


    return (
        <header>
            <img className="logo" src={logo} alt="logo"></img>
            <nav ref={ navRef }>
                <a href='/'>Inicio</a>
                <a href='/instructions'>Instrucciones</a>
            
                {(token==null || token=="" || token=="null") ? (
                    <a href='/login'>Juguemos!</a>
                    
                ) : (
                    <a href='/salas'>Juguemos!</a>

                )}

                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
                {(token==null || token=="" || token=="null") ? (
                    <a className='button-login' href='/login'>Iniciar Sesión</a>
                    
                ) : (
                    <button className='button-login' onClick={handleLogout}>Cerrar Sesión</button>

                )}
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
    )
}

export default Navbar