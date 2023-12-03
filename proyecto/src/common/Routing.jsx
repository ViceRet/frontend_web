import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import Instructions from "../game/Instructions.jsx"
import Principal from "../game/Principal.jsx"
import Salas from "../game/Salas.jsx"
import Login from "../profile/Login.jsx"
import Signup from "../profile/Signup.jsx"
import UserCheck from "../Protected/UserCheck.jsx"
import AdminCheck from "../Protected/AdminCheck.jsx"
import SalaEspera from "../game/SalaEspera.jsx"


function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/instructions'} element={<Instructions/>}/>
                <Route path={'/'} element={<App/>}/>   
                <Route path={'/principal/:gameId/:playerId'} element={<Principal/>}/>   
                <Route path={'/salas'} element={<Salas/>}/>  
                <Route path={'/login'} element={<Login/>}/>  
                <Route path={'/signup'} element={<Signup/>}/>
                <Route path={'/UserCheck'} element={<UserCheck/>}/>  
                <Route path={'/AdminCheck'} element={<AdminCheck/>}/> 
                <Route path={'/SalaEspera/:salaId'} element={<SalaEspera/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing
