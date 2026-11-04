import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="glass-card">
      <div class="card-header">
        <div class="icon-bubble">🔍</div>
        <div>
          <h2>Directorio de Usuarios</h2>
          <p class="subtitle">Filtro reactivo, búsqueda por ID, edición y eliminación</p>
        </div>
      </div>

      <div class="search-bar-container">
        <div class="search-input-wrapper">
          <span class="search-icon">🔎</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (ngModelChange)="onSearchChange()"
            placeholder="Buscar por usuario o correo..." 
            class="search-input"
          />
        </div>

        <div class="search-id-wrapper">
          <input 
            type="number" 
            [(ngModel)]="searchId" 
            placeholder="ID #" 
            class="search-id-input"
          />
          <button (click)="onSearchById()" class="btn-secondary">Buscar ID</button>
          <button *ngIf="isFilteredById" (click)="onResetSearch()" class="btn-reset" title="Restablecer lista">✕</button>
        </div>
      </div>

      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <span>Cargando datos desde la API REST...</span>
      </div>

      <div *ngIf="!loading" class="user-list">
        <div *ngIf="users.length === 0" class="empty-state">
          <p>No se encontraron usuarios que coincidan con la búsqueda.</p>
        </div>

        <div *ngFor="let u of users" class="user-item">
          <div class="user-avatar">
            {{ u.username.charAt(0).toUpperCase() }}
          </div>
          <div class="user-info">
            <h3>{{ u.username }}</h3>
            <span class="user-email">{{ u.email }}</span>
          </div>
          <div class="user-actions">
            <span class="user-tag">#{{ u.id }}</span>
            <button (click)="onEditUser(u)" class="btn-edit" title="Editar usuario">✏️</button>
            <button *ngIf="u.id" (click)="onDeleteUser(u.id)" class="btn-delete" title="Eliminar usuario">🗑️</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .glass-card { background: rgba(30, 41, 59, 0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }
    .card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; }
    .icon-bubble { width: 44px; height: 44px; border-radius: 12px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
    .card-header h2 { font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin: 0; }
    .subtitle { font-size: 0.825rem; color: #94a3b8; margin: 0.15rem 0 0 0; }
    .search-bar-container { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
    .search-input-wrapper { position: relative; width: 100%; }
    .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 0.9rem; color: #64748b; }
    .search-input { width: 100%; padding: 0.7rem 1rem 0.7rem 2.5rem; border-radius: 10px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.12); color: #f8fafc; font-size: 0.9rem; outline: none; box-sizing: border-box; }
    .search-input:focus { border-color: #38bdf8; }
    .search-id-wrapper { display: flex; gap: 0.5rem; }
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
    .loading-state { display: flex; align-items: center; gap: 0.75rem; padding: 2rem; justify-content: center; color: #38bdf8; }
    .spinner { width: 20px; height: 20px; border: 2px solid rgba(56, 189, 248, 0.3); border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .empty-state { text-align: center; padding: 2rem 1rem; color: #64748b; font-size: 0.9rem; }
  `]
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() loading: boolean = false;
  @Input() isFilteredById: boolean = false;

  @Output() searchFilterChange = new EventEmitter<string>();
  @Output() searchByIdTriggered = new EventEmitter<number>();
  @Output() searchResetTriggered = new EventEmitter<void>();
  @Output() userEditTriggered = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<number>();

  searchQuery: string = '';
  searchId: number | null = null;

  onSearchChange(): void {
    this.searchFilterChange.emit(this.searchQuery);
  }

  onSearchById(): void {
    if (this.searchId) {
      this.searchByIdTriggered.emit(this.searchId);
    }
  }

  onResetSearch(): void {
    this.searchId = null;
    this.searchQuery = '';
    this.searchResetTriggered.emit();
  }

  onEditUser(user: User): void {
    this.userEditTriggered.emit(user);
  }

  onDeleteUser(id: number): void {
    this.userDeleted.emit(id);
  }
}
