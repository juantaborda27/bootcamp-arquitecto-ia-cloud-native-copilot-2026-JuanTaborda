import { useState, useEffect } from 'react';
import Head from 'next/head';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import OIDCNavbar from '../components/OIDCNavbar';
import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser } from '../services/api';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchId, setSearchId] = useState('');
  const [isFilteredById, setIsFilteredById] = useState(false);

  const loadUsersData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsersData();
  }, []);

  const handleUserSaved = async (userData, resetFormCallback) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData);
        setSuccess(`Usuario #${editingUser.id} actualizado exitosamente`);
        setEditingUser(null);
      } else {
        await createUser(userData);
        setSuccess(`Usuario "${userData.username}" registrado exitosamente`);
      }
      resetFormCallback();
      await loadUsersData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearchById = async () => {
    if (!searchId) return;
    setLoading(true);
    setError(null);
    try {
      const singleUser = await fetchUserById(searchId);
      setUsers([singleUser]);
      setIsFilteredById(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSearch = () => {
    setSearchId('');
    setSearchQuery('');
    setIsFilteredById(false);
    loadUsersData();
  };

  const handleUserDeleted = async (id) => {
    setError(null);
    try {
      await deleteUser(id);
      setSuccess(`Usuario #${id} eliminado`);
      if (editingUser && editingUser.id === id) setEditingUser(null);
      await loadUsersData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (u.username && u.username.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <Head>
        <title>Global EDB — Next.js 16 App</title>
        <meta name="description" content="Frontend reactivo Next.js 16 para consumo desacoplado de API REST" />
      </Head>

      <div className="container">
        <OIDCNavbar />

        <header className="header">
          <span className="badge">Next.js 16 + React 19</span>
          <h1>Global EDB — Directorio de Usuarios</h1>
          <p>Frontend estructurado de forma modular con soporte CRUD completo (Crear, Buscar, Editar, Eliminar).</p>
        </header>

        {success && <div className="alert alert-success">✓ {success}</div>}
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <main className="grid">
          <UserForm 
            onUserSaved={handleUserSaved} 
            editingUser={editingUser}
            onCancelEdit={() => setEditingUser(null)}
            submitting={submitting} 
          />

          <UserList
            users={filteredUsers}
            loading={loading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchId={searchId}
            onSearchIdChange={setSearchId}
            onSearchById={handleSearchById}
            onResetSearch={handleResetSearch}
            isFilteredById={isFilteredById}
            onEditUser={(user) => setEditingUser(user)}
            onDeleteUser={handleUserDeleted}
          />
        </main>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: #0b0f19; color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }
        .container { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem; }
        .header { text-align: center; margin-bottom: 2.5rem; }
        .badge { display: inline-block; padding: 0.35rem 0.9rem; border-radius: 9999px; background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.75rem; }
        .header h1 { font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.5rem; }
        .header p { color: #94a3b8; font-size: 1rem; }
        .grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; }
        @media (max-width: 868px) { .grid { grid-template-columns: 1fr; } }
        .glass-card { background: rgba(30, 41, 59, 0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }
        .card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; }
        .icon-bubble { width: 44px; height: 44px; border-radius: 12px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
        .card-header h2 { font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin: 0; }
        .subtitle { font-size: 0.825rem; color: #94a3b8; margin: 0.15rem 0 0 0; }
        .user-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem; }
        .form-group input { width: 100%; padding: 0.75rem 1rem; border-radius: 10px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.12); color: #f8fafc; font-size: 0.95rem; outline: none; }
        .form-group input:focus { border-color: #38bdf8; }
        .button-group { display: flex; gap: 0.5rem; }
        .btn-primary { flex: 1; padding: 0.85rem; border-radius: 10px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; border: none; font-weight: 600; font-size: 0.95rem; cursor: pointer; }
        .btn-cancel { padding: 0.85rem 1.2rem; border-radius: 10px; background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.1); font-weight: 600; font-size: 0.9rem; cursor: pointer; }
        .search-container { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
        .search-wrapper { position: relative; width: 100%; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 0.9rem; color: #64748b; }
        .search-input { width: 100%; padding: 0.7rem 1rem 0.7rem 2.5rem; border-radius: 10px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.12); color: #f8fafc; font-size: 0.9rem; outline: none; }
        .search-id-group { display: flex; gap: 0.5rem; }
        .search-id-input { width: 100px; padding: 0.6rem 0.75rem; border-radius: 8px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.12); color: #f8fafc; font-size: 0.85rem; }
        .btn-secondary { padding: 0.6rem 1rem; border-radius: 8px; background: rgba(51, 65, 85, 0.8); color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.1); font-size: 0.85rem; font-weight: 600; cursor: pointer; }
        .btn-reset { padding: 0.6rem 0.8rem; border-radius: 8px; background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); cursor: pointer; }
        .user-list { display: flex; flex-direction: column; gap: 0.75rem; max-height: 400px; overflow-y: auto; }
        .user-item { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1rem; border-radius: 12px; background: rgba(15, 23, 42, 0.5); border: 1px solid rgba(255, 255, 255, 0.05); }
        .user-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%); color: #ffffff; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .user-info { flex: 1; }
        .user-info h3 { font-size: 0.95rem; font-weight: 600; color: #f1f5f9; margin: 0; }
        .user-email { font-size: 0.8rem; color: #94a3b8; }
        .user-actions { display: flex; align-items: center; gap: 0.5rem; }
        .user-tag { font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 6px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .btn-edit { background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; padding: 0.3rem 0.5rem; border-radius: 6px; cursor: pointer; }
        .btn-edit:hover { background: rgba(56, 189, 248, 0.3); }
        .btn-delete { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 0.3rem 0.5rem; border-radius: 6px; cursor: pointer; }
        .btn-delete:hover { background: rgba(239, 68, 68, 0.3); }
        .alert { margin-bottom: 1.5rem; padding: 0.85rem 1rem; border-radius: 10px; font-size: 0.875rem; }
        .alert-success { background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7; }
        .alert-error { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; }
        .loading-state { display: flex; align-items: center; gap: 0.75rem; padding: 2rem; justify-content: center; color: #38bdf8; }
        .spinner { width: 20px; height: 20px; border: 2px solid rgba(56, 189, 248, 0.3); border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .empty-state { text-align: center; padding: 2rem 1rem; color: #64748b; font-size: 0.9rem; }
      `}</style>
    </>
  );
}