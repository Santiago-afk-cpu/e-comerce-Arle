import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarritoService, ItemCarrito, CarritoRequest } from '../../service/carrito.service';
import { AuthService } from '../../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  items: ItemCarrito[] = [];
  envio: number = 9.99;
  direccion: string = ''; 
  mostrarFormulario: boolean = false;
  mensajeError: string = ''; 
  mensajeExito: string = '';

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
  ) {}


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

  abrirFormulario(): void {
    const user = this.authService.currentUser; 
    if (!user) {
      this.mensajeError = 'Debes iniciar sesión para realizar la compra';
      return;
    }
    this.mensajeError = ''; 
    this.mostrarFormulario = true;
  }


  enviarPedido(form: NgForm): void {

    const token = localStorage.getItem('token');
    console.log('Token guardado en localStorage:', token);

    const user = this.authService.currentUser;
    if (!user) {
      this.mensajeError = 'Debes iniciar sesión para enviar el pedido';
      return;
    }

    if (form.invalid) {
      this.mensajeError = 'Debes ingresar la dirección de envío';
      return;
    }

    const pedido: CarritoRequest = {
      nombreCliente: user.name,
      direccion: form.value.direccion,
      total: this.total
    };

    this.carritoService.enviarPedido(pedido).subscribe({
      next: () => {
        this.mensajeExito = 'Pedido enviado correctamente';
        this.mensajeError = '';

        this.carritoService.vaciar();
        this.cargarItems();

        form.resetForm();
        this.mostrarFormulario = false;

        setTimeout(() => this.mensajeExito = '', 3000);
      },
      error: () => {
        this.mensajeError = 'Ocurrió un error al enviar el pedido';
        this.mensajeExito = '';
      }
    });
  }
}
