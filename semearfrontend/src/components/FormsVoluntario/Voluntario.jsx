import React, { useState, useEffect } from "react";
import "./styles.css";
import bannerImage from "../../assets/bannervoluntarios.jpg"; 

const FormsVoluntario = ({ fecharFormulario }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [projetos, setProjetos] = useState("");
  const [habilidades, setHabilidades] = useState(""); 
  const [disponibilidade, setDisponibilidade] = useState("");
  const [concorda, setConcorda] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [opcoesProjetos, setOpcoesProjetos] = useState([]);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5189/api/Projeto/ativos")
      .then((res) => res.json())
      .then((data) => setOpcoesProjetos(data))
      .catch((err) => console.error("Erro ao buscar projetos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const voluntario = {
      nome,
      telefone,
      cpf,
      email,
      habilidades, 
      disponibilidade,
      projetos,
    };

    try {
      const response = await fetch("http://localhost:5189/api/Voluntario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voluntario),
      });

      if (response.ok) {
        setMostrarModalSucesso(true);
        setNome("");
        setTelefone("");
        setCpf("");
        setEmail("");
        setProjetos("");
        setHabilidades(""); 
        setDisponibilidade("");
        setConcorda(false);
        setMensagem("");
      } else {
        setMensagem("Erro ao cadastrar. Verifique os campos e tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="formulario-voluntario-overlay">
      <div className="formulario-voluntario-container">
        <div className="formulario-voluntario-banner">
          <img src={bannerImage} alt="Banner do formulário" />
          <button
            className="formulario-voluntario-fechar"
            onClick={fecharFormulario}
          >
            ✖
          </button>
        </div>

        <div className="formulario-voluntario-conteudo">
          <h3 className="formulario-voluntario-titulo">
            Formulário Voluntário
          </h3>

          <form className="formulario-voluntario-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <select
              value={projetos}
              onChange={(e) => setProjetos(e.target.value)}
              required
            >
              <option value="">Selecione um projeto</option>
              {opcoesProjetos.map((p) => (
                <option key={p.id} value={p.nome}>
                  {p.nome}
                </option>
              ))}
            </select>

            <textarea
              type="text"
              placeholder="Habilidades (ex: Comunicação, Liderança)"
              value={habilidades}
              onChange={(e) => setHabilidades(e.target.value)} 
              required
              style={{ gridColumn: "span 2" }}
            />

            <textarea
              placeholder="Dias e horários disponíveis"
              value={disponibilidade}
              onChange={(e) => setDisponibilidade(e.target.value)}
            />

            <div className="formulario-voluntario-privacidade">
              <label>
                <input
                  type="checkbox"
                  checked={concorda}
                  onChange={() => setConcorda(!concorda)}
                  required
                />
                Concordo com os termos de privacidade
              </label>
            </div>

            <button
              type="submit"
              className="formulario-voluntario-botao-enviar"
            >
              Enviar
            </button>
          </form>

          {mensagem && (
            <p style={{ color: "red", marginTop: "10px" }}>{mensagem}</p>
          )}
        </div>
      </div>

      {mostrarModalSucesso && (
        <div className="modal-sucesso-overlay">
          <div className="modal-sucesso">
            <button
              className="modal-fechar"
              onClick={() => setMostrarModalSucesso(false)}
            >
              ✖
            </button>
            <h2>Cadastro realizado com sucesso!</h2>
            <p>Entraremos em contato.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsVoluntario;
