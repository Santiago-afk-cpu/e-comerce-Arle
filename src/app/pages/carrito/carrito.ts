import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../service/carrito.service';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';

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
  direccion: string = ''; // <-- para el formulario de envío

  mostrarFormulario: boolean = false;
  mensajeNoRegistrado: string = ''; // <-- agrega esta propiedad

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private http: HttpClient  // ✅ inyectamos HttpClient
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
    const user = this.authService.currentUser; // getter público
    if (!user) {
      this.mensajeNoRegistrado = 'Debes iniciar sesión para realizar la compra';
      return;
    }
    this.mensajeNoRegistrado = ''; // limpiar mensaje si hay usuario
    this.mostrarFormulario = true;
  }


  enviarPedido(): void {
    const user = this.authService.currentUser; // usuario logueado
    if (!user) {
      alert("Debes iniciar sesión para enviar el pedido");
      return;
    }

    if (!this.direccion.trim()) {
      alert("Debes ingresar la dirección de envío");
      return;
    }

    // Construimos el objeto pedido
    const pedido = {
      nombreCliente: user.name,
      direccion: this.direccion,
      total: this.total
    };

    // Hacemos el POST al backend
    this.http.post('http://localhost:8080/api/v1/pedidos', pedido).subscribe({
      next: (res) => {
        console.log('Pedido enviado correctamente:', res);
        this.carritoService.vaciar(); // limpiar carrito
        this.cargarItems(); // actualizar vista
        this.direccion = ''; // limpiar input
        this.mostrarFormulario = false; // ocultar formulario
      },
      error: (err) => {
        console.error('Error al enviar pedido:', err);
        alert("Ocurrió un error al enviar el pedido");
      }
    });
  }

}
