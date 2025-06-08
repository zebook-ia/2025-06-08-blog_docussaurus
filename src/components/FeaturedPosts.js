import React, { useState, useEffect } from 'react';
import styles from './FeaturedPosts.module.css';

export default function FeaturedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Carregar posts do localStorage
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      const allPosts = JSON.parse(savedPosts);
      // Pegar os 3 posts mais recentes
      const recentPosts = allPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setPosts(recentPosts);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryLabel = (category) => {
    const categories = {
      'educacao': 'Educação',
      'metodologia': 'Metodologia',
      'tecnologia': 'Tecnologia',
      'dicas': 'Dicas',
      'reflexoes': 'Reflexões'
    };
    return categories[category] || category;
  };

  const getExcerpt = (content, maxLength = 150) => {
    const plainText = content.replace(/[#*`\[\]()]/g, '').trim();
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
  };

  if (posts.length === 0) {
    return (
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Posts em Destaque</h2>
            <p className={styles.subtitle}>
              Ainda não há posts publicados. Acesse a área administrativa para criar o primeiro post!
            </p>
          </div>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <p>Nenhum post encontrado</p>
            <a href="/admin" className={styles.adminLink}>
              Ir para Administração
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Posts em Destaque</h2>
          <p className={styles.subtitle}>
            Confira os artigos mais recentes sobre educação, metodologias e tecnologia
          </p>
        </div>

        <div className={styles.postsGrid}>
          {posts.map((post, index) => (
            <article key={post.id} className={`${styles.postCard} ${index === 0 ? styles.featured : ''}`}>
              <div className={styles.postHeader}>
                <span className={styles.category}>
                  {getCategoryLabel(post.category)}
                </span>
                <time className={styles.date}>
                  {formatDate(post.createdAt)}
                </time>
              </div>

              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>
                  <a href={`/blog/${post.slug}`}>
                    {post.title}
                  </a>
                </h3>
                
                {post.description && (
                  <p className={styles.postDescription}>
                    {post.description}
                  </p>
                )}
                
                <p className={styles.postExcerpt}>
                  {getExcerpt(post.content)}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.postFooter}>
                <span className={styles.author}>Por {post.author}</span>
                <a href={`/blog/${post.slug}`} className={styles.readMore}>
                  Ler mais →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="/blog" className={styles.viewAllButton}>
            Ver Todos os Posts
          </a>
        </div>
      </div>
    </section>
  );
}

