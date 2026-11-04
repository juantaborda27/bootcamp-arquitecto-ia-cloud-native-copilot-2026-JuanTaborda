import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/users';

  usersSignal = signal<User[]>([]);
  loadingSignal = signal<boolean>(false);
  errorSignal = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  loadUsers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.http.get<User[]>(this.apiUrl).pipe(
      catchError(err => {
        const msg = err.status === 0 
          ? 'No se pudo conectar con el servidor backend (FastAPI en :8000)'
          : `Error (${err.status}): ${err.message}`;
        this.errorSignal.set(msg);
        this.loadingSignal.set(false);
        return throwError(() => err);
      })
    ).subscribe((data: User[]) => {
      this.usersSignal.set(data);
      this.loadingSignal.set(false);
    });
  }

  getUserById(id: number): Observable<User> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError(err => {
        this.loadingSignal.set(false);
        const msg = err.status === 404 ? `Usuario con ID #${id} no encontrado` : 'Error al buscar el usuario';
        this.errorSignal.set(msg);
        return throwError(() => err);
      })
    );
  }

  createUser(user: User): Observable<User> {
    this.errorSignal.set(null);
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(() => this.loadUsers()),
      catchError(err => {
        const msg = err.error?.detail || err.error?.error || 'Error al guardar el usuario';
        this.errorSignal.set(msg);
        return throwError(() => err);
      })
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    this.errorSignal.set(null);
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      tap(() => this.loadUsers()),
      catchError(err => {
        const msg = err.error?.detail || err.error?.error || 'Error al actualizar el usuario';
        this.errorSignal.set(msg);
        return throwError(() => err);
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    this.errorSignal.set(null);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadUsers()),
      catchError(err => {
        const msg = err.error?.detail || 'Error al eliminar el usuario';
        this.errorSignal.set(msg);
        return throwError(() => err);
      })
    );
  }
}
