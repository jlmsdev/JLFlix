import { Link } from 'react-router-dom';
import './erro.css';
import { Discuss } from 'react-loader-spinner'

function Erro() {
    return(
        <div className="containerErro">
            <h1>Error 404</h1>
            <h3>Pagina Não Encontrada</h3>

            <Link to='/'>
                Voltar para Home
            </Link>

            <Discuss height={250} width={200}  />
        </div>
    );
}

export default Erro;