import { useState, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.css';
import Navbar from '../common/Navbar.jsx';


function Signup() {
    const { token, setToken } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        username: username,
        email: email,
        password: password
      }).then( async(response) => {
        console.log('Registro exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg('Registro exitoso! Ahora puedes volver y loguearte');
        try {
            const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email: email,
                password: password
            });

            // Aquí manejas el token de autenticación, si lo usas
            const access_token = loginResponse.data.access_token;
            localStorage.setItem('token', access_token);
            setToken(access_token);
            // Aquí puedes redirigir a donde quieras después del inicio de sesión
            navigate('/');

            } catch (loginError) {
            // Manejar error de inicio de sesión
            console.error('Error al iniciar sesión:', loginError);
            }
        }).catch((error) => {      
            console.log('Ocurrió un error:', error);
            setError(true);
            });
        }

  return (
    <>    
    <Navbar/>
    <div className="Login-wrapper">
    <div className="Login">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}

      <form onSubmit={handleSubmit}>
        <h3>Registrate</h3>
        <label>
          Username:
          <input
            placeholder='Nombre de usuario' 
            type="text" 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input 
            placeholder='Email'   
            type="email" 
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input 
            placeholder='Contraseña'
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <input  href='\login' id='submitlogin' type="submit" value="Enviar"/>
      </form>
    </div>
    </div>
    </>
  );
}

export default Signup;