import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import styles from './PostEditor.module.css';
import MarkdownToolbar from './MarkdownToolbar';
import ImageUpload from './ImageUpload';

export default function PostEditor({ post, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    author: 'Gabriel Ramos',
    tags: [],
    content: '',
    category: 'educacao'
  });

  const [tagInput, setTagInput] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
        slug: post.slug || '',
        author: post.author || 'Gabriel Ramos',
        tags: post.tags || [],
        content: post.content || '',
        category: post.category || 'educacao'
      });
    }
  }, [post]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-gerar slug baseado no título
    if (field === 'title' && !post) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleToolbarAction = (action, value) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let newText = '';
    let newCursorPos = start;

    switch (action) {
      case 'bold':
        newText = `**${selectedText || 'texto em negrito'}**`;
        newCursorPos = start + (selectedText ? newText.length : 2);
        break;
      case 'italic':
        newText = `*${selectedText || 'texto em itálico'}*`;
        newCursorPos = start + (selectedText ? newText.length : 1);
        break;
      case 'heading':
        newText = `## ${selectedText || 'Título'}`;
        newCursorPos = start + newText.length;
        break;
      case 'link':
        const url = value || 'https://exemplo.com';
        newText = `[${selectedText || 'texto do link'}](${url})`;
        newCursorPos = start + newText.length;
        break;
      case 'image':
        const imageUrl = value || 'https://exemplo.com/imagem.jpg';
        newText = `![${selectedText || 'descrição da imagem'}](${imageUrl})`;
        newCursorPos = start + newText.length;
        break;
      case 'code':
        newText = `\`${selectedText || 'código'}\``;
        newCursorPos = start + (selectedText ? newText.length : 1);
        break;
      case 'codeblock':
        newText = `\`\`\`javascript\n${selectedText || '// seu código aqui'}\n\`\`\``;
        newCursorPos = start + newText.length;
        break;
      case 'list':
        newText = `- ${selectedText || 'item da lista'}`;
        newCursorPos = start + newText.length;
        break;
      case 'quote':
        newText = `> ${selectedText || 'citação'}`;
        newCursorPos = start + newText.length;
        break;
      default:
        return;
    }

    const newContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end);

    setFormData(prev => ({
      ...prev,
      content: newContent
    }));

    // Restaurar foco e posição do cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Título e conteúdo são obrigatórios!');
      return;
    }
    onSave(formData);
  };

  const handleImageUpload = () => {
    setShowImageUpload(true);
  };

  const handleImageSelect = (imageUrl) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    const newText = `![${selectedText || 'Imagem'}](${imageUrl})`;
    const newContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end);

    setFormData(prev => ({
      ...prev,
      content: newContent
    }));

    // Restaurar foco e posição do cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorHeader}>
        <h2>{post ? 'Editar Post' : 'Novo Post'}</h2>
        <div className={styles.editorActions}>
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={styles.previewToggle}
          >
            {isPreviewMode ? 'Editor' : 'Preview'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.editorForm}>
        <div className={styles.metadataSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Digite o título do post"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Breve descrição do post"
            />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="url-do-post"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="educacao">Educação</option>
                <option value="metodologia">Metodologia</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="dicas">Dicas</option>
                <option value="reflexoes">Reflexões</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Tags</label>
            <div className={styles.tagsContainer}>
              <div className={styles.tagsList}>
                {formData.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className={styles.tagRemove}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className={styles.tagInput}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Adicionar tag"
                />
                <button type="button" onClick={handleAddTag}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentSection}>
          <label htmlFor="content-editor">Conteúdo *</label>
          
          {!isPreviewMode && (
            <MarkdownToolbar 
              onAction={handleToolbarAction} 
              onImageUpload={handleImageUpload}
            />
          )}

          <div className={styles.editorContainer}>
            {isPreviewMode ? (
              <div className={styles.preview}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  className={styles.markdownContent}
                >
                  {formData.content || '*Nenhum conteúdo para visualizar*'}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                id="content-editor"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Escreva o conteúdo do seu post em Markdown..."
                className={styles.contentEditor}
                required
              />
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveButton}>
            {post ? 'Atualizar Post' : 'Salvar Post'}
          </button>
        </div>
      </form>

      {showImageUpload && (
        <ImageUpload
          onImageSelect={handleImageSelect}
          onClose={() => setShowImageUpload(false)}
        />
      )}
    </div>
  );
}

