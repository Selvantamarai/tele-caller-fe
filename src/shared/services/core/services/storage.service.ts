import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = localStorage;

  clearAll(): void {
    this.storage.clear();
  }

  clear(key: string): void {
    this.storage.removeItem(key);
  }

  any(key: string): boolean {
    return this.get(key) !== null;
  }

  get(key: string): any | null {
    let result = this.storage.getItem(key);
    if (result === 'null') return null;

    return result;
  }

  set(key: string, token: any): void {
    this.storage.setItem(key, token);
  }
}
