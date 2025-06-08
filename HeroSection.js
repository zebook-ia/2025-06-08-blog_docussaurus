import React from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Professor <span className={styles.highlight}>Gabriel Ramos</span>
            </h1>
            <p className={styles.subtitle}>
              Compartilhando conhecimento e experiências em educação
            </p>
            <p className={styles.description}>
              Bem-vindo ao meu espaço digital! Aqui você encontrará reflexões sobre metodologias 
              de ensino, dicas para educadores, insights sobre tecnologia educacional e muito mais. 
              Vamos juntos transformar a educação!
            </p>
            <div className={styles.actions}>
              <a href="/blog" className={styles.primaryButton}>
                Explorar Blog
              </a>
              <a href="/social" className={styles.secondaryButton}>
                Redes Sociais
              </a>
            </div>
          </div>
          <div className={styles.imageContent}>
            <div className={styles.profileImage}>
              <div className={styles.imagePlaceholder}>
                👨‍🏫
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

