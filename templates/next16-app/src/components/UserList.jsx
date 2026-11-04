export default function UserList({
  users,
  loading,
  searchQuery,
  onSearchChange,
  searchId,
  onSearchIdChange,
  onSearchById,
  onResetSearch,
  isFilteredById,
  onEditUser,
  onDeleteUser,
}) {
  return (
    <section className="glass-card">
      <div className="card-header">
        <div className="icon-bubble">🔍</div>
        <div>
          <h2>Directorio de Usuarios</h2>
          <p className="subtitle">Búsqueda reactiva, edición y eliminación</p>
        </div>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por usuario o email..."
            className="search-input"
          />
        </div>

        <div className="search-id-group">
          <input
            type="number"
            value={searchId}
            onChange={(e) => onSearchIdChange(e.target.value)}
            placeholder="ID #"
            className="search-id-input"
          />
          <button onClick={onSearchById} className="btn-secondary">Buscar</button>
          {isFilteredById && (
            <button onClick={onResetSearch} className="btn-reset" title="Restablecer">✕</button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <span>Cargando datos desde la API...</span>
        </div>
      ) : (
        <div className="user-list">
          {users.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron usuarios que coincidan.</p>
            </div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="user-item">
                <div className="user-avatar">
                  {u.username ? u.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-info">
                  <h3>{u.username}</h3>
                  <span className="user-email">{u.email}</span>
                </div>
                <div className="user-actions">
                  <span className="user-tag">#{u.id}</span>
                  <button onClick={() => onEditUser(u)} className="btn-edit" title="Editar usuario">✏️</button>
                  <button onClick={() => onDeleteUser(u.id)} className="btn-delete" title="Eliminar usuario">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
