import React, { useState } from 'react';
import './styles.css';
import Navbar from "../../components/Menu/Navbar";
import { FaWhatsapp, FaCopy, FaInstagram, FaFacebookF, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import fundoPublicacao from '../../assets/fundopublicacao.png';
import educacaoImage from '../../assets/recreativa.png';
import materiaisImage from '../../assets/criança.foto.png';

const Doacao = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [dados, setDados] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    email: '',
    valorDoacao: '',
    metodoPagamento: 'pix',
  });
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5189/api/Doador', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: dados.nome,
          telefone: dados.telefone,
          cpf: dados.cpf,
          email: dados.email,
          valorDoacao: parseFloat(dados.valorDoacao),
          metodoPagamento: dados.metodoPagamento,
          chavePix: '42.054.664/0001-83'
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar doação');
      }

      setShowQRCode(true);
      
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message || 'Erro ao processar doação');
    } finally {
      setIsLoading(false);
    }
  };

  const copiarChavePix = () => {
    navigator.clipboard.writeText('42.054.664/0001-83');
    alert('Chave Pix copiada!');
  };

  const generatePixPayload = () => {
    const valor = parseFloat(dados.valorDoacao).toFixed(2);
    return `00020126360014BR.GOV.BCB.PIX011142054664000183520400005303986540${valor}5802BR5920Semeando o Futuro6009Sao Paulo62070503***6304`;
  };

  return (
    <>
      <Navbar />
      
      <section id="home" className="hero-sectionn">
        <div className="hero-contentt">
          <h1>
            DOE nos ajude<span className="highlight">jovens</span>,
          </h1>
          <button className="cta-button">Doação</button>
        </div>
      </section>   
      
      <div className="doacao-background" style={{backgroundImage: `url(${fundoPublicacao})`}}>
        <div className="doacao-container">
          <div className="doacao-content">
            <h1 className="doacao-header">Ajude nessa causa:</h1>

            <p className="doacao-intro-text">
              Para que possamos continuar transformando milhares de vidas com alimentos, água e acesso à saúde, educação e geração de renda, precisamos muito de sua ajuda.
            </p>

            <p className="doacao-highlight-text">
              Um pouco de você é muito para quem não tem nada! Você faz a diferença.
            </p>

            <div className="doacao-plans-container">
              <div className="doacao-plan-card">
                <div className="card-image-container">
                  <img src={educacaoImage} alt="Educação" className="card-image" />
                </div> 
                <div className="card-content">
                  <h3 className="doacao-plan-title">VALOR </h3>
                  <p className="doacao-plan-description">
                    A sua doação ajuda nos a levar educação para milhares e jovens que ainda vivem em casas de barro.
                  </p>
                  <div className="doacao-plan-footer">
                    <button className="doacao-select-button" onClick={() => setFormVisible(true)}>
                      ESCOLHER
                    </button>
                  </div>
                </div>
              </div>

              <div className="doacao-plan-card">
                <div className="card-image-container">
                  <img src={materiaisImage} alt="Materiais" className="card-image" />
                </div>
                <div className="card-content">
                  <h3 className="doacao-plan-title">MATERIAIS</h3>
                  <p className="doacao-plan-description">
                    A sua doação nos ajuda a levar água, alimentos e materiais para milhares de pessoas.
                  </p>
                  <div className="doacao-plan-footer">
                    <a
                      href="https://wa.me/5581988430469?text=Olá!%20Gostaria%20de%20doar%20materiais%20para%20a%20ONG%20Semeando%20o%20Futuro."
                      className="doacao-select-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ENTRE EM CONTATO
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {formVisible && (
              <form className="doacao-form" onSubmit={handleSubmit}>
                <h3 className="doacao-form-title">DADOS PESSOAIS</h3>

                <div className="doacao-input-group">
                  <label className="doacao-input-label">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={dados.cpf}
                    onChange={handleInputChange}
                    className="doacao-input-field"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="doacao-row">
                  <div className="doacao-input-group">
                    <label className="doacao-input-label">Nome *</label>
                    <input
                      type="text"
                      name="nome"
                      value={dados.nome}
                      onChange={handleInputChange}
                      className="doacao-input-field"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="doacao-input-group">
                    <label className="doacao-input-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={dados.email}
                      onChange={handleInputChange}
                      className="doacao-input-field"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="doacao-row">
                  <div className="doacao-input-group">
                    <label className="doacao-input-label">Telefone *</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={dados.telefone}
                      onChange={handleInputChange}
                      className="doacao-input-field"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div className="doacao-input-group">
                    <label className="doacao-input-label">Valor da Doação (R$) *</label>
                    <input
                      type="number"
                      name="valorDoacao"
                      value={dados.valorDoacao}
                      onChange={handleInputChange}
                      className="doacao-input-field"
                      placeholder="100.00"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="doacao-payment-section">
                  <h3 className="doacao-payment-title">FORMA DE PAGAMENTO</h3>
                  <label className="payment-method-label">
                    <input
                      type="radio"
                      name="metodoPagamento"
                      value="pix"
                      checked={dados.metodoPagamento === 'pix'}
                      onChange={handleInputChange}
                    /> PIX
                  </label>
                </div>

                <button className="doacao-submit-button" type="submit" disabled={isLoading}>
                  {isLoading ? 'GERANDO PIX...' : 'GERAR PIX'}
                </button>
              </form>
            )}

            {showQRCode && (
              <div className="doacao-qr-container">
                <h3 className="doacao-qr-title">PAGAMENTO VIA PIX</h3>
                <div className="pix-content">
                  <div className="pix-qr-code">
                    <QRCode
                      value={generatePixPayload()}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                    <p>Escaneie o QR Code para realizar o pagamento</p>
                  </div>
                  <div className="pix-key">
                    <p><strong>Chave PIX (CNPJ):</strong></p>
                    <p>42.054.664/0001-83</p>
                    <button onClick={copiarChavePix} className="doacao-select-button">
                      <FaCopy /> Copiar Chave
                    </button>
                  </div>
                </div>
                <p className="doacao-plan-amount">
                  Valor: R$ {parseFloat(dados.valorDoacao).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/5581988430469?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ONG%20Semeando%20o%20Futuro."
        className="doacao-whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={38} />
      </a>

      <footer className="site-footer">
        <div className="footer-content">
          <p>© 2025 Semeando o Futuro. Todos os direitos reservados.</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="mailto:contato@seudominio.com" aria-label="E-mail">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Doacao;