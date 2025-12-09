import { Injectable } from '@angular/core';
import { ProductoModule } from '../module/producto.module';

export interface ItemCarrito {
  producto: ProductoModule;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {

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
