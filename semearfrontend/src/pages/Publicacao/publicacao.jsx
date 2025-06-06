// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./styles.css";
// import logoSemear from "../../assets/logo.semear.png";
// import { FaImage } from "react-icons/fa";

// function Publicacao() {
//   const [titulo, setTitulo] = useState("");
//   const [texto, setTexto] = useState("");
//   const [imagemCapa, setImagemCapa] = useState(null);
//   const [imagemUrlExistente, setImagemUrlExistente] = useState("");
//   const [arquivoImagem, setArquivoImagem] = useState(null);
//   const [mostrarModal, setMostrarModal] = useState(false);
//   const [modoEdicao, setModoEdicao] = useState(false);
//   const [eventoId, setEventoId] = useState(null);
//   const [carregando, setCarregando] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (location.state?.eventoId) {
//       carregarEvento(location.state.eventoId);
//     }
//   }, [location.state]);

//   const carregarEvento = async (id) => {
//     setCarregando(true);
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(`http://localhost:5189/api/Evento/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const eventoData = await response.json();
//         setModoEdicao(true);
//         setEventoId(id);
//         setTitulo(eventoData.nome || "");
//         setTexto(eventoData.descricao || "");

//         if (eventoData.imagemUrl) {
//           setImagemUrlExistente(eventoData.imagemUrl);
//           setImagemCapa(`http://localhost:5189/api/galeria/${eventoData.imagemUrl}`);
//         }
//       } else {
//         alert("Erro ao carregar evento");
//         navigate("/telainicial");
//       }
//     } catch (error) {
//       console.error("Erro ao carregar evento:", error);
//       alert("Erro na conexão com o servidor");
//       navigate("/telainicial");
//     } finally {
//       setCarregando(false);
//     }
//   };

//   const horaAtual = new Date().toLocaleTimeString("pt-BR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagemCapa(URL.createObjectURL(file));
//       setArquivoImagem(file);
//       setImagemUrlExistente("");
//     }
//   };

//   const handleEditorChange = (e) => {
//     const html = e.currentTarget.innerHTML;
//     setTexto(html);
//   };

//   const focusEditorEnd = () => {
//     if (editorRef.current) {
//       const range = document.createRange();
//       range.selectNodeContents(editorRef.current);
//       range.collapse(false);
//       const selection = window.getSelection();
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   };

//   useEffect(() => {
//     if (modoEdicao && editorRef.current) {
//       focusEditorEnd();
//     }
//   }, [modoEdicao, texto]);

//   const enviarEvento = async (ehRascunho) => {
//     const formData = new FormData();
//     formData.append("Nome", titulo);
//     formData.append("Descricao", texto);
//     formData.append("DataEvento", new Date().toISOString());
//     formData.append("SalvarComoRascunho", ehRascunho.toString());

//     if (arquivoImagem) {
//       formData.append("Imagem", arquivoImagem);
//     }

//     const token = localStorage.getItem("token");
//     const url = modoEdicao
//       ? `http://localhost:5189/api/Evento/${eventoId}`
//       : "http://localhost:5189/api/Evento";

//     try {
//       const response = await fetch(url, {
//         method: modoEdicao ? "PUT" : "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const action = ehRascunho ? "salvo como rascunho" : "publicado";
//         alert(`Evento ${modoEdicao ? 'atualizado e ' : ''}${action} com sucesso!`);
//         navigate("/telainicial");
//       } else {
//         const errorData = await response.json();
//         alert(`Erro: ${errorData.message || 'Erro desconhecido'}`);
//       }
//     } catch (error) {
//       console.error("Erro ao enviar:", error);
//       alert("Erro na conexão com o servidor.");
//     }
//   };

//   const publicarConfirmado = () => {
//     enviarEvento(false);
//   };

//   const salvarComoRascunho = () => {
//     enviarEvento(true);
//   };

//   if (carregando) {
//     return (
//       <div className="tela-publicacao">
//         <div className="carregando">Carregando...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="tela-publicacao">
//       <header className="publicacao-header">
//         <div className="logo-titulo">
//           <img src={logoSemear} alt="Logo" className="logo-img" />
//           <div>
//             <strong>Semeando o Futuro</strong>
//             <p className="atualizacao">Horário: {horaAtual}</p>
//           </div>
//         </div>
//         <div className="botoes-header">
//           <button className="btn-fechar" onClick={salvarComoRascunho}>
//             Fechar e Salvar
//           </button>
//           <button
//             className="btn-publicar"
//             onClick={() => setMostrarModal(true)}
//           >
//             Publicar
//           </button>
//         </div>
//       </header>

//       <main className="editor">
//         <input
//           className="titulo-input"
//           type="text"
//           placeholder="Título"
//           value={titulo}
//           onChange={(e) => setTitulo(e.target.value)}
//         />

//         <div className="upload-box">
//           {imagemCapa ? (
//             <label className="capa-preview-container">
//               <img src={imagemCapa} alt="Capa" className="capa-preview" />
//               <div className="capa-overlay">
//                 <FaImage
//                   style={{
//                     fontSize: "24px",
//                     color: "#fff",
//                     marginRight: "8px",
//                   }}
//                 />
//                 <span>Trocar foto</span>
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 hidden
//               />
//             </label>
//           ) : (
//             <label className="upload-placeholder">
//               <FaImage
//                 style={{ fontSize: "20px", color: "#888", marginRight: "4px" }}
//               />
//               <span>Upload Photo</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 hidden
//               />
//             </label>
//           )}
//         </div>

//         <div
//           className="editor-area"
//           contentEditable
//           placeholder="Escreva uma história..."
//           onInput={handleEditorChange}
//           suppressContentEditableWarning={true}
//           dangerouslySetInnerHTML={{ __html: texto }}
//           ref={editorRef}
//         />
//       </main>

//       {mostrarModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <p>Tem certeza que deseja publicar esse texto na landing page?</p>
//             <div className="modal-buttons">
//               <button onClick={publicarConfirmado}>Sim</button>
//               <button onClick={() => setMostrarModal(false)}>Não</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Publicacao;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./styles.css";
// import logoSemear from "../../assets/logo.semear.png";
// import { FaImage } from "react-icons/fa";

// function Publicacao() {
//   const [titulo, setTitulo] = useState("");
//   const [texto, setTexto] = useState("");
//   const [imagemCapa, setImagemCapa] = useState(null);
//   const [imagemUrlExistente, setImagemUrlExistente] = useState("");
//   const [arquivoImagem, setArquivoImagem] = useState(null);
//   const [mostrarModal, setMostrarModal] = useState(false);
//   const [modoEdicao, setModoEdicao] = useState(false);
//   const [eventoId, setEventoId] = useState(null);
//   const [carregando, setCarregando] = useState(false);
//   const [mostrarModalFechar, setMostrarModalFechar] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (location.state?.eventoId) {
//       carregarEvento(location.state.eventoId);
//     }
//   }, [location.state]);

//   const carregarEvento = async (id) => {
//     setCarregando(true);
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(`https://back-end-n1cl.onrender.com/api/Evento/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const eventoData = await response.json();
//         setModoEdicao(true);
//         setEventoId(id);
//         setTitulo(eventoData.nome || "");
//         setTexto(eventoData.descricao || "");

//         if (eventoData.imagemUrl) {
//           setImagemUrlExistente(eventoData.imagemUrl);
//           setImagemCapa(
//             `https://back-end-n1cl.onrender.com/api/galeria/${eventoData.imagemUrl}`
//           );
//         }
//       } else {
//         alert("Erro ao carregar evento");
//         navigate("/telainicial");
//       }
//     } catch (error) {
//       console.error("Erro ao carregar evento:", error);
//       alert("Erro na conexão com o servidor");
//       navigate("/telainicial");
//     } finally {
//       setCarregando(false);
//     }
//   };

//   const horaAtual = new Date().toLocaleTimeString("pt-BR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagemCapa(URL.createObjectURL(file));
//       setArquivoImagem(file);
//       setImagemUrlExistente("");
//     }
//   };

//   const handleEditorChange = (e) => {
//     const html = e.currentTarget.innerHTML;
//     setTexto(html);
//   };

//   const focusEditorEnd = () => {
//     if (editorRef.current) {
//       const range = document.createRange();
//       range.selectNodeContents(editorRef.current);
//       range.collapse(false);
//       const selection = window.getSelection();
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   };

//   useEffect(() => {
//     if (modoEdicao && editorRef.current) {
//       focusEditorEnd();
//     }
//   }, [modoEdicao, texto]);

//   const enviarEvento = async (ehRascunho) => {
//     const formData = new FormData();
//     formData.append("Nome", titulo);
//     formData.append("Descricao", texto);
//     formData.append("DataEvento", new Date().toISOString());
//     formData.append("SalvarComoRascunho", ehRascunho.toString());

//     if (arquivoImagem) {
//       formData.append("Imagem", arquivoImagem);
//     }

//     const token = localStorage.getItem("token");
//     const url = modoEdicao
//       ? `https://back-end-n1cl.onrender.com/api/Evento/${eventoId}`
//       : "https://back-end-n1cl.onrender.com/api/Evento";

//     try {
//       const response = await fetch(url, {
//         method: modoEdicao ? "PUT" : "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         const action = ehRascunho ? "salvo como rascunho" : "publicado";
//         alert(
//           `Evento ${modoEdicao ? "atualizado e " : ""}${action} com sucesso!`
//         );
//         navigate("/telainicial");
//       } else {
//         const errorData = await response.json();
//         alert(`Erro: ${errorData.message || "Erro desconhecido"}`);
//       }
//     } catch (error) {
//       console.error("Erro ao enviar:", error);
//       alert("Erro na conexão com o servidor.");
//     }
//   };

//   const publicarConfirmado = () => {
//     enviarEvento(false);
//   };

//   const salvarComoRascunho = () => {
//     enviarEvento(true);
//   };

//   if (carregando) {
//     return (
//       <div className="tela-publicacao">
//         <div className="carregando">Carregando...</div>
//       </div>
//     );
//   }

//   const verificarAntesDeSalvar = () => {
//     if (!titulo.trim() && !texto.trim() && !imagemCapa) {
//       setMostrarModalFechar(true);
//     } else {
//       salvarComoRascunho();
//     }
//   };

//   return (
//     <div className="tela-publicacao">
//       <header className="publicacao-header">
//         <div className="logo-titulo">
//           <img src={logoSemear} alt="Logo" className="logo-img" />
//           <div>
//             <strong>Semeando o Futuro</strong>
//             <p className="atualizacao">Horário: {horaAtual}</p>
//           </div>
//         </div>
//         <div className="botoes-header">
//           <button className="btn-fechar" onClick={verificarAntesDeSalvar}>
//             Fechar e Salvar
//           </button>
//           <button
//             className="btn-publicar"
//             onClick={() => setMostrarModal(true)}
//           >
//             Publicar
//           </button>
//         </div>
//       </header>

//       <main className="editor">
//         <input
//           className="titulo-input"
//           type="text"
//           placeholder="Título"
//           value={titulo}
//           onChange={(e) => setTitulo(e.target.value)}
//         />

//         <div className="upload-box">
//           {imagemCapa ? (
//             <label className="capa-preview-container">
//               <img src={imagemCapa} alt="Capa" className="capa-preview" />
//               <div className="capa-overlay">
//                 <FaImage
//                   style={{
//                     fontSize: "24px",
//                     color: "#fff",
//                     marginRight: "8px",
//                   }}
//                 />
//                 <span>Trocar foto</span>
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 hidden
//               />
//             </label>
//           ) : (
//             <label className="upload-placeholder">
//               <FaImage
//                 style={{ fontSize: "20px", color: "#888", marginRight: "4px" }}
//               />
//               <span>Upload Photo</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 hidden
//               />
//             </label>
//           )}
//         </div>

//         <div
//           className="editor-area"
//           contentEditable
//           onInput={handleEditorChange}
//           suppressContentEditableWarning={true}
//           ref={editorRef}
//         />
//       </main>

//       {mostrarModal && (
//         <div className="modal-overlay">
//           <div className="modal-contenttt">
//             <p>Tem certeza que deseja publicar esse texto na landing page?</p>
//             <div className="modal-buttons">
//               <button onClick={publicarConfirmado}>Sim</button>
//               <button onClick={() => setMostrarModal(false)}>Não</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {mostrarModalFechar && (
//         <div className="modal-overlay">
//           <div className="modal-contenttt">
//             <div className="modal-title">Atenção</div>
//             <div className="modal-message">
//               A publicação está vazia. Por favor, adicione um título, imagem e
//               conteúdo antes de salvar.
//             </div>
//             <div className="modal-buttons">
//               <button onClick={() => setMostrarModalFechar(false)}>
//                 Continuar editando
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Publicacao;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import logoSemear from "../../assets/logo.semear.png";
import { FaImage } from "react-icons/fa";

function Publicacao() {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagemCapa, setImagemCapa] = useState(null);
  const [imagemUrlExistente, setImagemUrlExistente] = useState("");
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [eventoId, setEventoId] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mostrarModalFechar, setMostrarModalFechar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);

  useEffect(() => {
    if (location.state?.eventoId) {
      carregarEvento(location.state.eventoId);
    }
  }, [location.state]);

  const carregarEvento = async (id) => {
    setCarregando(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://back-end-n1cl.onrender.com/api/Evento/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const eventoData = await response.json();
        setModoEdicao(true);
        setEventoId(id);
        setTitulo(eventoData.nome || "");
        setTexto(eventoData.descricao || "");

        if (eventoData.imagemUrl) {
          setImagemUrlExistente(eventoData.imagemUrl);
          setImagemCapa(
            `https://back-end-n1cl.onrender.com/api/galeria/${eventoData.imagemUrl}`
          );
        }

        // Atualiza o conteúdo do editor visualmente
        if (editorRef.current) {
          editorRef.current.innerHTML = eventoData.descricao || "";
        }
      } else {
        alert("Erro ao carregar evento");
        navigate("/telainicial");
      }
    } catch (error) {
      console.error("Erro ao carregar evento:", error);
      alert("Erro na conexão com o servidor");
      navigate("/telainicial");
    } finally {
      setCarregando(false);
    }
  };

  const horaAtual = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemCapa(URL.createObjectURL(file));
      setArquivoImagem(file);
      setImagemUrlExistente("");
    }
  };

  const handleEditorChange = (e) => {
    const html = e.currentTarget.innerHTML;
    setTexto(html);
  };

  const focusEditorEnd = () => {
    if (editorRef.current) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  useEffect(() => {
    if (modoEdicao && editorRef.current) {
      editorRef.current.innerHTML = texto; // Atualiza o editor com o texto salvo
      focusEditorEnd();
    }
  }, [modoEdicao, texto]);

  const enviarEvento = async (ehRascunho) => {
    const formData = new FormData();
    formData.append("Nome", titulo);
    formData.append("Descricao", texto);
    formData.append("DataEvento", new Date().toISOString());
    formData.append("SalvarComoRascunho", ehRascunho.toString());

    if (arquivoImagem) {
      formData.append("Imagem", arquivoImagem);
    }

    const token = localStorage.getItem("token");
    const url = modoEdicao
      ? `https://back-end-n1cl.onrender.com/api/Evento/${eventoId}`
      : "https://back-end-n1cl.onrender.com/api/Evento";

    try {
      const response = await fetch(url, {
        method: modoEdicao ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const action = ehRascunho ? "salvo como rascunho" : "publicado";
        alert(
          `Evento ${modoEdicao ? "atualizado e " : ""}${action} com sucesso!`
        );
        navigate("/telainicial");
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  const publicarConfirmado = () => {
    enviarEvento(false);
  };

  const salvarComoRascunho = () => {
    enviarEvento(true);
  };

  if (carregando) {
    return (
      <div className="tela-publicacao">
        <div className="carregando">Carregando...</div>
      </div>
    );
  }

  const verificarAntesDeSalvar = () => {
    if (!titulo.trim() && !texto.trim() && !imagemCapa) {
      setMostrarModalFechar(true);
    } else {
      salvarComoRascunho();
    }
  };

  return (
    <div className="tela-publicacao">
      <header className="publicacao-header">
        <div className="logo-titulo">
          <img src={logoSemear} alt="Logo" className="logo-img" />
          <div>
            <strong>Semeando o Futuro</strong>
            <p className="atualizacao">Horário: {horaAtual}</p>
          </div>
        </div>
        <div className="botoes-header">
          <button className="btn-fechar" onClick={verificarAntesDeSalvar}>
            Fechar e Salvar
          </button>
          <button
            className="btn-publicar"
            onClick={() => setMostrarModal(true)}
          >
            Publicar
          </button>
        </div>
      </header>

      <main className="editor">
        <input
          className="titulo-input"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <div className="upload-box">
          {imagemCapa ? (
            <label className="capa-preview-container">
              <img src={imagemCapa} alt="Capa" className="capa-preview" />
              <div className="capa-overlay">
                <FaImage
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                    marginRight: "8px",
                  }}
                />
                <span>Trocar foto</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          ) : (
            <label className="upload-placeholder">
              <FaImage
                style={{ fontSize: "20px", color: "#888", marginRight: "4px" }}
              />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          )}
        </div>

        <div
          className="editor-area"
          contentEditable
          onInput={handleEditorChange}
          suppressContentEditableWarning={true}
          ref={editorRef}
        />
      </main>

      {mostrarModal && (
        <div className="modal-overlayy">
          <div className="modal-contenttt">
            <p>Tem certeza que deseja publicar esse texto na landing page?</p>
            <div className="modal-buttonss">
              <button onClick={publicarConfirmado}>Sim</button>
              <button onClick={() => setMostrarModal(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
      {mostrarModalFechar && (
        <div className="modal-overlay">
          <div className="modal-contenttt">
            <div className="modal-title">Atenção</div>
            <div className="modal-message">
              A publicação está vazia. Por favor, adicione um título, imagem e
              conteúdo antes de salvar.
            </div>
            <div className="modal-buttonss">
              <button onClick={() => setMostrarModalFechar(false)}>
                Continuar editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publicacao;
