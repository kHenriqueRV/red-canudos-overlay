import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from '../Pages/Controlador/App.js'
import runas from '../Pages/Runas/runas.js'
import ouro from '../Pages/Ouro/ouro.js'
import exp from '../Pages/Exp/Exp.js'
import live_game from '../Pages/in-game/in-game.js';

function routes() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' Component={App}></Route>
            <Route path='/runas' Component={runas}></Route>
            <Route path='/ouro' Component={ouro}></Route>
            <Route path='/exp' Component={exp}></Route>
            <Route path='/live_game' Component={live_game}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default routes;