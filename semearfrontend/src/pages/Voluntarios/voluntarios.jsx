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



// import React, { useState, useEffect } from "react";
// import { FiEye } from "react-icons/fi";
// import Sidebar from "../../components/Menu/Sidebar";
// import Header from "../../components/Header/header";
// import "./styles.css";
// import { FaUser, FaUserFriends, FaDesktop } from "react-icons/fa";

// const VoluntarioList = () => {
//   const [voluntarios, setVoluntarios] = useState([]);
//   const [projetos, setProjetos] = useState([]);
//   const [projetoSelecionado, setProjetoSelecionado] = useState("");
//   const [modalVoluntario, setModalVoluntario] = useState(null);
//   const [paginaAtual, setPaginaAtual] = useState(1);
//   const [estatisticas, setEstatisticas] = useState({
//     totalInscritos: 0,
//     projetoMenosEscolhido: "Carregando...",
//     atividadeMaisEscolhida: "Carregando..."
//   });
//   const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
//   const [mensagemConfirmacao, setMensagemConfirmacao] = useState("");
//   const [loading, setLoading] = useState(true);
//   const voluntariosPorPagina = 5;

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchEstatisticas = async () => {
//       try {
//         setLoading(true);
//         const [totalRes, projetoRes, atividadeRes] = await Promise.all([
//           fetch("http://localhost:5189/api/Projeto/estatisticas/total-inscritos", {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           }),
//           fetch("http://localhost:5189/api/Projeto/estatisticas/projeto-menos-escolhido", {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           }),
//           fetch("http://localhost:5189/api/Projeto/estatisticas/atividade-mais-escolhida", {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           })
//         ]);

//         const totalData = await totalRes.json();
//         const projetoData = await projetoRes.json();
//         const atividadeData = await atividadeRes.json();

//         setEstatisticas({
//           totalInscritos: totalData?.totalInscritos || totalData || 0,
//           projetoMenosEscolhido: projetoData?.nome || projetoData || "Nenhum dado",
//           atividadeMaisEscolhida: atividadeData?.nome || atividadeData || "Nenhum dado"
//         });
//       } catch (error) {
//         console.error("Erro ao buscar estatísticas:", error);
//         setEstatisticas({
//           totalInscritos: 0,
//           projetoMenosEscolhido: "Erro ao carregar",
//           atividadeMaisEscolhida: "Erro ao carregar"
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEstatisticas();
//   }, [token]);

//   useEffect(() => {
//     const fetchProjetos = async () => {
//       try {
//         const response = await fetch("http://localhost:5189/api/Projeto/admin", {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const data = await response.json();
//         setProjetos(data);
//       } catch (error) {
//         console.error("Erro ao buscar projetos:", error);
//       }
//     };

//     fetchProjetos();
//   }, [token]);

//   useEffect(() => {
//     const fetchVoluntarios = async () => {
//       try {
//         setLoading(true);
//         const url = projetoSelecionado
//           ? `http://localhost:5189/api/Projeto/${projetoSelecionado}/voluntarios`
//           : "http://localhost:5189/api/Voluntario";

//         const response = await fetch(url, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const data = await response.json();
//         setVoluntarios(data);
//       } catch (error) {
//         console.error("Erro ao buscar voluntários:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVoluntarios();
//   }, [projetoSelecionado, token]);

//   const abrirModal = (voluntario) => {
//     setModalVoluntario({
//       ...voluntario,
//       projetoId: projetoSelecionado || voluntario.projetoId
//     });
//   };

//   const fecharModal = () => {
//     setModalVoluntario(null);
//   };

//   const aprovarVoluntario = async (projetoId, voluntarioId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5189/api/Projeto/${projetoId}/voluntarios/${voluntarioId}/aprovar`,
//         {
//           method: "POST",
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.ok) {
//         const atualizados = voluntarios.map(v =>
//           v.id === voluntarioId ? { ...v, status: "Aprovado" } : v
//         );
//         setVoluntarios(atualizados);
//         setMensagemConfirmacao("Voluntário aprovado com sucesso! Mensagem enviada no WhatsApp.");
//         setMostrarConfirmacao(true);
//         fecharModal();
//       }
//     } catch (error) {
//       console.error("Erro ao aprovar voluntário:", error);
//     }
//   };

//   const rejeitarVoluntario = async (projetoId, voluntarioId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5189/api/Projeto/${projetoId}/voluntarios/${voluntarioId}/rejeitar`,
//         {
//           method: "POST",
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.ok) {
//         const atualizados = voluntarios.map(v =>
//           v.id === voluntarioId ? { ...v, status: "Rejeitado" } : v
//         );
//         setVoluntarios(atualizados);
//         setMensagemConfirmacao("Voluntário rejeitado com sucesso! Mensagem enviada no WhatsApp.");
//         setMostrarConfirmacao(true);
//         fecharModal();
//       }
//     } catch (error) {
//       console.error("Erro ao rejeitar voluntário:", error);
//     }
//   };

//   const totalPaginas = Math.ceil(voluntarios.length / voluntariosPorPagina);
//   const indexInicio = (paginaAtual - 1) * voluntariosPorPagina;
//   const indexFim = indexInicio + voluntariosPorPagina;
//   const voluntariosVisiveis = voluntarios.slice(indexInicio, indexFim);

//   const mudarPagina = (novaPagina) => {
//     if (novaPagina >= 1 && novaPagina <= totalPaginas) {
//       setPaginaAtual(novaPagina);
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Aprovado":
//         return "btn-aprovado";
//       case "Rejeitado":
//         return "btn-rejeitado";
//       default:
//         return "btn-pendente";
//     }
//   };

//   if (loading && voluntarios.length === 0) {
//     return (
//       <div className="tela-inicial">
//         <Sidebar />
//         <div className="main-content">
//           <Header />
//           <div className="loading">Carregando...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="tela-inicial">
//       <Sidebar />
//       <div className="main-content">
//         <Header />

//         <div className="resumo-dashboard">
//           <div className="resumo-card">
//             <div className="resumo-item">
//               <div className="resumo-icon">
//                 <FaUser />
//               </div>
//               <div className="resumo-info">
//                 <p className="resumo-label">Interessados</p>
//                 <p className="resumo-number">+{estatisticas.totalInscritos}</p>
//               </div>
//             </div>

//             <div className="divider" />

//             <div className="resumo-item">
//               <div className="resumo-icon">
//                 <FaUserFriends />
//               </div>
//               <div className="resumo-info">
//                 <p className="resumo-label">Projeto<br />menos escolhido</p>
//                 <p className="resumo-number">{estatisticas.projetoMenosEscolhido}</p>
//               </div>
//             </div>

//             <div className="divider" />

//             <div className="resumo-item">
//               <div className="resumo-icon">
//                 <FaDesktop />
//               </div>
//               <div className="resumo-info">
//                 <p className="resumo-label">Atividade<br />mais escolhida</p>
//                 <p className="resumo-number">{estatisticas.atividadeMaisEscolhida}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="voluntario-container">
//           <div className="filtro-container">
//             <h2 className="titulo">Voluntários Interessados</h2>
//             <div className="filtro-projeto">
//               <select
//                 value={projetoSelecionado}
//                 onChange={(e) => setProjetoSelecionado(e.target.value)}
//                 disabled={loading}
//               >
//                 <option value="">Todos os projetos</option>
//                 {projetos.map((projeto) => (
//                   <option key={projeto.id} value={projeto.id}>
//                     {projeto.nome}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <p className="subtitulo">Interessados na ONG</p>

//           {loading ? (
//             <div className="loading-table">Carregando voluntários...</div>
//           ) : (
//             <>
//               <table className="voluntario-table">
//                 <thead>
//                   <tr>
//                     <th>Nome</th>
//                     <th>CPF</th>
//                     <th>Data</th>
//                     <th>Telefone</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Ações</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {voluntariosVisiveis.map((v) => (
//                     <tr key={v.id}>
//                       <td>{v.nome}</td>
//                       <td>{v.cpf}</td>
//                       <td>{new Date(v.dataCadastro).toLocaleDateString()}</td>
//                       <td>{v.telefone}</td>
//                       <td>{v.email}</td>
//                       <td>
//                         <span className={getStatusClass(v.status || "Pendente")}>
//                           {v.status || "Pendente"}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className="icon-button"
//                           onClick={() => abrirModal(v)}
//                           title="Visualizar"
//                           disabled={loading}
//                         >
//                           <FiEye size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {voluntarios.length === 0 && (
//                 <div className="sem-registros">Nenhum voluntário encontrado</div>
//               )}

//               {voluntarios.length > 0 && (
//                 <div className="paginacao">
//                   <button
//                     onClick={() => mudarPagina(paginaAtual - 1)}
//                     disabled={paginaAtual === 1 || loading}
//                   >
//                     Anterior
//                   </button>
//                   {Array.from({ length: totalPaginas }, (_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => mudarPagina(i + 1)}
//                       className={paginaAtual === i + 1 ? "pagina-ativa" : ""}
//                       disabled={loading}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => mudarPagina(paginaAtual + 1)}
//                     disabled={paginaAtual === totalPaginas || loading}
//                   >
//                     Próxima
//                   </button>
//                 </div>
//               )}
//             </>
//           )}

//           {modalVoluntario && (
//             <div className="modal-overlay">
//               <div className="modal">
//                 <button className="fechar-modal" onClick={fecharModal}>
//                   ×
//                 </button>
//                 <h3>Detalhes do Voluntário</h3>
//                 <div className="modal-info">
//                   <div className="info-item">
//                     <span className="label">Nome:</span>
//                     <span>{modalVoluntario.nome}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">CPF:</span>
//                     <span>{modalVoluntario.cpf}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Telefone:</span>
//                     <span>{modalVoluntario.telefone}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Email:</span>
//                     <span>{modalVoluntario.email}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Data de Cadastro:</span>
//                     <span>
//                       {new Date(modalVoluntario.dataCadastro).toLocaleDateString()}
//                     </span>
//                   </div>
//                   {modalVoluntario.habilidades && (
//                     <div className="info-item">
//                       <span className="label">Habilidades:</span>
//                       <span>{modalVoluntario.habilidades}</span>
//                     </div>
//                   )}
//                   {modalVoluntario.disponibilidade && (
//                     <div className="info-item">
//                       <span className="label">Disponibilidade:</span>
//                       <span>{modalVoluntario.disponibilidade}</span>
//                     </div>
//                   )}
//                   {modalVoluntario.motivacao && (
//                     <div className="info-item">
//                       <span className="label">Motivação:</span>
//                       <span>{modalVoluntario.motivacao}</span>
//                     </div>
//                   )}
//                   <div className="info-item">
//                     <span className="label">Status:</span>
//                     <span className={getStatusClass(modalVoluntario.status || "Pendente")}>
//                       {modalVoluntario.status || "Pendente"}
//                     </span>
//                   </div>
//                 </div>
//                 {modalVoluntario.projetoId && (
//                   <div className="modal-botoes">
//                     <button
//                       className="btn-aprovar"
//                       onClick={() => aprovarVoluntario(modalVoluntario.projetoId, modalVoluntario.id)}
//                       disabled={loading}
//                     >
//                       Aprovar
//                     </button>
//                     <button
//                       className="btn-rejeitar"
//                       onClick={() => rejeitarVoluntario(modalVoluntario.projetoId, modalVoluntario.id)}
//                       disabled={loading}
//                     >
//                       Rejeitar
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {mostrarConfirmacao && (
//             <div className="modal-overlay">
//               <div className="modal-confirmacao">
//                 <p>{mensagemConfirmacao}</p>
//                 <button
//                   className="btn-ok"
//                   onClick={() => setMostrarConfirmacao(false)}
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoluntarioList;