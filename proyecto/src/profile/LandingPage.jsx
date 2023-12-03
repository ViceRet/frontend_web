import '../assets/styles/LandingPage.css';
import cats from '/assets/img/cats_pixel.png';
import { AuthContext } from '../auth/authContext';
import { useContext } from "react";



function LandingPage() {
    const { token } = useContext(AuthContext);


    return (
        <div className='section-page'>
            <div className='container-page'>
                <div className='content-page'>
                    <div className='left-side'>
                        <h1>MeowRacer</h1>
                        <p>
                        ¡Corre, araña y salta hacia la meta 
                        en la carrera de tablero temática felina! 
                        Quien llegue primero gana la máxima gloria gatuna.
                        </p>
                        {(token==null || token=="" || token=="null") ? (
                            <a className="button" href="/login">¡Juguemos!</a>
                            
                        ) : (
                            <a className="button" href="/salas">¡Juguemos!</a>

                        )}

                    </div>
                    <div className='right-side'>
                        <img className="cats-page" src={cats} alt="cats"></img>           
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default LandingPage