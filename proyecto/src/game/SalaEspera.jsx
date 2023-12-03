import Navbar from '../common/Navbar.jsx'
import '../assets/styles/SalaEspera.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import { useContext } from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

function SalaEspera() {
    const { salaId } = useParams();
    const { userId, username } = useContext(AuthContext);
    const [playerId, setPlayerId] = useState(null);
    const [playerAvatar, setPlayerAvatar] = useState(null);
    const [assignedAvatars, setAssignedAvatars] = useState([]);
    const [players, setPlayers] = useState({});

    const cargar_avatares_asignados = async (gameId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`);
            const avatares = response.data.losers;
            console.log('Se cargaron los avatares');
            console.log("AVATARES:", avatares);
            return avatares;
        } catch (error) {
            console.error('No se cargaron los avatares', error);
        };
    };
    
    const cargar_jugadores = async (gameId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/players`);
            const data = response.data;
            const jugadores = {};
            data.map((jugador) => {
                jugadores[jugador.id] = jugador;
                if (jugador.userId == userId) {
                    setPlayerId(jugador.id);
                    setPlayerAvatar(jugador.avatar);
                };
            });
            console.log(jugadores);
            setPlayers(jugadores);
            const avatars = await cargar_avatares_asignados(gameId);
            setAssignedAvatars(avatars);
        } catch (error) {
            console.error('Error al cargar jugadores:', error);
        };
    };    

    useEffect(() => {
        cargar_jugadores(salaId);
    }, []);

    const handleDeletePlayer = async (jugadorId, avatarIcon, gameId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/players/${jugadorId}`);
            const updatedAssignedAvatars = assignedAvatars.filter((avat) => avat !== avatarIcon);
            setAssignedAvatars(updatedAssignedAvatars);
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`, {losers: updatedAssignedAvatars});
        } catch (error) {
            console.error('No se pudo eliminar al jugador', error);
        };
    };

    return (
        <>
        <Navbar/>
        <br></br>
        <div className='container-md'>
            <div>
                <a onClick={() => cargar_jugadores(salaId)} type='submit'>
                    <img className='reload-button' src="/recarga_img/reload.png" alt="reload"></img>
                </a>
                <Link to={`/salas`} onClick={() => handleDeletePlayer(playerId, playerAvatar, salaId)}>
                    <img className='exit-button' src="/recarga_img/salida.png" alt="salida"></img>
                </Link>
            </div>
            <div className='grid-container2'>
                {Object.values(players).map((player) => (
                    <div className='grid-item' key={player.id}>
                        <img className='container-icon2' src={player.avatar} alt="avatar"></img>
                        <div className='username-container'>
                            <p className='textoide'>{player.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <Link to={`/principal/${salaId}/${playerId}`} className="button-50"> Entrar </Link>
        </div>
        </>
    )
}

export default SalaEspera