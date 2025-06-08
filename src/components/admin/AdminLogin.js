import React, { useState } from 'react';
import styles from './AdminLogin.module.css';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulação de autenticação simples
    // Em produção, isso deveria ser uma chamada para uma API real
    if (username === 'admin' && password === 'admin123') {
      setTimeout(() => {
        onLogin(true);
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Credenciais inválidas. Use admin/admin123');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Área Administrativa</h2>
        <p>Faça login para acessar o painel de administração</p>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className={styles.loginHint}>
          <small>Dica: Use admin/admin123 para acessar</small>
        </div>
      </div>
    </div>
  );
}

