import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppUser {
  name: string;
  email: string;
}

const STORAGE_KEY = 'palate_mock_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<AppUser | null>(this.loadUser());
  readonly user$ = this.userSubject.asObservable();

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  get currentUser(): AppUser | null {
    return this.userSubject.value;
  }

  /**
   * MOCK login. Accepts any well-formed email + non-empty password.
   * Replace this method's body with a real Supabase auth call later —
   * nothing outside AuthService needs to change.
   */
  login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!this.isValidEmail(email)) {
          resolve({ success: false, error: 'Enter a valid email address.' });
          return;
        }
        if (!password) {
          resolve({ success: false, error: 'Enter your password.' });
          return;
        }
        const user: AppUser = { name: email.split('@')[0], email };
        this.setUser(user);
        resolve({ success: true });
      }, 400);
    });
  }

  /**
   * MOCK registration. Replace with a real Supabase sign-up call later.
   */
  register(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!name.trim()) {
          resolve({ success: false, error: 'Enter your name.' });
          return;
        }
        if (!this.isValidEmail(email)) {
          resolve({ success: false, error: 'Enter a valid email address.' });
          return;
        }
        if (password.length < 6) {
          resolve({ success: false, error: 'Password must be at least 6 characters.' });
          return;
        }
        const user: AppUser = { name: name.trim(), email };
        this.setUser(user);
        resolve({ success: true });
      }, 400);
    });
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.userSubject.next(null);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private setUser(user: AppUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private loadUser(): AppUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}