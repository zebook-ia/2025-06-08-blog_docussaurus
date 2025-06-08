import React, { useState, useRef } from 'react';
import styles from './ImageUpload.module.css';

export default function ImageUpload({ onImageSelect, onClose }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Carregar imagens existentes do localStorage
  React.useEffect(() => {
    const savedImages = localStorage.getItem('uploaded_images');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }
  }, []);

  const saveImages = (images) => {
    setUploadedImages(images);
    localStorage.setItem('uploaded_images', JSON.stringify(images));
  };

  const handleFileSelect = (files) => {
    setIsUploading(true);
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString()
          };
          
          const newImages = [imageData, ...uploadedImages];
          saveImages(newImages);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files);
  };

  const handleImageClick = (image) => {
    onImageSelect(image.url);
    onClose();
  };

  const handleDeleteImage = (imageId) => {
    if (confirm('Tem certeza que deseja excluir esta imagem?')) {
      const newImages = uploadedImages.filter(img => img.id !== imageId);
      saveImages(newImages);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Galeria de Imagens</h3>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.uploadSection}>
          <div
            className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className={styles.dropZoneContent}>
              <div className={styles.uploadIcon}>📁</div>
              <p>Clique aqui ou arraste imagens para fazer upload</p>
              <small>Formatos suportados: JPG, PNG, GIF, WebP</small>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </div>

        {isUploading && (
          <div className={styles.uploadingMessage}>
            Fazendo upload das imagens...
          </div>
        )}

        <div className={styles.imageGrid}>
          {uploadedImages.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Nenhuma imagem encontrada. Faça upload de algumas imagens para começar.</p>
            </div>
          ) : (
            uploadedImages.map((image) => (
              <div key={image.id} className={styles.imageCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={image.url}
                    alt={image.name}
                    className={styles.image}
                    onClick={() => handleImageClick(image)}
                  />
                  <div className={styles.imageOverlay}>
                    <button
                      onClick={() => handleImageClick(image)}
                      className={styles.selectButton}
                    >
                      Selecionar
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className={styles.deleteButton}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className={styles.imageInfo}>
                  <div className={styles.imageName} title={image.name}>
                    {image.name}
                  </div>
                  <div className={styles.imageSize}>
                    {formatFileSize(image.size)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

