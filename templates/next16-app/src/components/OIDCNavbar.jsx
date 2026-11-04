import { useState, useEffect } from 'react';
import { getOIDCSession, loginOIDC, logoutOIDC } from '../services/auth';

export default function OIDCNavbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(getOIDCSession());
  }, []);

  const handleLogin = async (role) => {
    const newSession = await loginOIDC('diego_tique', role);
    setSession(newSession);
  };

  const handleLogout = () => {
    logoutOIDC();
    setSession(null);
  };

  return (
    <div className="oidc-navbar">
      <div className="oidc-brand">
        <span className="oidc-logo">🔐 OIDC Auth</span>
        {session ? (
          <span className={`role-badge ${session.user.role === 'Admin' ? 'admin' : 'user'}`}>
            {session.user.role === 'Admin' ? '🛡️ Rol: Admin' : '👤 Rol: User'}
          </span>
        ) : (
          <span className="role-badge guest">⚪ No Autenticado</span>
        )}
      </div>

      <div className="oidc-actions">
        {session ? (
          <>
            <span className="user-email">{session.user.email}</span>
            <button className="btn-logout" onClick={handleLogout}>
              🚪 Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button className="btn-login-user" onClick={() => handleLogin('User')}>
              🔑 Iniciar como Usuario
            </button>
            <button className="btn-login-admin" onClick={() => handleLogin('Admin')}>
              🛡️ Iniciar como Admin
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .oidc-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.25rem;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          margin-bottom: 2rem;
          backdrop-filter: blur(12px);
        }
        .oidc-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .oidc-logo {
          font-weight: 700;
          font-size: 0.95rem;
          color: #f8fafc;
        }
        .role-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
        }
        .role-badge.admin {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
        }
        .role-badge.user {
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.4);
        }
        .role-badge.guest {
          background: rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          border: 1px solid rgba(148, 163, 184, 0.3);
        }
        .oidc-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .user-email {
          font-size: 0.825rem;
          color: #94a3b8;
        }
        .btn-login-user {
          padding: 0.45rem 0.85rem;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-login-admin {
          padding: 0.45rem 0.85rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-logout {
          padding: 0.45rem 0.85rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
