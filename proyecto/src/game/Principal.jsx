import { useEffect, useState } from 'react'
import '../assets/styles/Principal.css';
import Dado from './Dado.jsx'
import Navbar from '../common/Navbar.jsx'
import Tienda from './Tienda.jsx'
import Board from './Tablero/Tablero.jsx';
import { useParams } from 'react-router-dom';
import store_icon from '/assets/img/store2.png';
import coin_icon from '/assets/img/coin.png';
import axios from 'axios';
import { coordinates } from "./Tablero/constants";


function Principal() {

    const { gameId, playerId} = useParams();
    const [MostrarTienda, setMostrarTienda] = useState(false);
    const [store, setStore] = useState(null);
    const [players, setPlayers] = useState({});
    const [listaId, setListaId] = useState([]);
    const [resultado, setResultado] = useState([0, 0]);
    
    const obtenerResultado = async (result) => {
        const res = result;
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/players/${playerId}`);
        const c_x = response.data.c_x;
        const c_y = response.data.c_y;
        const posicion = [c_x, c_y];
        let next_step = coordinates.findIndex(posicion) + res;
        if (next_step >= coordinates.length) {
            next_step = coordinates.length - 1;
        }
        let nex_x = coordinates[next_step][0];
        let nex_y = coordinates[next_step][1];
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/players/${playerId}`, {c_x: nex_x, c_y: nex_y});
        setResultado([nex_x, nex_y]);
    };

    const handleMostrarTienda = () => {
        setMostrarTienda(!MostrarTienda);
    };

    const obtenerTienda = async (gameId) => {
        try {
            let id_juego = gameId;
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id_juego}/store`);
            const tienda = response.data;
            setStore(tienda);
            console.log('Se pudo obtener la tienda asociada');
        } catch (error) {
            console.error('No se puedo obtener la tienda', error);
        };
    };

    useEffect(()=> {
        cargar_jugadores(gameId);
        obtenerTienda(gameId);
    }, []);



    const cargar_jugadores = async (id_juego) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${id_juego}/players`);
            const jugadores = response.data;
            setPlayers(jugadores);
        } catch (error) {
             console.error("No se puedo obtener los jugadores", error);
        };
    };

    return (
        <>
        <Navbar/>

        <table>
            <tr>
                <td>
                    <div className='tablero'>
                        <div>
                            <button onClick={handleMostrarTienda} type="submit" className='boton-tienda'>
                                <img src={store_icon} alt="tienda" border="0"/>
                            </button>
                        </div>
                        <br></br>
                        <div>
                            {MostrarTienda ? (
                                <div className='tienda-container'>
                                    {MostrarTienda && <Tienda datos = {store}/>}
                                </div>
                            ) : (
                                <div className='game-container'>
                                    <Board jugadorId = {playerId} salaId = {gameId}/>
                                </div>
                            )}
                        </div>
                    </div>
                </td>
                <td>
                    <div className='resumen'>
                        <div className='monedas-wrapper'>
                            <img src={coin_icon} alt="monedas" width="70" height="70"/>
                            <h1 className='texto_principal'>0</h1>
                        </div>
                        <br></br>
                        <Dado onLanzarDados={obtenerResultado}/>
                    </div>
                </td>
            </tr>

        </table>
        </>
    )
}

export default Principal
