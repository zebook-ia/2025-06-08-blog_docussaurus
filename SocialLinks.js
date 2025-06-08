import React from 'react';
import styles from './SocialLinks.module.css';

export default function SocialLinks() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/professorgabrielramos',
      color: '#E4405F'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/gabriel-ramos-professor',
      color: '#0077B5'
    },
    {
      name: 'Facebook',
      icon: '👥',
      url: 'https://facebook.com/professorgabrielramos',
      color: '#1877F2'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/profgabrielramos',
      color: '#1DA1F2'
    }
  ];

  return (
    <section className={styles.socialLinks}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Vamos nos Conectar!</h2>
          <p className={styles.subtitle}>
            Siga-me nas redes sociais para mais conteúdo educacional
          </p>
        </div>

        <div className={styles.linksGrid}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              style={{ '--social-color': social.color }}
            >
              <div className={styles.socialIcon}>
                {social.icon}
              </div>
              <span className={styles.socialName}>{social.name}</span>
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="/social" className={styles.ctaButton}>
            Ver Todas as Redes Sociais
          </a>
        </div>
      </div>
    </section>
  );
}

