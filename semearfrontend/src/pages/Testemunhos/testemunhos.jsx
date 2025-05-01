// Testemunhos.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css'; 

const testemunhos = [
    `"Oi Bianca! Queria muito agradecer pelo que vocês fazem pelo nosso filho. Desde que ele começou a participar das atividades da ONG, percebemos uma mudança enorme no comportamento dele. Está mais alegre, comunicativo e sempre animado para as aulas. Isso enche nossos corações de felicidade. Obrigada por tanto carinho e dedicação com ele e com todas as crianças!"`,
  
    `"Essa ONG transformou completamente a minha vida e a da minha família. Quando chegamos aqui, estávamos passando por um momento muito difícil, sem direção. Mas com o apoio que recebemos, conseguimos nos reerguer. A atenção, o cuidado e o amor que vocês têm com cada um é algo que jamais esquecerei. Só temos gratidão por tudo que vocês fazem!"`,
  
    `"O carinho e o cuidado que essa ONG oferece às crianças é algo simplesmente incrível. É muito mais do que um projeto social, é uma família. Ver meu filho sendo acolhido, aprendendo valores e crescendo num ambiente saudável e cheio de afeto não tem preço. Parabéns a todos vocês pelo trabalho maravilhoso e inspirador!"`,
  
    `"Desde que comecei a participar como voluntária, minha visão de mundo mudou. A dedicação de todos os envolvidos e o impacto que isso tem na vida de tantas famílias me emocionam todos os dias. Fazer parte disso é um privilégio."`,
  
    `"Nunca imaginei que encontraríamos tanta ajuda num só lugar. A ONG nos acolheu com respeito e dignidade, oferecendo não só apoio material, mas também emocional. Hoje vivemos com mais esperança no coração."`,
  
    `"Ver minha filha sorrindo de novo, participando das atividades e criando novas amizades foi o maior presente que poderíamos receber. A ONG devolveu a nossa alegria como família, e isso não tem preço."`
  ];
  

export default function Testemunhos() {
  return (
    <section className="testemunhos-section">
      <h2 className="titulo-testemunhos">TESTEMUNHOS</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="meu-swiper"
      >
        {testemunhos.map((texto, index) => (
          <SwiperSlide key={index}>
            <p className="texto-testemunho">{texto}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
