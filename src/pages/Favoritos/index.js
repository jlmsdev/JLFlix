import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast} from 'react-toastify';

import './favoritos.css';

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=> {

        const minhaLista = localStorage.getItem('jlflix');
        
        setFilmes(JSON.parse(minhaLista).reverse() || []);



    }, [])

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id);
        } )

        setFilmes(filtroFilmes);
        localStorage.setItem('jlflix', JSON.stringify(filtroFilmes));

        toast.info('Filme Excluido', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }




    return(
        <div className='meusFilmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não Possui Filmes Salvos</span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Detalhes</Link>
                                <button onClick={ () => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}

export default Favoritos;