import React, { useState } from 'react';
import './styles.css';

const FormsVoluntario = ({ fecharFormulario }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [projetos, setProjetos] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const [disponibilidade, setDisponibilidade] = useState('');
  const [concorda, setConcorda] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const opcoesProjetos = [
    'Instrutor de Judô',
    'Atividade com Idosos',
    'Organização de Eventos'
  ];

  const opcoesHabilidades = ['Comunicação', 'Organização', 'Trabalho em Equipe'];

  const toggleHabilidade = (habilidade) => {
    setHabilidades(prev =>
      prev.includes(habilidade)
        ? prev.filter(h => h !== habilidade)
        : [...prev, habilidade]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem('Cadastro realizado com sucesso! Cheque seu e-mail para mais informações. Logo entraremos em contato...');
  };

  return (
    <div className="formulario-voluntario-overlay">
      <div className="formulario-voluntario-container">
        <button className="formulario-voluntario-fechar" onClick={fecharFormulario}>
          ✖
        </button>
        <h3 className="formulario-voluntario-titulo">Formulário Voluntário</h3>
        <form className="formulario-voluntario-form" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="projetos">Projetos de Interesse:</label>
          <select
            value={projetos}
            onChange={(e) => setProjetos(e.target.value)}
            required
          >
            <option value="">Selecione um projeto</option>
            {opcoesProjetos.map((p, idx) => (
              <option key={idx} value={p}>{p}</option>
            ))}
          </select>

          <div className="formulario-voluntario-habilidades-container">
            <label>Habilidades:</label>
            {opcoesHabilidades.map((h, idx) => (
              <label key={idx} className="formulario-voluntario-habilidade-option">
                <input
                  type="checkbox"
                  value={h}
                  checked={habilidades.includes(h)}
                  onChange={() => toggleHabilidade(h)}
                />
                {h}
              </label>
            ))}
          </div>

          <textarea
            placeholder="Dias e horários que está livre"
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

          <button type="submit" className="formulario-voluntario-botao-enviar">
            Enviar
          </button>
        </form>

        {mensagem && <p className="formulario-voluntario-mensagem-sucesso">{mensagem}</p>}
      </div>
    </div>
  );
};

export default FormsVoluntario;
