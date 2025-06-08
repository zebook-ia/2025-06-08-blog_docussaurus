import React, { useState, useEffect } from 'react';
import PostEditor from './PostEditor';
import PostList from './PostList';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    // Carregar posts existentes do localStorage
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('blog_posts', JSON.stringify(newPosts));
  };

  const handleSavePost = (postData) => {
    const newPost = {
      id: editingPost ? editingPost.id : Date.now().toString(),
      ...postData,
      createdAt: editingPost ? editingPost.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let newPosts;
    if (editingPost) {
      newPosts = posts.map(post => post.id === editingPost.id ? newPost : post);
    } else {
      newPosts = [newPost, ...posts];
    }

    savePosts(newPosts);
    setEditingPost(null);
    setActiveTab('posts');
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setActiveTab('editor');
  };

  const handleDeletePost = (postId) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      const newPosts = posts.filter(post => post.id !== postId);
      savePosts(newPosts);
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setActiveTab('editor');
  };

  const handleExportPost = (post) => {
    const markdownContent = `---
title: ${post.title}
description: ${post.description}
slug: ${post.slug}
authors: [${post.author}]
tags: [${post.tags.join(', ')}]
date: ${post.createdAt}
---

${post.content}`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${post.slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Painel Administrativo</h1>
        <div className={styles.headerActions}>
          <span>Bem-vindo, Admin!</span>
          <button onClick={onLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>

      <nav className={styles.tabNav}>
        <button
          className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts ({posts.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'editor' ? styles.active : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          {editingPost ? 'Editar Post' : 'Novo Post'}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Configurações
        </button>
      </nav>

      <main className={styles.content}>
        {activeTab === 'posts' && (
          <PostList
            posts={posts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onExport={handleExportPost}
            onNewPost={handleNewPost}
          />
        )}
        
        {activeTab === 'editor' && (
          <PostEditor
            post={editingPost}
            onSave={handleSavePost}
            onCancel={() => {
              setEditingPost(null);
              setActiveTab('posts');
            }}
          />
        )}
        
        {activeTab === 'settings' && (
          <div className={styles.settings}>
            <h2>Configurações do Blog</h2>
            <p>Funcionalidades de configuração serão implementadas aqui.</p>
            <div className={styles.settingsSection}>
              <h3>Estatísticas</h3>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{posts.length}</span>
                  <span className={styles.statLabel}>Posts Publicados</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>
                    {posts.reduce((acc, post) => acc + (post.content?.length || 0), 0)}
                  </span>
                  <span className={styles.statLabel}>Caracteres Escritos</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

