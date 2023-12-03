//Chequeas a travez del token que el usuario logeado sea el que esta entrando a la pagina
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/authContext";
import LogoutButton from "../profile/Logout"; 

function UserCheck(){
    //recuperar el token
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    //crear elemento config que guarda toda la info del request
    const config = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/scope/protecteduser`,
        'headers': {
            //enviar token
            'Authorization': `Bearer ${token}`
        }
        
    };

    useEffect(() => {
        axios(config).then((response) => {
            console.log('Enviaste un token correcto y esta logeado');
            console.log(response);
            setMsg(response.data.message);

        }).catch((error) => {
            console.log('Hubo un error, no estas logeado/ el token expiro');
            console.log(error)
            setMsg(error.message);
        })
    }, [])

    return (
        <>
        <h1>{msg}</h1>

        <a href="/"><LogoutButton/></a>
        </>
    )
}

export default UserCheck