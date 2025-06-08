import React from 'react';
import Layout from '@theme/Layout';
import styles from './social.module.css';

export default function SocialPage() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/professorgabrielramos',
      description: 'Acompanhe o dia a dia educacional e dicas rápidas',
      color: '#E4405F'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/gabriel-ramos-professor',
      description: 'Conecte-se profissionalmente e veja artigos sobre educação',
      color: '#0077B5'
    },
    {
      name: 'Facebook',
      icon: '👥',
      url: 'https://facebook.com/professorgabrielramos',
      description: 'Participe de discussões e eventos educacionais',
      color: '#1877F2'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/profgabrielramos',
      description: 'Reflexões rápidas e novidades do mundo educacional',
      color: '#1DA1F2'
    },
    {
      name: 'YouTube',
      icon: '🎥',
      url: 'https://youtube.com/@professorgabrielramos',
      description: 'Vídeos educacionais e palestras sobre metodologias',
      color: '#FF0000'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: 'https://wa.me/5511999999999',
      description: 'Entre em contato direto para dúvidas e colaborações',
      color: '#25D366'
    }
  ];

  return (
    <Layout
      title="Redes Sociais"
      description="Conecte-se com o Professor Gabriel Ramos nas redes sociais">
      <div className={styles.socialPage}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Conecte-se Comigo</h1>
            <p className={styles.subtitle}>
              Vamos construir juntos uma comunidade educacional mais forte e conectada
            </p>
          </header>

          <div className={styles.socialGrid}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                style={{ '--accent-color': social.color }}
              >
                <div className={styles.socialIcon}>
                  {social.icon}
                </div>
                <div className={styles.socialContent}>
                  <h3 className={styles.socialName}>{social.name}</h3>
                  <p className={styles.socialDescription}>{social.description}</p>
                </div>
                <div className={styles.socialArrow}>→</div>
              </a>
            ))}
          </div>

          <div className={styles.newsletter}>
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>📧 Newsletter Educacional</h2>
              <p className={styles.newsletterDescription}>
                Receba semanalmente as melhores dicas, recursos e reflexões sobre educação 
                diretamente no seu e-mail.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>
                  Inscrever-se
                </button>
              </div>
              <small className={styles.newsletterNote}>
                * Sem spam, apenas conteúdo de qualidade sobre educação
              </small>
            </div>
          </div>

          <div className={styles.contact}>
            <h2 className={styles.contactTitle}>💌 Outras Formas de Contato</h2>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div>
                  <h4>E-mail</h4>
                  <p>contato@professorgabrielramos.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>🏫</div>
                <div>
                  <h4>Palestras e Workshops</h4>
                  <p>Disponível para eventos educacionais</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>🤝</div>
                <div>
                  <h4>Colaborações</h4>
                  <p>Aberto a parcerias educacionais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

