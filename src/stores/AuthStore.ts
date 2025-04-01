import { makeObservable, observable, action } from 'mobx';
import { api } from '../api/api';

class AuthStore {
  isAuthenticated = false;
  loading = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      loading: observable,
      error: observable,
      setLoading: action,
      setError: action,
      setAuthenticated: action,
      login: action
    });
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }

  setError(error: string | null): void {
    this.error = error;
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
  }

  async login(): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      await api.auth('test_user');
      this.setAuthenticated(true);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Authentication failed');
      this.setAuthenticated(false);
    } finally {
      this.setLoading(false);
    }
  }
}

export const authStore = new AuthStore(); 