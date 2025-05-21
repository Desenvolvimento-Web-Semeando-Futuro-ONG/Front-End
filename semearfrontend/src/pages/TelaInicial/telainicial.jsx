import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Menu/Sidebar";
import Header from "../../components/Header/header";
import "./styles.css";
import fotocard from "../../assets/fotocard.png";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const TelaInicial = () => {
  const [rascunhos, setRascunhos] = useState([]);
  const [publicados, setPublicados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [eventoParaDeletar, setEventoParaDeletar] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5189/api/Evento/rascunhos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar rascunhos");
        return res.json();
      })
      .then(setRascunhos)
      .catch((err) => {
        console.error("Erro ao buscar rascunhos:", err);
        setRascunhos([]);
      });

    fetch("http://localhost:5189/api/Evento/publicados")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar publicados");
        return res.json();
      })
      .then(setPublicados)
      .catch((err) => {
        console.error("Erro ao buscar publicados:", err);
        setPublicados([]);
      });
  }, [token]);

  const abrirModalDeletar = (evento) => {
    setEventoParaDeletar(evento);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setEventoParaDeletar(null);
    setModalAberto(false);
  };

const confirmarDeletar = () => {
  if (!eventoParaDeletar) return;

  console.log("Deletando evento ID:", eventoParaDeletar.id);

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  fetch(`http://localhost:5189/api/Evento/${eventoParaDeletar.id}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro ao deletar. Status: ${res.status}`);
      }

      setRascunhos((prev) =>
        prev.filter((e) => e.id !== eventoParaDeletar.id)
      );
      setPublicados((prev) =>
        prev.filter((e) => e.id !== eventoParaDeletar.id)
      );
      fecharModal();
    })
    .catch((err) => {
      console.error("Erro ao deletar evento:", err);
      fecharModal();
    });
};

const editarEvento = (evento) => {
  navigate("/publicacao", { 
    state: { 
      eventoId: evento.id 
    } 
  });
};


  const CardEvento = ({ evento, isRascunho }) => (
    <div className="card-publicacao">
      <div className="card-header">
        <img
          src={
            evento.imagemUrl
              ? `http://localhost:5189/api/galeria/${evento.imagemUrl}`
              : fotocard
          }
          alt={evento.nome}
          onError={(e) => {
            e.target.src = fotocard;
          }}
        />
      </div>
      <div className="card-conteudo">
        <span className={`card-status ${isRascunho ? "status-rascunho" : "status-publicado"}`}>
          {isRascunho ? "Escrevendo" : "Publicado"}
        </span>
        <div className="card-tituloo">{evento.nome}</div>
        <div className={`card-progresso ${isRascunho ? "rascunho" : "publicado"}`}>
          <div className="barra"></div>
        </div>
        <div className="card-icones">
          {isRascunho ? (
            <button onClick={() => editarEvento(evento)} title="Editar">
              <FiEdit />
            </button>
          ) : (
            <button onClick={() => navigate(`/evento/${evento.id}`)} title="Visualizar">
              <FiEye />
            </button>
          )}
          <button onClick={() => abrirModalDeletar({ ...evento, publicado: !isRascunho })} title="Excluir">
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tela-inicial">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <section className="banner-projeto">
            <div className="texto-banner">
              <span className="bem-vindo">Seja bem-vindo!</span>
              <h2>
                Agradecemos por apoiar nossa missão. <br />
                Vamos transformar vidas juntos.
              </h2>
              <button className="botao-banner">Conheça mais</button>
            </div>
          </section>

          <section className="secao-eventos">
            <h3 className="titulo-secao">Continue Escrevendo</h3>
            <div className="grid-eventos">
              {rascunhos.length > 0 ? (
                rascunhos.map((evento) => (
                  <CardEvento key={evento.id} evento={evento} isRascunho={true} />
                ))
              ) : (
                <p>Nenhum rascunho encontrado.</p>
              )}
            </div>
          </section>

          <section className="secao-eventos">
            <h3 className="titulo-secao">Publicações Recentes No Site</h3>
            <div className="grid-eventos">
              {publicados.length > 0 ? (
                publicados.map((evento) => (
                  <CardEvento key={evento.id} evento={evento} isRascunho={false} />
                ))
              ) : (
                <p>Nenhuma publicação encontrada.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirmar exclusão</h2>
            <p>
              Tem certeza que deseja deletar a publicação <strong>{eventoParaDeletar.nome}</strong>?
            </p>
            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmarDeletar}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelaInicial;