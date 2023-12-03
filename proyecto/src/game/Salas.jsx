import '../assets/styles/Salas.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../common/Navbar.jsx'
import cat_icon from '/assets/img/cat_icon.png';
import { Link } from 'react-router-dom';
import delete_icon from '/assets/img/delete.png'
import { AuthContext } from '../auth/authContext';
import { useContext } from "react";


function Salas() {

    const { userId, username } = useContext(AuthContext);
    const [salas, setSalas] = useState({});

    const crear_objetos = async (storeId) => {
        try {
            const bombParameters = {
                playerId: null,
                storeId: storeId,
                icon: "/objetos_img/bomb.png",
                price: 15,
                description: "Cualquier jugador que caiga sobre ella retrocederá 5 casillas." 
            }
            const hieloParameters = {
                playerId: null,
                storeId: storeId,
                icon: "/objetos_img/hielo.png",
                price: 20,
                description: "Congela al siguiente jugador y omite su turno." 
            }
            const jokerParameters = {
                playerId: null,
                storeId: storeId,
                icon: "/objetos_img/joker.png",
                price: 30,
                description: "Resultado aleatorio entre una bomba, o avanzar 5 casillas extra." 
            }
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/objects`, bombParameters); 
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/objects`, hieloParameters);   
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/objects`, jokerParameters);
        } catch (error) {
            console.error(error);
        };
    };

    const crear_tienda = async (gameId) => {
        try {
            const storeParameters = {
                gameId: gameId
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/stores`, storeParameters);
            const nuevaTiendaId = response.data.id;
            console.log("Tienda creada con éxito");
            await crear_objetos(nuevaTiendaId);
        } catch (error) {
            console.error('Error al crear la tienda', error);
        };
    };

    const cargarSalas = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games`);
            const data = response.data;
            const partidas = {};
            data.map((partida) => {
                partidas[partida.id] = partida;
            });
            setSalas(partidas);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        cargarSalas();
    }, []);

    const handleCrearSala = async (usuarioId, nombreUsuario) => {
        try {
            const bodyParameters = {
                winner: "",
                losers: []
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`, bodyParameters);
            const nuevaSalaId = response.data.id;
            console.log('Sala creada con éxito');
            await crear_tienda(nuevaSalaId);
            await handleUnirseSala(nuevaSalaId, usuarioId, nombreUsuario);
        } catch (error) {
            console.error('Error al crear sala:', error)
        };
    };

    const handleEliminarSala = (salaId) => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/games/${salaId}`)
            .then(() => {
                console.log('Sala eliminada con éxito');
                cargarSalas();
            })
            .catch((error) => {
                console.error('Error al eliminar sala:', error);
            });       
    };

    const cargar_avatares_asignados = async (salaId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${salaId}`);
            let avatares = response.data.losers;
            console.log('Se cargaron los avatares');
            return avatares;
        } catch (error) {
            console.error('No se cargaron los avatares', error);
        };
    };

    const handleCreatePlayer = async (salaId, usuarioId, nombreUsuario, assignedAvatars) => {
        try {
            const avatars = [
                '/tablero_img/cat_1.png',
                '/tablero_img/cat_2.png',
                '/tablero_img/cat_3.png',
                '/tablero_img/cat_4.png'];
            console.log("avatares asigandos", assignedAvatars)
            const availableAvatar = avatars.find(avat => !assignedAvatars.includes(avat));

            if (!availableAvatar) {
                console.error("No hay más avatares disponibles");
                return;
            }
            const updatedAssignedAvatars = [...assignedAvatars, availableAvatar];
    
            const JParameters = {
                avatar: availableAvatar,
                squareId: null,
                gameId: salaId,
                userId: usuarioId,
                name: nombreUsuario,
                c_x: 0,
                c_y: 0,
            };

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/players`, JParameters);
            console.log("Jugador creado:", response.data);
            const response2 = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/games/${salaId}`, {losers: updatedAssignedAvatars});
            console.log("Se actualizó la lista de avatares ocupados", response2.data);
        } catch (error) {
            console.error("Error al crear al jugador:", error);
        }; 
    };      

    const handleUnirseSala = async (salaId, usuarioId, nombreUsuario) => {
        let assignedAvatars = await cargar_avatares_asignados(salaId);
        await handleCreatePlayer(salaId, usuarioId, nombreUsuario, assignedAvatars);
        window.location.href = `/SalaEspera/${salaId}`;
    };

    return (
        <>
        <Navbar/>
        <br></br>
        <div className='titulo'>
            Lista de partidas
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div alignItems="center">
                {Object.keys(salas).length > 0 ? (
                    <>
                    <ul>
                        {Object.values(salas).map((sala) => (
                            <li key={sala.id}>
                                <img className='icono_gato' src={cat_icon} alt="cat"></img>
                                <span> Partida {sala.id} </span>
                                <a className="button-50" onClick={() => handleUnirseSala(sala.id, userId, username)}>Unirse</a>
                                <a onClick={() => handleEliminarSala(sala.id)} type='submit'>
                                    <img className='delete_button' src={delete_icon} alt="cat"></img>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <a className="button-50" onClick={() => handleCrearSala(userId, username)}>Crear sala</a>
                    </ul>
                    </>
                ) : (
                    <>
                    <br></br>
                    <br></br>
                    <div className='container_aviso'>
                        <div className='aviso'> ¡NO SE ENCONTRARON PARTIDAS! </div>
                        <a className="button-50" onClick={() => handleCrearSala(userId, username)}>Crear sala</a> 
                    </div>
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default Salas
