import '../assets/styles/InstructionsBook.css'
import cat1 from '/assets/img/key.png'
import shop from '/assets/img/store2.png'
import coin from '/assets/img/coin.png'
import dado from '/assets/img/dado6.png'
import board from '/assets/img/board2.png'
import doc from '/assets/img/doc.png'

function InstructionsBook() {
    return(
        <div className="base">
            <div className="title">
                <h1 className="ti">MeowRacer</h1>
            </div>

            <p className="intro">
            Hola que tal, ya que iniciaste este maravilloso juego deja que te dé una introducción. Meow Racer se trata de una carrera sobre quién llega al centro del tablero y se establece como el ser superior en tu grupo de hasta 4 amigos. Sin embargo, tendrás que usar algunas neuronas para tener alguna posibilidad.
            </p>


            <div className="paragraph">
            <p>
                Como te dije tu objetivo será llegar al centro del tablero, sin embargo, dentro de tu recorrido te encontraras con diversos tipos de casillas en donde descubrirás diversos objetos que te ayudarán a darte una ventaja sobre el rival o arruinarles completamente la partida según tu propia suerte.
            </p>
                <div  className="icon-base">
                    <img src={cat1} className="icon"/>
                </div>
            </div>

            <img src={board} className="board"/>

            <div className="paragraph">
            <div  className="icon-base">
                    <img src={coin} className="icon"/>
                </div>
            <p>
            Además, mientras corras te podrás ir encontrando con monedas que podrás ir ahorrando para comprar estos mismos objetos cuando tengas las suficientes. Por lo que ten cuidado en que lo invertirás y cuando lo usarás.
            </p>

            </div>

            <div className="paragraph2">
            <p>
            Esto lo podrás realizar en la tienda, solo debes presionar el icono en la interfaz y luego el objeto que necesites, podrás almacenar como mucho dos de estos en tu inventario y podrás usarlos cuando los necesites.
            </p>
                <div  className="icon-base">
                    <img src={shop} className="icon"/>
                </div>
            </div>

            <div className="paragraph">
                <div  className="icon-base">
                    <img src={dado} className="icon"/>
                </div>
            <p>
            Durante tu turno deberás tirar los dados y luego de avanzar las casillas correspondientes podrás utilizar los objetos en caso de tener, y/o entrar a la tienda. Sin embargo, solo podrás usar un objeto por turno.
            </p>

            </div>

            <div className="paragraph2">
            <p>
            Contarás con un apartado de <u>“Resumen de partida”</u> en él podrás visualizar todas las jugadas desde el inicio de la partida, accesible durante la misma, además de un <u>“Historial de Partidas”</u> en el menú principal del juego para ver tus derrotas y victorias por si necesitas sacar en cara algo a tus ex-amigos.
            </p>
            <div  className="icon-base">
                    <img src={doc} className="icon"/>
                </div>
            </div>

        </div>
    )
}
export default InstructionsBook
