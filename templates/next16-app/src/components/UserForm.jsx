import { useState, useEffect } from 'react';

export default function UserForm({ onUserSaved, editingUser, onCancelEdit, submitting }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username || '');
      setEmail(editingUser.email || '');
    } else {
      setUsername('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;
    onUserSaved({ username, email }, () => {
      setUsername('');
      setEmail('');
    });
  };

  return (
    <section className="glass-card">
      <div className="card-header">
        <div className="icon-bubble">{editingUser ? '✏️' : '⚡'}</div>
        <div>
          <h2>{editingUser ? `Editar Usuario #${editingUser.id}` : 'Registrar Usuario'}</h2>
          <p className="subtitle">
            {editingUser ? 'Modifica los datos existentes' : 'Crea una nueva entidad en el backend'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ej. diego_tique"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ej. diego@globaledb.com"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting 
              ? (editingUser ? 'Actualizando...' : 'Guardando...') 
              : (editingUser ? 'Actualizar Usuario' : 'Guardar Usuario')}
          </button>

          {editingUser && (
            <button type="button" onClick={onCancelEdit} className="btn-cancel">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
