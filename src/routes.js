import { BrowserRouter, Routes, Route} from  'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Favoritos from './pages/Favoritos';
import Filme from './pages/Filme';

import Erro from './pages/Erro';



function RoutesApp(){
    return(

        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/filme/:id' element={ <Filme /> } />
                <Route path='/favoritos' element={<Favoritos />} />


                <Route path='*' element={ <Erro /> } />                
            </Routes>
        </BrowserRouter>


    );
}

export default RoutesApp;