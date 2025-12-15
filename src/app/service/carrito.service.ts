import { Injectable } from '@angular/core';
import { ProductoModule } from '../module/producto.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemCarrito {
  producto: ProductoModule;
  cantidad: number;
}

export interface CarritoRequest {
  nombreCliente: string;
  direccion: string;
  total: number;
}

@Injectable({ 
  providedIn: 'root' 
})

export class CarritoService {

  private readonly API_URL = 'http://localhost:8080/api/v1/pedidos';

  constructor(private http: HttpClient) {}

  enviarPedido(pedido: CarritoRequest): Observable<any> {
    return this.http.post(this.API_URL, pedido);
  }

  private items: ItemCarrito[] = [];

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }

  agregarProducto(producto: ProductoModule): void {
    const existente = this.items.find(i => i.producto.id === producto.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.items.push({ producto, cantidad: 1 });
    }
  }

  eliminarProducto(id: number): void {
    this.items = this.items.filter(i => i.producto.id !== id);
  }

  vaciar(): void {
    this.items = [];
  }

  obtenerSubtotal(): number {
    return this.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }
}
