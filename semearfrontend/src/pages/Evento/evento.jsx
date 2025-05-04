import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from "../../components/Menu/Navbar";
import './styles.css';

function Evento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5189/api/evento/${id}`)
      .then((res) => res.json())
      .then((data) => setEvento(data))
      .catch((err) => console.error('Erro ao buscar evento:', err));
  }, [id]);

  if (!evento) return <p>Carregando...</p>;

  return (
    <div className="evento-pagina">
      <Navbar />
      <div className="evento-fundo">
        <div className="evento-container">
          <h2 className="evento-titulo">{evento.nome}</h2>   
        <img
        src={evento.imagemId ? `http://localhost:5189/api/galeria/${evento.imagemId}` : evento.fotocard}
        alt={evento.nome}
         className="evento-imagem"/>
          <p className="evento-descricao">{evento.descricao}</p>
        </div>
      </div>
    </div>
  );
}

export default Evento;
