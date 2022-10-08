import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { toast} from 'react-toastify';


import api from "../../services/api";
import './filme.css';



function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detalhe, setDetalhe] = useState({});
    const [loading, setLoading ] = useState(true);


    useEffect(()=> {

        async function carregaDetalhes() {

            await api.get(`/movie/${id}`,{
                params:{
                    api_key: 'dbb3cfe4abf34e041d60ee088811235f',
                    language: 'pt-BR'
                }
            })
            .then((response)=>{
                setDetalhe(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigate('/', {replace: true});
                return false;
            })

        }

        carregaDetalhes();


        return() => {
            console.log('Componente Desmontado');
        }

    }, [id, navigate]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('jlflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === detalhe.id );

        if(hasFilme) {
            
            toast.warn('Este Filme já está na lista', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            return false;
        }

        filmesSalvos.push(detalhe);
        localStorage.setItem('jlflix', JSON.stringify(filmesSalvos));

        toast.success('Filme Adicionado', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    }



    if(loading){
        return(
            <div className="loading">
                <TailSpin height={500} width={150}/>
                <h2 className="load">Carregando...</h2>
            </div>
        );
    }


    return(
        <div className="filmeInfo">
            <h1>{detalhe.title}</h1>
            <small>{detalhe.original_title}</small>
            <img src={`https://image.tmdb.org/t/p/original/${detalhe.backdrop_path}`} alt={detalhe.title} />
            <h3>Sinopse</h3>
            <span className="detalheFilme">{detalhe.overview}</span>
            <strong className="avaliacao">Avaliação Popular : {detalhe.vote_average.toFixed(2)} / 10</strong>
            <strong className="avaliacao">Lançamento do Filme : {detalhe.release_date}</strong>
            

            <div className="containerButton">
                <button onClick={salvarFilme}>Salvar Filme</button>

                <a target='blank' rel="external" href={`https://www.youtube.com/results?search_query=${detalhe.title} Trailer`}>
                    Ver Trailer
                </a>
            </div>

        </div>
    );
}

export default Filme;