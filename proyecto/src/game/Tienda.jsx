import '../assets/styles/Tienda.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import coin_icon from '/assets/img/coin.png';

function Tienda(props) {

    const { datos } = props;
    const [objetos, setObjetos] = useState({});

    const cargarObjetos = async (tiendaId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stores/${tiendaId}/objects`);
            const data = response.data;
            const objs = {};
            data.forEach((obj) => {
                objs[obj.id] = obj;
            });
            setObjetos(objs);
        } catch (error) {
            console.error('No se pudieron cargar los objetos', error);
        };
    };

    useEffect(() => {
        cargarObjetos(datos.id);
    }, []);

    return (
        <>
        <div className='container_tienda'>
            <div className='container_letrero'> 
                <br></br>
                <h2 className='texto_letrero'>Tienda</h2>
            </div>
            <br></br>
            <div className='grid-container'>
                {Object.values(objetos).map((objeto) => (
                    <div className='grid-item' key={objeto.id}>
                        <img className='container-icon' src={objeto.icon} alt="objeto"></img>
                        <button className='button-54'>
                            <img className='coin-icon' src={coin_icon} alt="coin"></img>
                            {objeto.price} 
                        </button>
                    </div>
                ))}
            </div>

        </div>
        </>
    )

}

export default Tienda