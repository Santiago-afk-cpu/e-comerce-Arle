import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../service/productos.service';
import { CarritoService } from '../../service/carrito.service';
import { ProductoModule } from '../../module/producto.module';

@Component({
  selector: 'app-accesorios',
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit {

  productosOriginal: ProductoModule[] = [];
  productosFiltrados: ProductoModule[] = [];

  categorias: string[] = ['Todos', 'Balones', 'Calzado', 'Camisetas', 'Accesorios', 'Protección'];
  marcas: string[] = ['Todas', 'Nike', 'Adidas', 'Puma'];

  filtroCategoria: string = 'Todos';
  filtroMarca: string = 'Todas';

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // Suscribirse al Observable para obtener los productos desde el backend
    this.productosService.obtenerTodos().subscribe((data: ProductoModule[]) => {
      this.productosOriginal = data;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productosOriginal.filter(p => {
      const coincideCategoria = this.filtroCategoria === 'Todos' || p.categoria === this.filtroCategoria;
      const coincideMarca = this.filtroMarca === 'Todas' || p.marca === this.filtroMarca;
      return coincideCategoria && coincideMarca;
    });
  }

  cambiarCategoria(valor: string): void {
    this.filtroCategoria = valor;
    this.aplicarFiltros();
  }

  cambiarMarca(valor: string): void {
    this.filtroMarca = valor;
    this.aplicarFiltros();
  }

  agregarAlCarrito(producto: ProductoModule): void {
    this.carritoService.agregarProducto(producto);
  }
}
