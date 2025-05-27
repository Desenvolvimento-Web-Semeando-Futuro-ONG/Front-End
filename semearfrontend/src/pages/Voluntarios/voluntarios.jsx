// import React, { useState, useEffect } from "react";
// import { FiEdit } from "react-icons/fi";
// import Sidebar from "../../components/Menu/Sidebar";
// import Header from "../../components/Header/header";
// import "./styles.css";
// import { FaUser, FaUserFriends, FaDesktop } from "react-icons/fa";

// const VoluntarioList = () => {
//   const [voluntarios, setVoluntarios] = useState([]);
//   const [projetosAtivos, setProjetosAtivos] = useState([]);
//   const [projetoSelecionado, setProjetoSelecionado] = useState(null);
//   const [modalVoluntario, setModalVoluntario] = useState(null);
//   const [statusSelecionado, setStatusSelecionado] = useState("");
//   const [paginaAtual, setPaginaAtual] = useState(1);
//   const [carregando, setCarregando] = useState(false);
//   const voluntariosPorPagina = 5;

//   const [totalGeralInscritos, setTotalGeralInscritos] = useState(0);
//   const [atividadeMenosEscolhida, setAtividadeMenosEscolhida] = useState(null);
//   const [atividadeMaisEscolhida, setAtividadeMaisEscolhida] = useState("");

//   const token = localStorage.getItem("token");

//   const fetchWithToken = (url) =>
//     fetch(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//   useEffect(() => {
//     fetchWithToken("http://localhost:5189/api/Projeto/ativos")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar projetos ativos");
//         return res.json();
//       })
//       .then(setProjetosAtivos)
//       .catch(console.error);
//   }, [token]);

//   useEffect(() => {
//     setCarregando(true);
//     const url = projetoSelecionado
//       ? `http://localhost:5189/api/Projeto/${projetoSelecionado}/voluntarios`
//       : "http://localhost:5189/api/Voluntario";

//     fetchWithToken(url)
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar voluntários");
//         return res.json();
//       })
//       .then((data) => {
//         const voluntariosFormatados = data.map((v) => ({
//           id: v.voluntarioId || v.id,
//           nome: v.nome || "Não informado",
//           cpf: v.cpf || "Não informado",
//           dataCadastro: v.dataInscricao || v.dataCadastro,
//           telefone: v.telefone || "Não informado",
//           email: v.email || "Não informado",
//           statusContato: v.status === 0 ? "feito" : "naoFeito",
//           habilidades: v.habilidades || "",
//           disponibilidade: v.disponibilidade || "",
//         }));
//         setVoluntarios(voluntariosFormatados);
//         setCarregando(false);
//         setPaginaAtual(1);
//       })
//       .catch((err) => {
//         console.error(err);
//         setVoluntarios([]);
//         setCarregando(false);
//       });
//   }, [projetoSelecionado, token]);

//   useEffect(() => {
//     fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/total-geral-inscritos")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar total geral inscritos");
//         return res.json();
//       })
//       .then((data) => {
//         setTotalGeralInscritos(data.totalInscritos || 0);
//       })
//       .catch(console.error);

//     fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/projeto-menos-escolhido")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar projeto menos escolhido");
//         return res.json();
//       })
//       .then((data) => {
//         setAtividadeMenosEscolhida(data);
//       })
//       .catch(console.error);

//     fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/atividade-mais-escolhida")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar atividade mais escolhida");
//         return res.json();
//       })
//       .then((data) => {
//         setAtividadeMaisEscolhida(data.atividadeMaisEscolhida || "");
//       })
//       .catch(console.error);
//   }, [token]);

//   const abrirModal = (voluntario) => {
//     setModalVoluntario(voluntario);
//     setStatusSelecionado(voluntario.statusContato || "naoFeito");
//   };

//   const fecharModal = () => {
//     setModalVoluntario(null);
//     setStatusSelecionado("");
//   };

//   const salvarStatus = () => {
//     const atualizados = voluntarios.map((v) =>
//       v.id === modalVoluntario.id ? { ...modalVoluntario } : v
//     );
//     setVoluntarios(atualizados);
//     fecharModal();
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
//                 <p className="resumo-number">{totalGeralInscritos}</p>
//                 <p className="resumo-sub">
//                 </p>
//               </div>
//             </div>

//             <div className="divider" />

//             <div className="resumo-item">
//               <div className="resumo-icon">
//                 <FaUserFriends />
//               </div>
//               <div className="resumo-info">
//                 <p className="resumo-label">
//                   Atividade
//                   <br />
//                   menos escolhida
//                 </p>
//                 <p className="resumo-number">
//                   {atividadeMenosEscolhida?.nome || "N/D"}
//                 </p>
//               </div>
//             </div>

//             <div className="divider" />

//             <div className="resumo-item">
//               <div className="resumo-icon">
//                 <FaDesktop />
//               </div>
//               <div className="resumo-info">
//                 <p className="resumo-label">
//                   Atividade
//                   <br />
//                   mais escolhida
//                 </p>
//                 <p className="resumo-number">{atividadeMaisEscolhida || "N/D"}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="filtro-container" style={{ marginTop: "20px" }}>
//           <h2 className="titulo">Filtrar Voluntários por Projeto</h2>
//           <select
//             value={projetoSelecionado || ""}
//             onChange={(e) => setProjetoSelecionado(e.target.value || null)}
//           >
//             <option value="">Todos os Voluntários</option>
//             {projetosAtivos.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.nome} ({p.voluntariosCount || 0} voluntários)
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="voluntario-container" style={{ marginTop: "20px" }}>
//           <h2 className="titulo">
//             {projetoSelecionado
//               ? `Voluntários do Projeto: ${
//                   projetosAtivos.find((p) => p.id === projetoSelecionado)?.nome || ""
//                 }`
//               : "Todos os Voluntários"}
//           </h2>
//           <p className="subtitulo">
//             {projetoSelecionado
//               ? "Voluntários inscritos neste projeto"
//               : "Interessados na ONG"}
//           </p>

//           {carregando ? (
//             <div className="carregando">Carregando voluntários...</div>
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
//                   {voluntariosVisiveis.length > 0 ? (
//                     voluntariosVisiveis.map((v) => (
//                       <tr key={v.id}>
//                         <td>{v.nome}</td>
//                         <td>{v.cpf}</td>
//                         <td>{new Date(v.dataCadastro).toLocaleDateString("pt-BR")}</td>
//                         <td>{v.telefone}</td>
//                         <td>{v.email}</td>
//                         <td>
//                           <span
//                             className={
//                               v.statusContato === "feito"
//                                 ? "btn-feito"
//                                 : "btn-nao-feito"
//                             }
//                           >
//                             {v.statusContato === "feito"
//                               ? "Contato Feito"
//                               : "Contato não feito"}
//                           </span>
//                         </td>
//                         <td>
//                           <button
//                             className="icon-button"
//                             onClick={() => abrirModal(v)}
//                             title="Editar"
//                           >
//                             <FiEdit size={18} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
//                         Nenhum voluntário encontrado.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {totalPaginas > 1 && (
//                 <div className="paginacao">
//                   <button
//                     onClick={() => mudarPagina(paginaAtual - 1)}
//                     disabled={paginaAtual === 1}
//                   >
//                     Anterior
//                   </button>
//                   {[...Array(totalPaginas)].map((_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => mudarPagina(i + 1)}
//                       className={paginaAtual === i + 1 ? "pagina-ativa" : ""}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => mudarPagina(paginaAtual + 1)}
//                     disabled={paginaAtual === totalPaginas}
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
//                 <h3>Informações do Voluntário</h3>
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
//                     <span className="label">Habilidades:</span>
//                     <span>{modalVoluntario.habilidades}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="label">Disponibilidade:</span>
//                     <span>{modalVoluntario.disponibilidade}</span>
//                   </div>
//                   <div className="info-item" style={{ gridColumn: "span 2" }}>
//                     <label className="label">Status de Contato:</label>
//                     <select
//                       className="select-status"
//                       value={modalVoluntario.statusContato}
//                       onChange={(e) =>
//                         setModalVoluntario({
//                           ...modalVoluntario,
//                           statusContato: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="feito">Contato Feito</option>
//                       <option value="naoFeito">Contato não feito</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="center-btn">
//                   <button className="salvar-btn" onClick={salvarStatus}>
//                     Salvar
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoluntarioList;



// import React, { useState, useEffect } from "react";
// import { FiEdit, FiFilter, FiEye, FiX, FiCheckCircle, FiXCircle, FiSave } from "react-icons/fi";
// import { FaUser, FaUserFriends, FaDesktop } from "react-icons/fa";
// import Sidebar from "../../components/Menu/Sidebar";
// import Header from "../../components/Header/header";
// import "./styles.css";

// const VoluntarioList = () => {
//   const [voluntarios, setVoluntarios] = useState([]);
//   const [projetosAtivos, setProjetosAtivos] = useState([]);
//   const [projetoSelecionado, setProjetoSelecionado] = useState(null);
//   const [modalVoluntario, setModalVoluntario] = useState(null);
//   const [statusSelecionado, setStatusSelecionado] = useState("");
//   const [paginaAtual, setPaginaAtual] = useState(1);
//   const [carregando, setCarregando] = useState(false);
//   const voluntariosPorPagina = 5;

//   const [totalGeralInscritos, setTotalGeralInscritos] = useState(0);
//   const [atividadeMenosEscolhida, setAtividadeMenosEscolhida] = useState(null);
//   const [atividadeMaisEscolhida, setAtividadeMaisEscolhida] = useState("");

//   const token = localStorage.getItem("token");

//   const fetchWithToken = (url, options = {}) =>
//     fetch(url, {
//       ...options,
//       headers: { Authorization: `Bearer ${token}` },
//     });

//   useEffect(() => {
//     fetchWithToken("http://localhost:5189/api/Projeto/ativos")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar projetos ativos");
//         return res.json();
//       })
//       .then(setProjetosAtivos)
//       .catch(console.error);
//   }, [token]);

//   useEffect(() => {
//     setCarregando(true);
//     const url = projetoSelecionado
//       ? `http://localhost:5189/api/Projeto/${projetoSelecionado}/voluntarios`
//       : "http://localhost:5189/api/Voluntario";

//     fetchWithToken(url)
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar voluntários");
//         return res.json();
//       })
//       .then((data) => {
//         const voluntariosFormatados = data.map((v) => ({
//           id: v.voluntarioId || v.id,
//           nome: v.nome || "Não informado",
//           cpf: v.cpf || "Não informado",
//           dataCadastro: v.dataInscricao || v.dataCadastro,
//           telefone: v.telefone || "Não informado",
//           email: v.email || "Não informado",
//           statusContato: v.status === 0 ? "feito" : "naoFeito",
//           status: v.status || "pendente",
//           habilidades: v.habilidades || "",
//           disponibilidade: v.disponibilidade || "",
//         }));
//         setVoluntarios(voluntariosFormatados);
//         setCarregando(false);
//         setPaginaAtual(1);
//       })
//       .catch((err) => {
//         console.error(err);
//         setVoluntarios([]);
//         setCarregando(false);
//       });
//   }, [projetoSelecionado, token]);

//   useEffect(() => {
//     fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/total-geral-inscritos")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar total geral inscritos");
//         return res.json();
//       })
//       .then((data) => {
//         setTotalGeralInscritos(data.totalInscritos || 0);
//       })
//       .catch(console.error);

//     fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/projeto-menos-escolhido")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar projeto menos escolhido");
//         return res.json();
//       })
//       .then((data) => {
//         setAtividadeMenosEscolhida(data);
//       })
//       .catch(console.error);

//     fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/atividade-mais-escolhida")
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar atividade mais escolhida");
//         return res.json();
//       })
//       .then((data) => {
//         setAtividadeMaisEscolhida(data.atividadeMaisEscolhida || "");
//       })
//       .catch(console.error);
//   }, [token]);

//   const abrirModal = (voluntario) => {
//     setModalVoluntario(voluntario);
//     setStatusSelecionado(voluntario.statusContato || "naoFeito");
//   };

//   const fecharModal = () => {
//     setModalVoluntario(null);
//     setStatusSelecionado("");
//   };

//   const salvarStatus = () => {
//     const atualizados = voluntarios.map((v) =>
//       v.id === modalVoluntario.id ? { ...modalVoluntario } : v
//     );
//     setVoluntarios(atualizados);
//     fecharModal();
//   };

//   const handleAprovarRejeitar = async (acao) => {
//     try {
//       const url = `http://localhost:5189/api/${projetoSelecionado}/voluntarios/${modalVoluntario.id}/${acao}`;
//       const response = await fetchWithToken(url, {
//         method: 'POST'
//       });

//       if (!response.ok) throw new Error('Erro ao processar ação');

//       const atualizados = voluntarios.map(v => 
//         v.id === modalVoluntario.id 
//           ? { ...v, status: acao === 'aprovar' ? 'aprovado' : 'rejeitado' } 
//           : v
//       );
      
//       setVoluntarios(atualizados);
//       fecharModal();
//       alert(`Voluntário ${acao === 'aprovar' ? 'aprovado' : 'rejeitado'} com sucesso!`);
      
//     } catch (error) {
//       console.error(error);
//       alert('Ocorreu um erro ao processar a ação');
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
//       case 'feito':
//         return 'status-feito';
//       case 'naoFeito':
//         return 'status-naoFeito';
//       case 'aprovado':
//         return 'status-aprovado';
//       case 'rejeitado':
//         return 'status-rejeitado';
//       default:
//         return 'status-pendente';
//     }
//   };

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
//                 <p className="resumo-number">{totalGeralInscritos}</p>
//               </div>
//             </div>

//             <div className="divider" />

//             <div className="resumo-item">
//               <div className="resumo-icon">
//                 <FaUserFriends />
//               </div>
//               <div className="resumo-info">
//                 <p className="resumo-label">
//                   Atividade menos escolhida
//                 </p>
//                 <p className="resumo-number">
//                   {atividadeMenosEscolhida?.nome || "N/D"}
//                 </p>
//               </div>
//             </div>

//             <div className="divider" />

//             <div className="resumo-item">
//               <div className="resumo-icon">
//                 <FaDesktop />
//               </div>
//               <div className="resumo-info">
//                 <p className="resumo-label">
//                   Atividade mais escolhida
//                 </p>
//                 <p className="resumo-number">{atividadeMaisEscolhida || "N/D"}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="filtro-container">
//           <div className="filtro-wrapper">
//             <FiFilter className="filtro-icon" size={20} />
//             <select
//               className="filtro-select"
//               value={projetoSelecionado || ""}
//               onChange={(e) => setProjetoSelecionado(e.target.value || null)}
//             >
//               <option value="">Todos os Voluntários</option>
//               {projetosAtivos.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.nome} ({p.voluntariosCount || 0} voluntários)
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="voluntario-container">
//           <h2 className="titulo">
//             {projetoSelecionado
//               ? `Voluntários do Projeto: ${
//                   projetosAtivos.find((p) => p.id === projetoSelecionado)?.nome || ""
//                 }`
//               : "Todos os Voluntários"}
//           </h2>
//           <p className="subtitulo">
//             {projetoSelecionado
//               ? "Voluntários inscritos neste projeto"
//               : "Interessados na ONG"}
//           </p>

//           {carregando ? (
//             <div className="carregando">Carregando voluntários...</div>
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
//                   {voluntariosVisiveis.length > 0 ? (
//                     voluntariosVisiveis.map((v) => (
//                       <tr key={v.id}>
//                         <td>{v.nome}</td>
//                         <td>{v.cpf}</td>
//                         <td>{new Date(v.dataCadastro).toLocaleDateString("pt-BR")}</td>
//                         <td>{v.telefone}</td>
//                         <td>{v.email}</td>
//                         <td>
//                           <span className={`status-badge ${getStatusClass(v.statusContato || v.status)}`}>
//                             {v.statusContato === "feito" && "Contato Feito"}
//                             {v.statusContato === "naoFeito" && "Contato não feito"}
//                             {v.status === "aprovado" && "Aprovado"}
//                             {v.status === "rejeitado" && "Rejeitado"}
//                             {v.status === "pendente" && "Pendente"}
//                           </span>
//                         </td>
//                         <td>
//                           <button
//                             className="icon-button visualizar-btn"
//                             onClick={() => abrirModal(v)}
//                             title="Visualizar"
//                           >
//                             <FiEye size={18} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="sem-registros">
//                         Nenhum voluntário encontrado.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {totalPaginas > 1 && (
//                 <div className="paginacao">
//                   <button
//                     onClick={() => mudarPagina(paginaAtual - 1)}
//                     disabled={paginaAtual === 1}
//                   >
//                     Anterior
//                   </button>
//                   {[...Array(totalPaginas)].map((_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => mudarPagina(i + 1)}
//                       className={paginaAtual === i + 1 ? "pagina-ativa" : ""}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => mudarPagina(paginaAtual + 1)}
//                     disabled={paginaAtual === totalPaginas}
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
//                 <div className="modal-header">
//                   <h3>Detalhes do Voluntário</h3>
//                   <button className="fechar-modal" onClick={fecharModal}>
//                     <FiX size={24} />
//                   </button>
//                 </div>
                
//                 <div className="modal-content">
//                   <div className="info-grid">
//                     <div className="info-item">
//                       <span className="info-label">Nome:</span>
//                       <span className="info-value">{modalVoluntario.nome}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">CPF:</span>
//                       <span className="info-value">{modalVoluntario.cpf}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Habilidades:</span>
//                       <span className="info-value">{modalVoluntario.habilidades}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Disponibilidade:</span>
//                       <span className="info-value">{modalVoluntario.disponibilidade}</span>
//                     </div>
//                   </div>
                  
//                   <div className="status-section">
//                     <label className="status-label">Status:</label>
//                     <select
//                       className="status-select"
//                       value={modalVoluntario.statusContato}
//                       onChange={(e) =>
//                         setModalVoluntario({
//                           ...modalVoluntario,
//                           statusContato: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="feito">Contato Feito</option>
//                       <option value="naoFeito">Contato não feito</option>
//                     </select>
//                   </div>
                  
//                   {projetoSelecionado && (
//                     <div className="acoes-voluntario">
//                       <button 
//                         className="btn-aprovar"
//                         onClick={() => handleAprovarRejeitar('aprovar')}
//                       >
//                         <FiCheckCircle size={16} /> Aprovar
//                       </button>
//                       <button 
//                         className="btn-rejeitar"
//                         onClick={() => handleAprovarRejeitar('rejeitar')}
//                       >
//                         <FiXCircle size={16} /> Rejeitar
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="modal-footer">
//                   <button className="btn-salvar" onClick={salvarStatus}>
//                     <FiSave size={16} /> Salvar Alterações
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoluntarioList;



import React, { useState, useEffect } from "react";
import { FiFilter, FiEye, FiX, FiCheckCircle, FiXCircle, FiSave } from "react-icons/fi";
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
  const voluntariosPorPagina = 5;

  const [totalGeralInscritos, setTotalGeralInscritos] = useState(0);
  const [atividadeMenosEscolhida, setAtividadeMenosEscolhida] = useState(null);
  const [atividadeMaisEscolhida, setAtividadeMaisEscolhida] = useState("");

  const token = localStorage.getItem("token");

  const fetchWithToken = (url, options = {}) =>
    fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${token}` },
    });

  useEffect(() => {
    fetchWithToken("http://localhost:5189/api/Projeto/ativos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar projetos ativos");
        return res.json();
      })
      .then(setProjetosAtivos)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    setCarregando(true);
    const url = projetoSelecionado
      ? `http://localhost:5189/api/Projeto/${projetoSelecionado}/voluntarios`
      : "http://localhost:5189/api/Voluntario";

    fetchWithToken(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar voluntários");
        return res.json();
      })
      .then((data) => {
        const voluntariosFormatados = data.map((v) => ({
          id: v.voluntarioId || v.id,
          nome: v.nome || "Não informado",
          cpf: v.cpf || "Não informado",
          dataCadastro: v.dataInscricao || v.dataCadastro,
          telefone: v.telefone || "Não informado",
          email: v.email || "Não informado",
          status: v.status || "analise",
          habilidades: v.habilidades || "",
          disponibilidade: v.disponibilidade || "",
        }));
        setVoluntarios(voluntariosFormatados);
        setCarregando(false);
        setPaginaAtual(1);
      })
      .catch((err) => {
        console.error(err);
        setVoluntarios([]);
        setCarregando(false);
      });
  }, [projetoSelecionado, token]);

  useEffect(() => {
    fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/total-geral-inscritos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar total geral inscritos");
        return res.json();
      })
      .then((data) => {
        setTotalGeralInscritos(data.totalInscritos || 0);
      })
      .catch(console.error);

    fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/projeto-menos-escolhido")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar projeto menos escolhido");
        return res.json();
      })
      .then((data) => {
        setAtividadeMenosEscolhida(data);
      })
      .catch(console.error);

    fetchWithToken("http://localhost:5189/api/Projeto/estatisticas/atividade-mais-escolhida")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar atividade mais escolhida");
        return res.json();
      })
      .then((data) => {
        setAtividadeMaisEscolhida(data.atividadeMaisEscolhida || "");
      })
      .catch(console.error);
  }, [token]);

  const abrirModal = (voluntario) => {
    setModalVoluntario(voluntario);
  };

  const fecharModal = () => {
    setModalVoluntario(null);
  };

const handleAprovarRejeitar = async (acao) => {
  try {
    if (!projetoSelecionado || !modalVoluntario?.id) {
      throw new Error('Projeto ou voluntário não selecionado');
    }

    console.log('Enviando para:', {
      projetoId: projetoSelecionado,
      voluntarioId: modalVoluntario.id,
      acao
    });

    const url = `http://localhost:5189/api/Projeto/${projetoSelecionado}/voluntarios/${modalVoluntario.id}/${acao}`;
    
    const response = await fetchWithToken(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({}) 
    });

    console.log('Resposta:', response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erro HTTP: ${response.status}`);
    }

    const atualizados = voluntarios.map(v => 
      v.id === modalVoluntario.id 
        ? { ...v, status: acao } 
        : v
    );
    
    setVoluntarios(atualizados);
    fecharModal();
    
    alert(`Voluntário ${acao === 'aprovar' ? 'aprovado' : 'rejeitado'} com sucesso!`);
    
  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      stack: error.stack
    });
    
    alert(`Falha ao ${acao === 'aprovar' ? 'aprovar' : 'rejeitar'} voluntário: ${error.message}`);
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
      case 'aprovado':
        return 'Aprovado';
      case 'rejeitado':
        return 'Rejeitado';
      default:
        return 'Análise';
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
                <p className="resumo-number">{totalGeralInscritos}</p>
              </div>
            </div>

            <div className="divider" />

            <div className="resumo-item">
              <div className="resumo-icon">
                <FaUserFriends />
              </div>
              <div className="resumo-info">
                <p className="resumo-label">Atividade menos escolhida</p>
                <p className="resumo-number">
                  {atividadeMenosEscolhida?.nome || "N/D"}
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="resumo-item">
              <div className="resumo-icon">
                <FaDesktop />
              </div>
              <div className="resumo-info">
                <p className="resumo-label">Atividade mais escolhida</p>
                <p className="resumo-number">{atividadeMaisEscolhida || "N/D"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="voluntario-container">
          <div className="voluntario-header">
            <div>
              <h2 className="titulo">
                {projetoSelecionado
                  ? `Voluntários do Projeto: ${
                      projetosAtivos.find((p) => p.id === projetoSelecionado)?.nome || ""
                    }`
                  : "Todos os Voluntários"}
              </h2>
              <p className="subtitulo">
                {projetoSelecionado
                  ? "Voluntários inscritos neste projeto"
                  : "Interessados na ONG"}
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
                        <td>
                          <span className={`status-badge ${v.status}`}>
                            {getStatusText(v.status)}
                          </span>
                        </td>
                        <td>
                          <button
                            className="icon-button visualizar-btn"
                            onClick={() => abrirModal(v)}
                            title="Visualizar"
                          >
                            <FiEye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={projetoSelecionado ? 5 : 7} className="sem-registros">
                        Nenhum voluntário encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {totalPaginas > 1 && (
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
              )}
            </>
          )}

          {modalVoluntario && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h3>Detalhes do Voluntário</h3>
                  <button className="fechar-modal" onClick={fecharModal}>
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="modal-content">
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Nome:</span>
                      <span className="info-value">{modalVoluntario.nome}</span>
                    </div>
                    {!projetoSelecionado && (
                      <>
                        <div className="info-item">
                          <span className="info-label">CPF:</span>
                          <span className="info-value">{modalVoluntario.cpf}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Telefone:</span>
                          <span className="info-value">{modalVoluntario.telefone}</span>
                        </div>
                      </>
                    )}
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{modalVoluntario.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Habilidades:</span>
                      <span className="info-value">{modalVoluntario.habilidades}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Disponibilidade:</span>
                      <span className="info-value">{modalVoluntario.disponibilidade}</span>
                    </div>
                  </div>
                  
                  {projetoSelecionado && (
                    <div className="acoes-voluntario">
                      <button 
                        className="btn-aprovar"
                        onClick={() => handleAprovarRejeitar('aprovar')}
                      >
                        <FiCheckCircle size={16} /> Aprovar
                      </button>
                      <button 
                        className="btn-rejeitar"
                        onClick={() => handleAprovarRejeitar('rejeitar')}
                      >
                        <FiXCircle size={16} /> Rejeitar
                      </button>
                    </div>
                  )}
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