import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:8080/api/v1/contactos';

  constructor(private http: HttpClient) {}

  enviarMensaje(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }
}
