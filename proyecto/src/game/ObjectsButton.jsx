export default function ObjectsButton({onClick, showImage}){
    return(
        <div>
            <button onClick={onClick}>
                {showImage ? "Ocultar" : "Mostrar"}
            </button>
        </div>
    )
}
