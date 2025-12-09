import { Component } from '@angular/core';
import { ProductoModule } from '../../module/producto.module';
import { CarritoService } from '../../service/carrito.service';
import { ProductosService } from '../../service/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accesorios',
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class productos {
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
    this.productosOriginal = this.productosService.obtenerTodos();
    this.aplicarFiltros();
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
