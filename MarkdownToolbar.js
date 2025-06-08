import React from 'react';
import styles from './MarkdownToolbar.module.css';

export default function MarkdownToolbar({ onAction, onImageUpload }) {
  const tools = [
    { id: 'bold', label: 'B', title: 'Negrito', action: 'bold' },
    { id: 'italic', label: 'I', title: 'Itálico', action: 'italic' },
    { id: 'heading', label: 'H', title: 'Título', action: 'heading' },
    { id: 'link', label: '🔗', title: 'Link', action: 'link' },
    { id: 'image', label: '🖼️', title: 'Imagem', action: 'image' },
    { id: 'upload', label: '📁', title: 'Upload de Imagem', action: 'upload' },
    { id: 'code', label: '</>', title: 'Código inline', action: 'code' },
    { id: 'codeblock', label: '{ }', title: 'Bloco de código', action: 'codeblock' },
    { id: 'list', label: '•', title: 'Lista', action: 'list' },
    { id: 'quote', label: '"', title: 'Citação', action: 'quote' },
  ];

  const handleToolClick = (action) => {
    if (action === 'upload') {
      onImageUpload();
    } else if (action === 'link') {
      const url = prompt('Digite a URL do link:');
      if (url) {
        onAction(action, url);
      }
    } else if (action === 'image') {
      const imageUrl = prompt('Digite a URL da imagem:');
      if (imageUrl) {
        onAction(action, imageUrl);
      }
    } else {
      onAction(action);
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolGroup}>
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className={styles.toolButton}
            onClick={() => handleToolClick(tool.action)}
            title={tool.title}
          >
            {tool.label}
          </button>
        ))}
      </div>
      
      <div className={styles.toolGroup}>
        <button
          type="button"
          className={styles.toolButton}
          onClick={() => onAction('help')}
          title="Ajuda Markdown"
        >
          ?
        </button>
      </div>
    </div>
  );
}

