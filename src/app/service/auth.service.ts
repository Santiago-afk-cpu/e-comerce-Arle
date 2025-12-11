import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';

  private userSubject = new BehaviorSubject<any>(null);

  public get currentUser(){
    return this.userSubject.value;
  }

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  // 🔥 LOGIN
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // 🔥 REGISTER (lo que te faltaba)
  register(name: string, email: string, password: string) {
    const data = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // 🔥 Guardar usuario
  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  loadUserFromStorage() {
    const stored = localStorage.getItem("user");
    if (stored) this.userSubject.next(JSON.parse(stored));
  }

  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
  }
}
