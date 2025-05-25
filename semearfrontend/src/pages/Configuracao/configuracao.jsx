// import React, { useState, useEffect } from "react";
// import { FiEdit, FiPlus, FiTrash2, FiUser, FiLock, FiMail, FiPhone, FiKey, FiX } from "react-icons/fi";
// import Sidebar from "../../components/Menu/Sidebar";
// import Header from "../../components/Header/header";
// import "./styles.css";

// const ConfiguracoesAdministradores = () => {
//   const [admLogadoData, setAdmLogadoData] = useState(null);
//   const [listaAdministradores, setListaAdministradores] = useState([]);
//   const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
//   const [modalEditarAberto, setModalEditarAberto] = useState(false);
//   const [carregandoDados, setCarregandoDados] = useState(true);
//   const [erroRequisicao, setErroRequisicao] = useState(null);

//   const [formularioAdministrador, setFormularioAdministrador] = useState({
//     nomeCompleto: '',
//     telefoneContato: '',
//     cpfAdministrador: '',
//     emailAdministrador: '',
//     loginAcesso: '',
//     senhaAcesso: ''
//   });

//   useEffect(() => {
//     const buscarPerfilAdministrador = async () => {
//       try {
//         const tokenAutenticacao = localStorage.getItem("token");
//         const respostaRequisicao = await fetch("http://localhost:5189/api/Adm/perfil", {
//           headers: {
//             Authorization: `Bearer ${tokenAutenticacao}`,
//           },
//         });

//         if (!respostaRequisicao.ok) throw new Error("Erro ao carregar perfil");
        
//         const dadosPerfil = await respostaRequisicao.json();
//         setAdmLogadoData(dadosPerfil);
//       } catch (erro) {
//         setErroRequisicao(erro.message);
//       } finally {
//         setCarregandoDados(false);
//       }
//     };

//     buscarPerfilAdministrador();
//   }, []);

//   useEffect(() => {
//     const buscarTodosAdministradores = async () => {
//       try {
//         const tokenAutenticacao = localStorage.getItem("token");
//         const respostaRequisicao = await fetch("http://localhost:5189/api/Adm", {
//           headers: {
//             Authorization: `Bearer ${tokenAutenticacao}`,
//           },
//         });

//         if (!respostaRequisicao.ok) throw new Error("Erro ao carregar administradores");
        
//         const dadosAdministradores = await respostaRequisicao.json();
//         setListaAdministradores(dadosAdministradores);
//       } catch (erro) {
//         setErroRequisicao(erro.message);
//       }
//     };

//     buscarTodosAdministradores();
//   }, []);

//   const manipularMudancaFormulario = (evento) => {
//     const { name, value } = evento.target;
//     setFormularioAdministrador({
//       ...formularioAdministrador,
//       [name]: value
//     });
//   };

//   const submeterNovoAdministrador = async (evento) => {
//     evento.preventDefault();
//     setCarregandoDados(true);
    
//     try {
//       const tokenAutenticacao = localStorage.getItem("token");
//       const respostaRequisicao = await fetch("http://localhost:5189/api/Adm", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tokenAutenticacao}`,
//         },
//         body: JSON.stringify({
//           nome: formularioAdministrador.nomeCompleto,
//           telefone: formularioAdministrador.telefoneContato,
//           cpf: formularioAdministrador.cpfAdministrador,
//           email: formularioAdministrador.emailAdministrador,
//           login: formularioAdministrador.loginAcesso,
//           senha: formularioAdministrador.senhaAcesso
//         }),
//       });

//       if (!respostaRequisicao.ok) throw new Error("Erro ao cadastrar administrador");

//       const novoAdministrador = await respostaRequisicao.json();
//       setListaAdministradores([...listaAdministradores, novoAdministrador]);
//       setModalCadastroAberto(false);
//       setFormularioAdministrador({
//         nomeCompleto: '',
//         telefoneContato: '',
//         cpfAdministrador: '',
//         emailAdministrador: '',
//         loginAcesso: '',
//         senhaAcesso: ''
//       });
//     } catch (erro) {
//       setErroRequisicao(erro.message);
//     } finally {
//       setCarregandoDados(false);
//     }
//   };

//   const prepararEdicaoAdministrador = (administrador) => {
//     setFormularioAdministrador({
//       nomeCompleto: administrador.nome,
//       telefoneContato: administrador.telefone,
//       cpfAdministrador: administrador.cpf,
//       emailAdministrador: administrador.email,
//       loginAcesso: administrador.login,
//       senhaAcesso: ''
//     });
//     setModalEditarAberto(true);
//   };

//   const submeterEdicaoAdministrador = async (evento) => {
//     evento.preventDefault();
//     setCarregandoDados(true);
    
//     try {
//       const tokenAutenticacao = localStorage.getItem("token");
//       const respostaRequisicao = await fetch(`http://localhost:5189/api/Adm/${admLogadoData.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tokenAutenticacao}`,
//         },
//         body: JSON.stringify({
//           nome: formularioAdministrador.nomeCompleto,
//           telefone: formularioAdministrador.telefoneContato,
//           cpf: formularioAdministrador.cpfAdministrador,
//           email: formularioAdministrador.emailAdministrador,
//           login: formularioAdministrador.loginAcesso,
//           senha: formularioAdministrador.senhaAcesso || undefined
//         }),
//       });

//       if (!respostaRequisicao.ok) throw new Error("Erro ao atualizar administrador");

//       const administradorAtualizado = await respostaRequisicao.json();
//       setAdmLogadoData(administradorAtualizado);
//       setListaAdministradores(listaAdministradores.map(adm => 
//         adm.id === administradorAtualizado.id ? administradorAtualizado : adm
//       ));
//       setModalEditarAberto(false);
//     } catch (erro) {
//       setErroRequisicao(erro.message);
//     } finally {
//       setCarregandoDados(false);
//     }
//   };

//   const confirmarExclusaoAdministrador = async (idAdministrador) => {
//     if (window.confirm("Tem certeza que deseja excluir este administrador?")) {
//       try {
//         const tokenAutenticacao = localStorage.getItem("token");
//         const respostaRequisicao = await fetch(`http://localhost:5189/api/Adm/${idAdministrador}`, {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${tokenAutenticacao}`,
//           },
//         });

//         if (!respostaRequisicao.ok) throw new Error("Erro ao excluir administrador");

//         setListaAdministradores(listaAdministradores.filter(adm => adm.id !== idAdministrador));
//       } catch (erro) {
//         setErroRequisicao(erro.message);
//       }
//     }
//   };

//   return (
//     <div className="tela-inicial">
//       <Sidebar />
//       <div className="main-content">
//         <Header />
        
//         <div className="configuracoes-adm-content-wrapper">
//           <h1 className="configuracoes-adm-main-title">Configurações de Administradores</h1>
          
//           {/* Seção do Perfil do Administrador Logado */}
//           <div className="configuracoes-adm-perfil-section">
//             <h2 className="configuracoes-adm-section-title">Meu Perfil</h2>
//             {carregandoDados && !admLogadoData ? (
//               <div className="configuracoes-adm-loading-state">Carregando perfil...</div>
//             ) : erroRequisicao ? (
//               <div className="configuracoes-adm-error-state">{erroRequisicao}</div>
//             ) : admLogadoData ? (
//               <div className="configuracoes-adm-perfil-card">
//                 <div className="configuracoes-adm-perfil-avatar">
//                   <FiUser size={32} />
//                 </div>
//                 <div className="configuracoes-adm-perfil-info">
//                   <h3 className="configuracoes-adm-perfil-name">{admLogadoData.nome}</h3>
//                   <div className="configuracoes-adm-perfil-details">
//                     <div className="configuracoes-adm-detail-item">
//                       <FiMail className="configuracoes-adm-detail-icon" />
//                       <span>{admLogadoData.email}</span>
//                     </div>
//                     <div className="configuracoes-adm-detail-item">
//                       <FiPhone className="configuracoes-adm-detail-icon" />
//                       <span>{admLogadoData.telefone || 'Não informado'}</span>
//                     </div>
//                     <div className="configuracoes-adm-detail-item">
//                       <FiKey className="configuracoes-adm-detail-icon" />
//                       <span>CPF: {admLogadoData.cpf || 'Não informado'}</span>
//                     </div>
//                     <div className="configuracoes-adm-detail-item">
//                       <FiUser className="configuracoes-adm-detail-icon" />
//                       <span>Login: {admLogadoData.login}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <button 
//                   className="configuracoes-adm-edit-profile-button"
//                   onClick={() => prepararEdicaoAdministrador(admLogadoData)}
//                 >
//                   <FiEdit size={16} /> Editar Perfil
//                 </button>
//               </div>
//             ) : (
//               <div className="configuracoes-adm-no-data">Nenhum dado de perfil disponível</div>
//             )}
//           </div>
          
//           {/* Seção de Administradores Cadastrados */}
//           <div className="configuracoes-adm-administradores-section">
//             <div className="configuracoes-adm-section-header">
//               <h2 className="configuracoes-adm-section-title">Administradores Cadastrados</h2>
//               <button 
//                 className="configuracoes-adm-new-admin-button"
//                 onClick={() => setModalCadastroAberto(true)}
//               >
//                 <FiPlus size={16} /> Novo Administrador
//               </button>
//             </div>
            
//             {carregandoDados && listaAdministradores.length === 0 ? (
//               <div className="configuracoes-adm-loading-state">Carregando administradores...</div>
//             ) : erroRequisicao ? (
//               <div className="configuracoes-adm-error-state">{erroRequisicao}</div>
//             ) : listaAdministradores.length > 0 ? (
//               <div className="configuracoes-adm-administradores-grid">
//                 {listaAdministradores.map(adm => (
//                   <div key={adm.id} className="configuracoes-adm-admin-card">
//                     <div className="configuracoes-adm-admin-info">
//                       <div className="configuracoes-adm-admin-avatar">
//                         {adm.nome.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="configuracoes-adm-admin-text">
//                         <h4 className="configuracoes-adm-admin-name">{adm.nome}</h4>
//                         <p className="configuracoes-adm-admin-email">{adm.email}</p>
//                         <small className="configuracoes-adm-admin-login">Login: {adm.login}</small>
//                       </div>
//                     </div>
//                     <div className="configuracoes-adm-admin-actions">
//                       <button 
//                         className="configuracoes-adm-action-button configuracoes-adm-edit-button"
//                         onClick={() => prepararEdicaoAdministrador(adm)}
//                       >
//                         <FiEdit size={14} />
//                       </button>
//                       {adm.id !== admLogadoData?.id && (
//                         <button 
//                           className="configuracoes-adm-action-button configuracoes-adm-delete-button"
//                           onClick={() => confirmarExclusaoAdministrador(adm.id)}
//                         >
//                           <FiTrash2 size={14} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="configuracoes-adm-no-data">Nenhum administrador cadastrado</div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Modal para Cadastro de Novo Administrador */}
//       {modalCadastroAberto && (
//         <div className="configuracoes-adm-modal-overlay">
//           <div className="configuracoes-adm-modal-content">
//             <div className="configuracoes-adm-modal-header">
//               <h2 className="configuracoes-adm-modal-title">Cadastrar Novo Administrador</h2>
//               <button 
//                 className="configuracoes-adm-modal-close"
//                 onClick={() => setModalCadastroAberto(false)}
//               >
//                 <FiX size={24} />
//               </button>
//             </div>
//             <form onSubmit={submeterNovoAdministrador}>
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiUser className="configuracoes-adm-input-icon" /> Nome Completo
//                 </label>
//                 <input
//                   type="text"
//                   name="nomeCompleto"
//                   value={formularioAdministrador.nomeCompleto}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiMail className="configuracoes-adm-input-icon" /> E-mail
//                 </label>
//                 <input
//                   type="email"
//                   name="emailAdministrador"
//                   value={formularioAdministrador.emailAdministrador}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiPhone className="configuracoes-adm-input-icon" /> Telefone
//                 </label>
//                 <input
//                   type="text"
//                   name="telefoneContato"
//                   value={formularioAdministrador.telefoneContato}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiKey className="configuracoes-adm-input-icon" /> CPF
//                 </label>
//                 <input
//                   type="text"
//                   name="cpfAdministrador"
//                   value={formularioAdministrador.cpfAdministrador}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiUser className="configuracoes-adm-input-icon" /> Login
//                 </label>
//                 <input
//                   type="text"
//                   name="loginAcesso"
//                   value={formularioAdministrador.loginAcesso}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiLock className="configuracoes-adm-input-icon" /> Senha
//                 </label>
//                 <input
//                   type="password"
//                   name="senhaAcesso"
//                   value={formularioAdministrador.senhaAcesso}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-modal-buttons">
//                 <button 
//                   type="button" 
//                   className="configuracoes-adm-cancel-button"
//                   onClick={() => setModalCadastroAberto(false)}
//                 >
//                   Cancelar
//                 </button>
//                 <button type="submit" className="configuracoes-adm-save-button">
//                   {carregandoDados ? 'Salvando...' : 'Salvar'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
      
//       {/* Modal para Edição de Administrador */}
//       {modalEditarAberto && (
//         <div className="configuracoes-adm-modal-overlay">
//           <div className="configuracoes-adm-modal-content">
//             <div className="configuracoes-adm-modal-header">
//               <h2 className="configuracoes-adm-modal-title">Editar Administrador</h2>
//               <button 
//                 className="configuracoes-adm-modal-close"
//                 onClick={() => setModalEditarAberto(false)}
//               >
//                 <FiX size={24} />
//               </button>
//             </div>
//             <form onSubmit={submeterEdicaoAdministrador}>
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiUser className="configuracoes-adm-input-icon" /> Nome Completo
//                 </label>
//                 <input
//                   type="text"
//                   name="nomeCompleto"
//                   value={formularioAdministrador.nomeCompleto}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiMail className="configuracoes-adm-input-icon" /> E-mail
//                 </label>
//                 <input
//                   type="email"
//                   name="emailAdministrador"
//                   value={formularioAdministrador.emailAdministrador}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiPhone className="configuracoes-adm-input-icon" /> Telefone
//                 </label>
//                 <input
//                   type="text"
//                   name="telefoneContato"
//                   value={formularioAdministrador.telefoneContato}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiKey className="configuracoes-adm-input-icon" /> CPF
//                 </label>
//                 <input
//                   type="text"
//                   name="cpfAdministrador"
//                   value={formularioAdministrador.cpfAdministrador}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiUser className="configuracoes-adm-input-icon" /> Login
//                 </label>
//                 <input
//                   type="text"
//                   name="loginAcesso"
//                   value={formularioAdministrador.loginAcesso}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   required
//                 />
//               </div>
              
//               <div className="configuracoes-adm-form-group">
//                 <label className="configuracoes-adm-form-label">
//                   <FiLock className="configuracoes-adm-input-icon" /> Nova Senha (opcional)
//                 </label>
//                 <input
//                   type="password"
//                   name="senhaAcesso"
//                   value={formularioAdministrador.senhaAcesso}
//                   onChange={manipularMudancaFormulario}
//                   className="configuracoes-adm-form-input"
//                   placeholder="Deixe em branco para manter a senha atual"
//                 />
//               </div>
              
//               <div className="configuracoes-adm-modal-buttons">
//                 <button 
//                   type="button" 
//                   className="configuracoes-adm-cancel-button"
//                   onClick={() => setModalEditarAberto(false)}
//                 >
//                   Cancelar
//                 </button>
//                 <button type="submit" className="configuracoes-adm-save-button">
//                   {carregandoDados ? 'Atualizando...' : 'Atualizar'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConfiguracoesAdministradores;



import React, { useState, useEffect } from "react";
import { FiEdit, FiPlus, FiUser, FiLock, FiMail, FiPhone, FiKey, FiX, FiCheck } from "react-icons/fi";
import Sidebar from "../../components/Menu/Sidebar";
import Header from "../../components/Header/header";
import "./styles.css";

const ConfiguracoesAdministradores = () => {
  const [admLogadoData, setAdmLogadoData] = useState(null);
  const [listaAdministradores, setListaAdministradores] = useState([]);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState("");
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [erroRequisicao, setErroRequisicao] = useState(null);

  const [formularioAdministrador, setFormularioAdministrador] = useState({
    nomeCompleto: '',
    telefoneContato: '',
    cpfAdministrador: '',
    emailAdministrador: '',
    loginAcesso: '',
    senhaAcesso: ''
  });

  useEffect(() => {
    const buscarPerfilAdministrador = async () => {
      try {
        const tokenAutenticacao = localStorage.getItem("token");
        const respostaRequisicao = await fetch("http://localhost:5189/api/Adm/perfil", {
          headers: {
            Authorization: `Bearer ${tokenAutenticacao}`,
          },
        });

        if (!respostaRequisicao.ok) throw new Error("Erro ao carregar perfil");
        
        const dadosPerfil = await respostaRequisicao.json();
        setAdmLogadoData(dadosPerfil);
      } catch (erro) {
        setErroRequisicao(erro.message);
      } finally {
        setCarregandoDados(false);
      }
    };

    buscarPerfilAdministrador();
  }, []);

  useEffect(() => {
    const buscarTodosAdministradores = async () => {
      try {
        const tokenAutenticacao = localStorage.getItem("token");
        const respostaRequisicao = await fetch("http://localhost:5189/api/Adm", {
          headers: {
            Authorization: `Bearer ${tokenAutenticacao}`,
          },
        });

        if (!respostaRequisicao.ok) throw new Error("Erro ao carregar administradores");
        
        const dadosAdministradores = await respostaRequisicao.json();
        setListaAdministradores(dadosAdministradores);
      } catch (erro) {
        setErroRequisicao(erro.message);
      }
    };

    buscarTodosAdministradores();
  }, []);

  const manipularMudancaFormulario = (evento) => {
    const { name, value } = evento.target;
    setFormularioAdministrador({
      ...formularioAdministrador,
      [name]: value
    });
  };

  const submeterNovoAdministrador = async (evento) => {
    evento.preventDefault();
    setCarregandoDados(true);
    
    try {
      const tokenAutenticacao = localStorage.getItem("token");
      const respostaRequisicao = await fetch("http://localhost:5189/api/Adm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenAutenticacao}`,
        },
        body: JSON.stringify({
          nome: formularioAdministrador.nomeCompleto,
          telefone: formularioAdministrador.telefoneContato,
          cpf: formularioAdministrador.cpfAdministrador,
          email: formularioAdministrador.emailAdministrador,
          login: formularioAdministrador.loginAcesso,
          senha: formularioAdministrador.senhaAcesso
        }),
      });

      if (!respostaRequisicao.ok) throw new Error("Erro ao cadastrar administrador");

      const novoAdministrador = await respostaRequisicao.json();
      setListaAdministradores([...listaAdministradores, novoAdministrador]);
      setModalCadastroAberto(false);
      setFormularioAdministrador({
        nomeCompleto: '',
        telefoneContato: '',
        cpfAdministrador: '',
        emailAdministrador: '',
        loginAcesso: '',
        senhaAcesso: ''
      });
      
      setMensagemConfirmacao("Administrador cadastrado com sucesso!");
      setModalConfirmacaoAberto(true);
    } catch (erro) {
      setErroRequisicao(erro.message);
    } finally {
      setCarregandoDados(false);
    }
  };

  const prepararEdicaoAdministrador = (administrador) => {
    setFormularioAdministrador({
      nomeCompleto: administrador.nome,
      telefoneContato: administrador.telefone,
      cpfAdministrador: administrador.cpf,
      emailAdministrador: administrador.email,
      loginAcesso: administrador.login,
      senhaAcesso: ''
    });
    setModalEditarAberto(true);
  };

  const submeterEdicaoAdministrador = async (evento) => {
    evento.preventDefault();
    setCarregandoDados(true);
    
    try {
      const tokenAutenticacao = localStorage.getItem("token");
      const respostaRequisicao = await fetch(`http://localhost:5189/api/Adm/${admLogadoData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenAutenticacao}`,
        },
        body: JSON.stringify({
          nome: formularioAdministrador.nomeCompleto,
          telefone: formularioAdministrador.telefoneContato,
          cpf: formularioAdministrador.cpfAdministrador,
          email: formularioAdministrador.emailAdministrador,
          login: formularioAdministrador.loginAcesso,
          senha: formularioAdministrador.senhaAcesso || undefined
        }),
      });

      if (!respostaRequisicao.ok) throw new Error("Erro ao atualizar administrador");

      const administradorAtualizado = await respostaRequisicao.json();
      setAdmLogadoData(administradorAtualizado);
      setListaAdministradores(listaAdministradores.map(adm => 
        adm.id === administradorAtualizado.id ? administradorAtualizado : adm)
    );

      setModalEditarAberto(false);
      
      setMensagemConfirmacao("Administrador atualizado com sucesso!");
      setModalConfirmacaoAberto(true);
    } catch (erro) {
      setErroRequisicao(erro.message);
    } finally {
      setCarregandoDados(false);
    }
  };

  return (
    <div className="tela-inicial">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        <div className="configuracoes-adm-content-wrapper">
          <h1 className="configuracoes-adm-main-title">Configurações de Administradores</h1>
          
          {/* Seção do Perfil do Administrador Logado */}
          <div className="configuracoes-adm-perfil-section">
            <h2 className="configuracoes-adm-section-title">Meu Perfil</h2>
            {carregandoDados && !admLogadoData ? (
              <div className="configuracoes-adm-loading-state">Carregando perfil...</div>
            ) : erroRequisicao ? (
              <div className="configuracoes-adm-error-state">{erroRequisicao}</div>
            ) : admLogadoData ? (
              <div className="configuracoes-adm-perfil-card">
                <div className="configuracoes-adm-perfil-avatar">
                  <FiUser size={32} />
                </div>
                <div className="configuracoes-adm-perfil-info">
                  <h3 className="configuracoes-adm-perfil-name">{admLogadoData.nome}</h3>
                  <div className="configuracoes-adm-perfil-details">
                    <div className="configuracoes-adm-detail-item">
                      <FiMail className="configuracoes-adm-detail-icon" />
                      <span>{admLogadoData.email}</span>
                    </div>
                    <div className="configuracoes-adm-detail-item">
                      <FiPhone className="configuracoes-adm-detail-icon" />
                      <span>{admLogadoData.telefone || 'Não informado'}</span>
                    </div>
                    <div className="configuracoes-adm-detail-item">
                      <FiKey className="configuracoes-adm-detail-icon" />
                      <span>CPF: {admLogadoData.cpf || 'Não informado'}</span>
                    </div>
                    <div className="configuracoes-adm-detail-item">
                      <FiUser className="configuracoes-adm-detail-icon" />
                      <span>Login: {admLogadoData.login}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="configuracoes-adm-edit-profile-button"
                  onClick={() => prepararEdicaoAdministrador(admLogadoData)}
                >
                  <FiEdit size={16} /> Editar Perfil
                </button>
              </div>
            ) : (
              <div className="configuracoes-adm-no-data">Nenhum dado de perfil disponível</div>
            )}
          </div>
          
          {/* Seção de Administradores Cadastrados */}
          <div className="configuracoes-adm-administradores-section">
            <div className="configuracoes-adm-section-header">
              <h2 className="configuracoes-adm-section-title">Administradores Cadastrados</h2>
              <button 
                className="configuracoes-adm-new-admin-button"
                onClick={() => setModalCadastroAberto(true)}
              >
                <FiPlus size={16} /> Novo Administrador
              </button>
            </div>
            
            {carregandoDados && listaAdministradores.length === 0 ? (
              <div className="configuracoes-adm-loading-state">Carregando administradores...</div>
            ) : erroRequisicao ? (
              <div className="configuracoes-adm-error-state">{erroRequisicao}</div>
            ) : listaAdministradores.length > 0 ? (
              <div className="configuracoes-adm-administradores-grid">
                {listaAdministradores.map(adm => (
                  <div key={adm.id} className="configuracoes-adm-admin-card">
                    <div className="configuracoes-adm-admin-info">
                      <div className="configuracoes-adm-admin-avatar">
                        {adm.nome.charAt(0).toUpperCase()}
                      </div>
                      <div className="configuracoes-adm-admin-text">
                        <h4 className="configuracoes-adm-admin-name">{adm.nome}</h4>
                        <p className="configuracoes-adm-admin-email">{adm.email}</p>
                        <small className="configuracoes-adm-admin-login">Login: {adm.login}</small>
                      </div>
                    </div>
                    <div className="configuracoes-adm-admin-actions">
                      <button 
                        className="configuracoes-adm-action-button configuracoes-adm-edit-button"
                        onClick={() => prepararEdicaoAdministrador(adm)}
                      >
                        <FiEdit size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="configuracoes-adm-no-data">Nenhum administrador cadastrado</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal para Cadastro de Novo Administrador */}
      {modalCadastroAberto && (
        <div className="configuracoes-adm-modal-overlay">
          <div className="configuracoes-adm-modal-content">
            <div className="configuracoes-adm-modal-header">
              <h2 className="configuracoes-adm-modal-title">Cadastrar Novo Administrador</h2>
              <button 
                className="configuracoes-adm-modal-close"
                onClick={() => setModalCadastroAberto(false)}
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={submeterNovoAdministrador}>
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiUser className="configuracoes-adm-input-icon" /> Nome Completo
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formularioAdministrador.nomeCompleto}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiMail className="configuracoes-adm-input-icon" /> E-mail
                </label>
                <input
                  type="email"
                  name="emailAdministrador"
                  value={formularioAdministrador.emailAdministrador}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiPhone className="configuracoes-adm-input-icon" /> Telefone
                </label>
                <input
                  type="text"
                  name="telefoneContato"
                  value={formularioAdministrador.telefoneContato}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiKey className="configuracoes-adm-input-icon" /> CPF
                </label>
                <input
                  type="text"
                  name="cpfAdministrador"
                  value={formularioAdministrador.cpfAdministrador}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiUser className="configuracoes-adm-input-icon" /> Login
                </label>
                <input
                  type="text"
                  name="loginAcesso"
                  value={formularioAdministrador.loginAcesso}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiLock className="configuracoes-adm-input-icon" /> Senha
                </label>
                <input
                  type="password"
                  name="senhaAcesso"
                  value={formularioAdministrador.senhaAcesso}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-modal-buttons">
                <button 
                  type="button" 
                  className="configuracoes-adm-cancel-button"
                  onClick={() => setModalCadastroAberto(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="configuracoes-adm-save-button">
                  {carregandoDados ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal para Edição de Administrador */}
      {modalEditarAberto && (
        <div className="configuracoes-adm-modal-overlay">
          <div className="configuracoes-adm-modal-content">
            <div className="configuracoes-adm-modal-header">
              <h2 className="configuracoes-adm-modal-title">Editar Administrador</h2>
              <button 
                className="configuracoes-adm-modal-close"
                onClick={() => setModalEditarAberto(false)}
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={submeterEdicaoAdministrador}>
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiUser className="configuracoes-adm-input-icon" /> Nome Completo
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formularioAdministrador.nomeCompleto}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiMail className="configuracoes-adm-input-icon" /> E-mail
                </label>
                <input
                  type="email"
                  name="emailAdministrador"
                  value={formularioAdministrador.emailAdministrador}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiPhone className="configuracoes-adm-input-icon" /> Telefone
                </label>
                <input
                  type="text"
                  name="telefoneContato"
                  value={formularioAdministrador.telefoneContato}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiKey className="configuracoes-adm-input-icon" /> CPF
                </label>
                <input
                  type="text"
                  name="cpfAdministrador"
                  value={formularioAdministrador.cpfAdministrador}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiUser className="configuracoes-adm-input-icon" /> Login
                </label>
                <input
                  type="text"
                  name="loginAcesso"
                  value={formularioAdministrador.loginAcesso}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  required
                />
              </div>
              
              <div className="configuracoes-adm-form-group">
                <label className="configuracoes-adm-form-label">
                  <FiLock className="configuracoes-adm-input-icon" /> Nova Senha (opcional)
                </label>
                <input
                  type="password"
                  name="senhaAcesso"
                  value={formularioAdministrador.senhaAcesso}
                  onChange={manipularMudancaFormulario}
                  className="configuracoes-adm-form-input"
                  placeholder="Deixe em branco para manter a senha atual"
                />
              </div>
              
              <div className="configuracoes-adm-modal-buttons">
                <button 
                  type="button" 
                  className="configuracoes-adm-cancel-button"
                  onClick={() => setModalEditarAberto(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="configuracoes-adm-save-button">
                  {carregandoDados ? 'Atualizando...' : 'Atualizar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {modalConfirmacaoAberto && (
        <div className="configuracoes-adm-modal-overlay">
          <div className="configuracoes-adm-modal-content configuracoes-adm-confirmacao-modal">
            <div className="configuracoes-adm-confirmacao-icon">
              <FiCheck size={48} className="configuracoes-adm-confirmacao-check" />
            </div>
            <h3 className="configuracoes-adm-confirmacao-mensagem">{mensagemConfirmacao}</h3>
            <button 
              className="configuracoes-adm-confirmacao-button"
              onClick={() => setModalConfirmacaoAberto(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracoesAdministradores;