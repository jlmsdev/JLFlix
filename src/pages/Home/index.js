import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import ScrollReveal from 'scrollreveal';

import api from '../../services/api';
import './home.css';



function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    

    let slideUp = {
        distance: '400%',
        origin: 'left',
        opacity: null
    };

    ScrollReveal().reveal('.films', slideUp)

    useEffect(()=> {

        async function carregaFilmes() {

            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: 'dbb3cfe4abf34e041d60ee088811235f',
                    language: 'pt-BR',
                    page: 1
                }
            })
    
            setFilmes(response.data.results.slice(0, 20))
            setLoading(false);
        }

        carregaFilmes();

    }, [])


    if(loading) {

        return(
            <>
            <TailSpin height={500} width={150} />
                <h2 className='load'>Carregando</h2>
            </>
        )
    }




    return(
        <div className='container'>
            <div className='listaFilmes'>
                <h1 className='title-page'>Veja os Filmes Recentes em Cartaz!</h1>
                {filmes.map((filme) => {
                    return(
                            <article className='films' key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar Filme</Link>
                            </article>                     
                    )
                })}
            </div>
        </div>
    );
}

export default Home;