import { Component } from '@angular/core';
import { CarritoService, ItemCarrito } from '../../service/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  items: ItemCarrito[] = [];
  envio: number = 9.99;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.items = this.carritoService.obtenerItems();
  }

  get subtotal(): number {
    return this.carritoService.obtenerSubtotal();
  }

  get total(): number {
    return this.subtotal > 0 ? this.subtotal + this.envio : 0;
  }

  eliminarItem(id: number): void {
    this.carritoService.eliminarProducto(id);
    this.cargarItems();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciar();
    this.cargarItems();
  }
}
