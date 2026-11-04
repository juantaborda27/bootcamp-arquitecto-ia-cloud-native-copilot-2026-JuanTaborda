import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserListComponent],
  template: `
    <div class="app-container">
      <div class="ambient-light"></div>
      
      <header class="header">
        <div class="badge-tag">Angular 22 SPA + Signals</div>
        <h1>Global EDB — Directorio de Usuarios</h1>
        <p>Frontend alternativo desacoplado con arquitectura modular y soporte CRUD completo.</p>
      </header>

      <main class="grid-layout">
        <app-user-form
          [submitting]="submitting"
          [successMessage]="successMessage"
          [errorMessage]="userService.errorSignal()"
          [editingUser]="editingUser"
          (userSaved)="handleUserSaved($event)"
          (cancelEdit)="editingUser = null"
        ></app-user-form>

        <app-user-list
          [users]="filteredUsers()"
          [loading]="userService.loadingSignal()"
          [isFilteredById]="isFilteredById"
          (searchFilterChange)="searchQuery = $event"
          (searchByIdTriggered)="handleSearchById($event)"
          (searchResetTriggered)="handleResetSearch()"
          (userEditTriggered)="editingUser = $event"
          (userDeleted)="handleUserDeleted($event)"
        ></app-user-list>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background-color: #0b0f19; color: #f1f5f9; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
    .app-container { position: relative; max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem; z-index: 1; }
    .ambient-light { position: absolute; top: 5%; left: 30%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%); filter: blur(60px); pointer-events: none; z-index: -1; }
    .header { text-align: center; margin-bottom: 3rem; }
    .badge-tag { display: inline-block; padding: 0.35rem 0.9rem; border-radius: 9999px; background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-bottom: 1rem; }
    .header h1 { font-size: 2.25rem; font-weight: 800; background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
    .header p { color: #94a3b8; font-size: 1rem; }
    .grid-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; }
    @media (max-width: 868px) { .grid-layout { grid-template-columns: 1fr; } }
  `]
})
export class AppComponent implements OnInit {
  searchQuery: string = '';
  submitting: boolean = false;
  successMessage: string | null = null;
  isFilteredById: boolean = false;
  editingUser: User | null = null;

  filteredUsers = computed(() => {
    const list = this.userService.usersSignal();
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return list;
    return list.filter(u => 
      u.username.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q)
    );
  });

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  handleUserSaved(user: User): void {
    this.submitting = true;
    this.successMessage = null;

    if (this.editingUser && this.editingUser.id) {
      this.userService.updateUser(this.editingUser.id, user).subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage = `Usuario #${this.editingUser?.id} actualizado exitosamente`;
          this.editingUser = null;
          setTimeout(() => this.successMessage = null, 4000);
        },
        error: () => this.submitting = false
      });
    } else {
      this.userService.createUser(user).subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage = `Usuario "${user.username}" creado exitosamente`;
          setTimeout(() => this.successMessage = null, 4000);
        },
        error: () => this.submitting = false
      });
    }
  }

  handleSearchById(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.isFilteredById = true;
        this.userService.usersSignal.set([user]);
      }
    });
  }

  handleResetSearch(): void {
    this.isFilteredById = false;
    this.searchQuery = '';
    this.userService.loadUsers();
  }

  handleUserDeleted(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        if (this.editingUser && this.editingUser.id === id) {
          this.editingUser = null;
        }
      }
    });
  }
}
