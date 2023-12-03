import { useState, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import axios from 'axios';
import '../assets/styles/Login.css';
import Navbar from '../common/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(AuthContext);
  const { username, setUsername } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email: email,
        password: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");

        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        localStorage.setItem('token', access_token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username', response.data.username);
        setToken(access_token);
        setUserId(response.data.userId);
        setUsername(response.data.username);
        console.log("Se seteo el token: ", token);
        navigate('/salas');
      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        setError(true);// aquí puede haber más lógica para tratar los errores
      })

  };


  return (
    <>
    <Navbar/>
    <div className="Login-wrapper">
    <div className="Login">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
      <form onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>
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
        <input id='submitlogin' type="submit" value="Enviar"/>
        <p>¿No tienes cuenta? <a id='a_signup' href='/signup'>Crea una</a></p>
      </form>
      
    </div>
    </div>
    </>
  );
}

export default Login;