import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminDashboard from '../../components/admin/AdminDashboard';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth') === 'true';
    setAuthenticated(isAuth);
  }, []);

  const handleLogin = (status) => {
    setAuthenticated(status);
    if (status) {
      localStorage.setItem('admin_auth', 'true');
    } else {
      localStorage.removeItem('admin_auth');
    }
  };

  return (
    <Layout title="Admin" description="Área administrativa do blog">
      {authenticated ? (
        <AdminDashboard onLogout={() => handleLogin(false)} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </Layout>
  );
}
