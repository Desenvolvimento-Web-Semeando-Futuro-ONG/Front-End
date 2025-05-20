import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../components/Menu/Sidebar";
import Header from "../../components/Header/header";
import "./styles.css";
import { FaUser, FaUserFriends, FaDesktop } from "react-icons/fa";


const VoluntarioList = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [modalVoluntario, setModalVoluntario] = useState(null);
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const voluntariosPorPagina = 5;

  useEffect(() => {
    fetch("http://localhost:5189/api/Voluntario")
      .then((response) => response.json())
      .then((data) => setVoluntarios(data))
      .catch((error) => console.error("Erro ao buscar voluntários:", error));
  }, []);

  const abrirModal = (voluntario) => {
    setModalVoluntario(voluntario);
    setStatusSelecionado(voluntario.statusContato || "naoFeito");
  };

  const fecharModal = () => {
    setModalVoluntario(null);
    setStatusSelecionado("");
  };

  const salvarStatus = () => {
    const atualizados = voluntarios.map((v) =>
      v.id === modalVoluntario.id ? { ...modalVoluntario } : v
    );
    setVoluntarios(atualizados);
    fecharModal();
  };

  const totalPaginas = Math.ceil(voluntarios.length / voluntariosPorPagina);
  const indexInicio = (paginaAtual - 1) * voluntariosPorPagina;
  const indexFim = indexInicio + voluntariosPorPagina;
  const voluntariosVisiveis = voluntarios.slice(indexInicio, indexFim);

  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  return (
    <div className="tela-inicial">
      <Sidebar />
      <div className="main-content">
        <Header />

        <div className="resumo-dashboard">
          <div className="resumo-card">
            <div className="resumo-item">
              <div className="resumo-icon">
                <FaUser />
              </div>
              <div className="resumo-info">
                <p className="resumo-label">Interessados</p>
                <p className="resumo-number">+50</p>
                <p className="resumo-sub">
                  <span className="up">↑ 16%</span> esse mês
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="resumo-item">
              <div className="resumo-icon">
                <FaUserFriends />
              </div>
              <div className="resumo-info">
                <p className="resumo-label">
                  Atividade
                  <br />
                  menos escolhida
                </p>
                <p className="resumo-number">Idosos</p>
              </div>
            </div>

            <div className="divider" />

            <div className="resumo-item">
              <div className="resumo-icon">
                <FaDesktop />
              </div>
              <div className="resumo-info">
                <p className="resumo-label">
                  Atividade
                  <br />
                  mais escolhida
                </p>
                <p className="resumo-number">Judô</p>
              </div>
            </div>
          </div>
        </div>

        <div className="voluntario-container" style={{ marginTop: "20px" }}>
          <h2 className="titulo">Voluntários Interessados</h2>
          <p className="subtitulo">Interessados na ONG</p>
          <table className="voluntario-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {voluntariosVisiveis.map((v) => (
                <tr key={v.id}>
                  <td>{v.nome}</td>
                  <td>{v.cpf}</td>
                  <td>{new Date(v.dataCadastro).toLocaleDateString()}</td>
                  <td>{v.telefone}</td>
                  <td>{v.email}</td>
                  <td>
                    <span
                      className={
                        v.statusContato === "feito"
                          ? "btn-feito"
                          : "btn-nao-feito"
                      }
                    >
                      {v.statusContato === "feito"
                        ? "Contato Feito"
                        : "Contato não feito"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      onClick={() => abrirModal(v)}
                      title="Editar"
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="paginacao">
            <button
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>
            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => mudarPagina(i + 1)}
                className={paginaAtual === i + 1 ? "pagina-ativa" : ""}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </button>
          </div>

          {/* Modal */}
          {modalVoluntario && (
            <div className="modal-overlay">
              <div className="modal">
                <button className="fechar-modal" onClick={fecharModal}>
                  ×
                </button>
                <h3>Informações do Voluntário</h3>
                <div className="modal-info">
                  <div className="info-item">
                    <span className="label">Nome:</span>
                    <span>{modalVoluntario.nome}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">CPF:</span>
                    <span>{modalVoluntario.cpf}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Habilidades:</span>
                    <span>{modalVoluntario.habilidades}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Disponibilidade:</span>
                    <span>{modalVoluntario.disponibilidade}</span>
                  </div>
                  <div className="info-item" style={{ gridColumn: "span 2" }}>
                    <label className="label">Status de Contato:</label>
                    <select
                      className="select-status"
                      value={modalVoluntario.statusContato}
                      onChange={(e) =>
                        setModalVoluntario({
                          ...modalVoluntario,
                          statusContato: e.target.value,
                        })
                      }
                    >
                      <option value="feito">Contato Feito</option>
                      <option value="naoFeito">Contato não feito</option>
                    </select>
                  </div>
                </div>
                <div className="center-btn">
                  <button className="salvar-btn" onClick={salvarStatus}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoluntarioList;
