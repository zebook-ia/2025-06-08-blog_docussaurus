import React, { useState } from 'react';
import styles from './PostList.module.css';

export default function PostList({ posts, onEdit, onDelete, onExport, onNewPost }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filtrar e ordenar posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'category':
          aValue = a.category || '';
          bValue = b.category || '';
          break;
        case 'date':
        default:
          aValue = new Date(a.updatedAt || a.createdAt);
          bValue = new Date(b.updatedAt || b.createdAt);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const getWordCount = (content) => {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  };

  const getReadingTime = (content) => {
    const wordCount = getWordCount(content);
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min de leitura`;
  };

  return (
    <div className={styles.postList}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>Gerenciar Posts</h2>
          <p>{filteredPosts.length} de {posts.length} posts</p>
        </div>
        <button onClick={onNewPost} className={styles.newPostButton}>
          + Novo Post
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Todas as categorias</option>
            <option value="educacao">Educação</option>
            <option value="metodologia">Metodologia</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="dicas">Dicas</option>
            <option value="reflexoes">Reflexões</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className={styles.filterSelect}
          >
            <option value="date-desc">Mais recentes</option>
            <option value="date-asc">Mais antigos</option>
            <option value="title-asc">Título A-Z</option>
            <option value="title-desc">Título Z-A</option>
            <option value="category-asc">Categoria A-Z</option>
          </select>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className={styles.emptyState}>
          {posts.length === 0 ? (
            <div>
              <h3>Nenhum post encontrado</h3>
              <p>Comece criando seu primeiro post!</p>
              <button onClick={onNewPost} className={styles.emptyStateButton}>
                Criar Primeiro Post
              </button>
            </div>
          ) : (
            <div>
              <h3>Nenhum post corresponde aos filtros</h3>
              <p>Tente ajustar os termos de busca ou filtros.</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.postMeta}>
                  <span className={styles.category}>
                    {getCategoryLabel(post.category)}
                  </span>
                  <span className={styles.date}>
                    {formatDate(post.updatedAt || post.createdAt)}
                  </span>
                </div>
                <div className={styles.postActions}>
                  <button
                    onClick={() => onEdit(post)}
                    className={styles.actionButton}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onExport(post)}
                    className={styles.actionButton}
                    title="Exportar"
                  >
                    📥
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className={styles.actionButton}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                {post.description && (
                  <p className={styles.postDescription}>{post.description}</p>
                )}
                
                <div className={styles.postStats}>
                  <span>{getWordCount(post.content)} palavras</span>
                  <span>{getReadingTime(post.content)}</span>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className={styles.tagMore}>
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.postFooter}>
                <span className={styles.author}>Por {post.author}</span>
                <span className={styles.slug}>/{post.slug}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

