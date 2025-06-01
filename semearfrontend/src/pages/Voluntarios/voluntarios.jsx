import React, { useState, useEffect } from "react";
import { FiFilter, FiEye, FiX, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { FaUser, FaUserFriends, FaDesktop } from "react-icons/fa";
import Sidebar from "../../components/Menu/Sidebar";
import Header from "../../components/Header/header";
import "./styles.css";

const VoluntarioList = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [projetosAtivos, setProjetosAtivos] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [modalVoluntario, setModalVoluntario] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [notificacao, setNotificacao] = useState(null);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  const voluntariosPorPagina = 5;

  const [totalGeralInscritos, setTotalGeralInscritos] = useState(0);
  const [projetoMenosEscolhido, setProjetoMenosEscolhido] = useState(null);
  const [atividadeMaisEscolhida, setAtividadeMaisEscolhida] = useState("");

  const token = localStorage.getItem("token");

  const fetchWithToken = (url, options = {}) =>
    fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${token}` },
    });

  const carregarVoluntarios = () => {
    setCarregando(true);
    const url = projetoSelecionado
      ? `https://back-end-n1cl.onrender.com/api/Projeto/${projetoSelecionado}/voluntarios`
      : "https://back-end-n1cl.onrender.com/api/Voluntario";

    fetchWithToken(url)
      .then((res) => res.json())
      .then((data) => {
        const voluntariosFormatados = data.map((v) => ({
          id: v.voluntarioId || v.id,
          nome: v.nome || "Não informado",
          cpf: v.cpf || "Não informado",
          dataCadastro: v.dataInscricao || v.dataCadastro || new Date().toISOString(),
          telefone: v.telefone || "Não informado",
          email: v.email || "Não informado",
          status: v.status === 1 ? "aprovado" : v.status === 2 ? "rejeitado" : "analise",
          habilidades: v.habilidades || v.habilidade || "Não informado",
          disponibilidade: v.disponibilidade || "Não informado",
        }));

        setVoluntarios(voluntariosFormatados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error(err);
        setVoluntarios([]);
        setCarregando(false);
      });
  };

  useEffect(() => {
    fetchWithToken("https://back-end-n1cl.onrender.com/api/Projeto/ativos")
      .then((res) => res.json())
      .then(setProjetosAtivos)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    carregarVoluntarios();
  }, [projetoSelecionado, token]);

  useEffect(() => {
    fetchWithToken("https://back-end-n1cl.onrender.com/api/Projeto/estatisticas/total-geral-inscritos")
      .then((res) => res.json())
      .then((data) => setTotalGeralInscritos(data.totalInscritos || 0))
      .catch(console.error);

    fetchWithToken("https://back-end-n1cl.onrender.com/api/Projeto/estatisticas/projeto-menos-escolhido")
      .then((res) => res.json())
      .then((data) => {
        setProjetoMenosEscolhido({
          nome: data.nome || "Nenhum projeto",
          totalInscritos: data.totalInscritos || 0
        });
      })
      .catch(console.error);

    fetchWithToken("https://back-end-n1cl.onrender.com/api/Projeto/estatisticas/atividade-mais-escolhida")
      .then((res) => res.json())
      .then((data) => setAtividadeMaisEscolhida(data.atividadeMaisEscolhida || "Nenhuma atividade"))
      .catch(console.error);
  }, [token]);

  const abrirModal = (voluntario) => setModalVoluntario(voluntario);
  const fecharModal = () => setModalVoluntario(null);

  const handleAprovarRejeitar = async (acao) => {
    try {
      if (!projetoSelecionado || !modalVoluntario?.id) {
        throw new Error("Projeto ou voluntário não selecionado");
      }

      const url = `https://back-end-n1cl.onrender.com/api/Projeto/${projetoSelecionado}/voluntarios/${modalVoluntario.id}/${acao}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({}) 
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro HTTP: ${response.status}`);
      }

      setVoluntarios(prev => prev.filter(v => v.id !== modalVoluntario.id));
      
      setNotificacao({
        tipo: 'sucesso',
        mensagem: `Voluntário ${acao === "aprovar" ? "aprovado" : "rejeitado"} com sucesso!`
      });
      setMostrarNotificacao(true);
      
      setTimeout(() => {
        setMostrarNotificacao(false);
      }, 3000);

      fecharModal();
      carregarVoluntarios();
    } catch (error) {
      console.error("Erro completo:", error);
      setNotificacao({
        tipo: 'erro',
        mensagem: `Falha: ${error.message}`
      });
      setMostrarNotificacao(true);
      
      setTimeout(() => {
        setMostrarNotificacao(false);
      }, 3000);
    }
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

  const getStatusText = (status) => {
    switch (status) {
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
      default:
        return "Análise";
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
              <div className="resumo-icon"><FaUser /></div>
              <div className="resumo-info">
                <p className="resumo-label">Interessados</p>
                <p className="resumo-number">{totalGeralInscritos}</p>
              </div>
            </div>

            <div className="divider" />

            <div className="resumo-item">
              <div className="resumo-icon"><FaUserFriends /></div>
              <div className="resumo-info">
                <p className="resumo-label">Projeto menos escolhido</p>
                <p className="resumo-number">
                  {projetoMenosEscolhido?.nome || "N/D"} ({projetoMenosEscolhido?.totalInscritos || 0})
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="resumo-item">
              <div className="resumo-icon"><FaDesktop /></div>
              <div className="resumo-info">
                <p className="resumo-label">Atividade mais escolhida</p>
                <p className="resumo-number">{atividadeMaisEscolhida}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="voluntario-container">
          <div className="voluntario-header">
            <div>
              <h2 className="titulo">
                {projetoSelecionado
                  ? `Voluntários do Projeto: ${projetosAtivos.find((p) => p.id === projetoSelecionado)?.nome || ""}`
                  : "Todos os Voluntários"}
              </h2>
              <p className="subtitulo">
                {projetoSelecionado ? "Voluntários inscritos neste projeto" : "Interessados na ONG"}
              </p>
            </div>
            <div className="filtro-wrapper">
              <FiFilter className="filtro-icon" size={20} />
              <select
                className="filtro-select"
                value={projetoSelecionado || ""}
                onChange={(e) => setProjetoSelecionado(e.target.value || null)}
              >
                <option value="">Todos os Voluntários</option>
                {projetosAtivos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} ({p.voluntariosCount || 0} voluntários)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {carregando ? (
            <div className="carregando">Carregando voluntários...</div>
          ) : (
            <>
              <table className="voluntario-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    {!projetoSelecionado && <th>CPF</th>}
                    <th>Data</th>
                    {!projetoSelecionado && <th>Telefone</th>}
                    <th>Email</th>
                    {projetoSelecionado && <th>Função Desejada</th>}
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {voluntariosVisiveis.length > 0 ? (
                    voluntariosVisiveis.map((v) => (
                      <tr key={v.id}>
                        <td>{v.nome}</td>
                        {!projetoSelecionado && <td>{v.cpf}</td>}
                        <td>{new Date(v.dataCadastro).toLocaleDateString("pt-BR")}</td>
                        {!projetoSelecionado && <td>{v.telefone}</td>}
                        <td>{v.email}</td>
                        {projetoSelecionado && <td>{v.funcaoDesejada}</td>}
                        <td>
                          <span className={`status-badge ${v.status}`}>
                            {getStatusText(v.status)}
                          </span>
                        </td>
                        <td>
                          <button className="icon-button visualizar-btn" onClick={() => abrirModal(v)}>
                            <FiEye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={projetoSelecionado ? 7 : 8} className="sem-registros">
                        Nenhum voluntário encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {totalPaginas > 1 && (
                <div className="paginacao">
                  <button onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>Anterior</button>
                  {[...Array(totalPaginas)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => mudarPagina(i + 1)}
                      className={paginaAtual === i + 1 ? "pagina-ativa" : ""}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>Próxima</button>
                </div>
              )}
            </>
          )}

          {modalVoluntario && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h3>Detalhes do Voluntário</h3>
                  <button className="fechar-modal" onClick={fecharModal}><FiX size={24} /></button>
                </div>
                <div className="modal-contentt">
                  <div className="info-grid">
                    <div className="info-item"><span className="info-label">Nome:</span><span className="info-value">{modalVoluntario.nome}</span></div>
                    {!projetoSelecionado && (
                      <>
                        <div className="info-item"><span className="info-label">CPF:</span><span className="info-value">{modalVoluntario.cpf}</span></div>
                        <div className="info-item"><span className="info-label">Telefone:</span><span className="info-value">{modalVoluntario.telefone}</span></div>
                      </>
                    )}
                    <div className="info-item"><span className="info-label">Email:</span><span className="info-value">{modalVoluntario.email}</span></div>
                    <div className="info-item">
                      <span className="info-label">Habilidades:</span>
                      <div className="info-value">
                        {modalVoluntario.habilidades.split(',').map((habilidade, index) => (
                          <span key={index} style={{
                            display: 'inline-block',
                            backgroundColor: '#e0f2fe',
                            color: '#0369a1',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            marginRight: '6px',
                            marginBottom: '6px'
                          }}>
                            {habilidade.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="info-item"><span className="info-label">Disponibilidade:</span><span className="info-value">{modalVoluntario.disponibilidade}</span></div>
                  </div>
                  {projetoSelecionado && modalVoluntario.status === "analise" && (
                    <div className="acoes-voluntario">
                      <button
                        className="btn-aprovar"
                        onClick={() => handleAprovarRejeitar("aprovar")}
                      >
                        <FiCheckCircle size={16} /> Aprovar
                      </button>
                      <button
                        className="btn-rejeitar"
                        onClick={() => handleAprovarRejeitar("rejeitar")}
                      >
                        <FiXCircle size={16} /> Rejeitar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {mostrarNotificacao && (
            <div className={`notificacao ${notificacao.tipo}`}>
              {notificacao.tipo === 'sucesso' ? <FiCheckCircle /> : <FiXCircle />}
              {notificacao.mensagem}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoluntarioList;