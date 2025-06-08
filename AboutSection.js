import React from 'react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const features = [
    {
      icon: '🎓',
      title: 'Educação Inovadora',
      description: 'Explorando metodologias modernas e tecnologias educacionais para transformar o aprendizado.'
    },
    {
      icon: '💡',
      title: 'Dicas Práticas',
      description: 'Compartilhando estratégias testadas e aprovadas para melhorar a experiência educacional.'
    },
    {
      icon: '🤝',
      title: 'Comunidade',
      description: 'Construindo uma rede de educadores comprometidos com a excelência no ensino.'
    },
    {
      icon: '📚',
      title: 'Recursos Educacionais',
      description: 'Disponibilizando materiais e ferramentas para apoiar educadores em sua jornada.'
    }
  ];

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sobre o Professor Gabriel Ramos</h2>
          <p className={styles.subtitle}>
            Dedicado à transformação da educação através da inovação e do compartilhamento de conhecimento
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.bio}>
            <p>
              Com mais de 10 anos de experiência em educação, o Professor Gabriel Ramos é apaixonado 
              por encontrar novas formas de engajar estudantes e apoiar colegas educadores. Especialista 
              em metodologias ativas e tecnologia educacional, Gabriel acredita que a educação é a 
              ferramenta mais poderosa para transformar vidas e sociedades.
            </p>
            <p>
              Através deste blog, ele compartilha insights, experiências e recursos que podem ajudar 
              outros educadores a aprimorar suas práticas pedagógicas e criar ambientes de aprendizagem 
              mais eficazes e inclusivos.
            </p>
          </div>

          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

