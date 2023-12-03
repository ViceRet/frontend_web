import '../assets/styles/Dado.css'
import { useState } from 'react'

function Dado(props) {

    const [dados, setDados] = useState([6, 6]);

    const lanzar_dados = () => {
        const result = [Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1];
        setDados(result);
        let dice = [document.getElementById("dado-1"), document.getElementById("dado-2")];
        props.onLanzarDados(result[0]+result[1]);
        dice.forEach(function(die){
            die.classList.add("shake");
        });

        setTimeout(function(){
            dice.forEach(function(die){
                die.classList.remove("shake");
            });
        }, 500);

        document.querySelector("#dado-1").setAttribute("src", `/dados_img/dado${dados[0]}.png`)
        document.querySelector("#dado-2").setAttribute("src", `/dados_img/dado${dados[1]}.png`)
    };
    
    return (
        <>
        <div className='container'>
            <div>
                <button className="button-50" role="button" onClick={lanzar_dados}>Lanzar dados</button>
            </div>

            <div className='dice-wrapper'>
                <img src="/dados_img/dado6.png" id="dado-1"/>
                <img src="/dados_img/dado6.png" id="dado-2"/>
            </div>
        </div>
        </>
    )
}

export default Dado