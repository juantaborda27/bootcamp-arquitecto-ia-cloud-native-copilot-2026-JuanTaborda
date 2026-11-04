import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="glass-card">
      <div class="card-header">
        <div class="icon-bubble">{{ editingUser ? '✏️' : '⚡' }}</div>
        <div>
          <h2>{{ editingUser ? 'Editar Usuario #' + editingUser.id : 'Registrar Usuario' }}</h2>
          <p class="subtitle">{{ editingUser ? 'Modifica los datos del usuario seleccionado' : 'Agrega una nueva entidad al sistema backend' }}</p>
        </div>
      </div>

      <form (ngSubmit)="onSubmit()" class="user-form">
        <div class="form-group">
          <label for="username">Nombre de usuario</label>
          <input 
            id="username"
            [(ngModel)]="user.username" 
            name="username" 
            placeholder="ej. diego_tique"
            required 
          />
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input 
            id="email"
            [(ngModel)]="user.email" 
            name="email" 
            type="email" 
            placeholder="ej. diego@globaledb.com"
            required 
          />
        </div>

        <div class="button-group">
          <button type="submit" [disabled]="submitting" class="btn-primary">
            <span *ngIf="!submitting">{{ editingUser ? 'Actualizar en Angular' : 'Guardar en Angular' }}</span>
            <span *ngIf="submitting">{{ editingUser ? 'Actualizando...' : 'Guardando...' }}</span>
          </button>
          
          <button *ngIf="editingUser" type="button" (click)="onCancel()" class="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>

      <div *ngIf="successMessage" class="alert alert-success">
        ✓ {{ successMessage }}
      </div>
      <div *ngIf="errorMessage" class="alert alert-error">
        ⚠️ {{ errorMessage }}
      </div>
    </section>
  `,
  styles: [`
    .glass-card { background: rgba(30, 41, 59, 0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }
    .card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; }
    .icon-bubble { width: 44px; height: 44px; border-radius: 12px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
    .card-header h2 { font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin: 0; }
    .subtitle { font-size: 0.825rem; color: #94a3b8; margin: 0.15rem 0 0 0; }
    .user-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem; }
    .form-group input { width: 100%; padding: 0.75rem 1rem; border-radius: 10px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.12); color: #f8fafc; font-size: 0.95rem; outline: none; box-sizing: border-box; }
    .form-group input:focus { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2); }
    .button-group { display: flex; gap: 0.5rem; }
    .btn-primary { flex: 1; padding: 0.85rem; border-radius: 10px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; border: none; font-weight: 600; font-size: 0.95rem; cursor: pointer; }
    .btn-cancel { padding: 0.85rem 1.2rem; border-radius: 10px; background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.1); font-weight: 600; font-size: 0.9rem; cursor: pointer; }
    .alert { margin-top: 1rem; padding: 0.85rem 1rem; border-radius: 10px; font-size: 0.875rem; }
    .alert-success { background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7; }
    .alert-error { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; }
  `]
})
export class UserFormComponent implements OnChanges {
  @Input() submitting: boolean = false;
  @Input() successMessage: string | null = null;
  @Input() errorMessage: string | null = null;
  @Input() editingUser: User | null = null;

  @Output() userSaved = new EventEmitter<User>();
  @Output() cancelEdit = new EventEmitter<void>();

  user: User = { username: '', email: '' };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingUser']) {
      if (this.editingUser) {
        this.user = { ...this.editingUser };
      } else {
        this.user = { username: '', email: '' };
      }
    }
  }

  onSubmit(): void {
    if (!this.user.username.trim() || !this.user.email.trim()) return;
    this.userSaved.emit({ ...this.user });
  }

  onCancel(): void {
    this.user = { username: '', email: '' };
    this.cancelEdit.emit();
  }
}
