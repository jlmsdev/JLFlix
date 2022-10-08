import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header>
            <Link id='topoSite' className='logo' to='/'>JL Flix</Link>
            <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
        </header>
    );
}

export default Header;