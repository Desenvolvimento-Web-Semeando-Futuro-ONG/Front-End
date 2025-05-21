import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Menu/Navbar";
import "./styles.css";
import fotocard from "../../assets/fotocard.png";

function Evento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5189/api/Evento/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dados do evento:", data);

        const eventoComImagem = {
          ...data,
          imagemUrl: data.imagemUrl
            ? `http://localhost:5189/api/galeria/${data.imagemUrl}`
            : null,
        };

        setEvento(eventoComImagem);
      } catch (err) {
        console.error("Erro ao buscar evento:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  const handleImageError = (e) => {
    e.target.src = fotocard;
    e.target.alt =
      "Imagem padrão - não foi possível carregar a imagem do evento";
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;
  if (!evento) return <div className="not-found">Evento não encontrado</div>;

  return (
    <div className="evento-pagina">
      <Navbar />
      <div className="evento-fundo">
        <div className="evento-container">
          <h2 className="evento-titulo">{evento.nome}</h2>
          <img
            src={evento.imagemUrl || fotocard}
            alt={evento.nome}
            className="evento-imagem"
            onError={handleImageError}
          />
          <p className="evento-descricao">{evento.descricao}</p>
          {evento.dataEvento && (
            <p className="evento-data">
              Data: {new Date(evento.dataEvento).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Evento;
