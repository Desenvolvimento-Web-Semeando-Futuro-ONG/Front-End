import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Menu/Sidebar';

import './styles.css';
import fotocard from "../../assets/fotocard.png";


const TelaInicial = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5189/api/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error('Erro ao buscar eventos:', err));
  }, []);

  return (
    <div className="tela-inicial">
      <Sidebar />

      <div className="main-content">
        <header className="header">
          <h1 className="titulo">Semeando o Futuro</h1>
        </header>

        <div className="conteudo">
          <section className="banner-section">
            <div className="banner-card">
              <p className="online-course">ONLINE COURSE</p>
              <h2 className="banner-title">
                Sharpen Your Skills With <br /> Professional Online Courses
              </h2>
              <button className="join-btn">Join Now</button>
            </div>
          </section>

          {/* Sessão para cards ainda não implementada */}
          {/* <section className="drafts-section">
            <h2>Continue Escrevendo</h2>
            ...
          </section> */}

          <section className="eventos-section">
            <div className="eventos-grid">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="card-evento"
                  onClick={() => navigate(`/evento/${evento.id}`)}
                >
                  <img
                    src={evento.imagemUrl 
                      ? `http://localhost:5189/api/galeria/${evento.imagemUrl}` 
                      : fotocard}
                    alt={evento.nome}
                    className="card-img"
                    onError={(e) => {
                      e.target.src = fotocard;
                      e.target.alt = "Imagem padrão do evento";
                    }}
                  />
                  <div className="card-content">
                    <h3 className="card-titulo">{evento.nome}</h3>
                    {evento.descricao && (
                      <p className="card-descricao">
                        {evento.descricao.length > 100 
                          ? `${evento.descricao.substring(0, 100)}...` 
                          : evento.descricao}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;
