import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../service/productos.service';
import { CarritoService } from '../../service/carrito.service';
import { SearchService } from '../../service/search.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit, OnDestroy {

  textoBusqueda: string = '';

  productosOriginal: Producto[] = [];
  productosFiltrados: Producto[] = [];

  categorias: string[] = ['Todos', 'Balones', 'Calzado', 'Camisetas', 'Accesorios', 'Protección'];
  marcas: string[] = ['Todas', 'Nike', 'Adidas', 'Puma'];

  filtroCategoria: string = 'Todos';
  filtroMarca: string = 'Todas';

  private destroy$ = new Subject<void>();

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerTodos().subscribe({
      next: (data) => {
        this.productosOriginal = data;
        this.productosFiltrados = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });

    this.searchService.search$
      .pipe(takeUntil(this.destroy$))
      .subscribe(texto => {
        this.textoBusqueda = texto;
        this.aplicarFiltros();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  aplicarFiltros(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();

    this.productosFiltrados = this.productosOriginal.filter(p =>
      (this.filtroCategoria === 'Todos' || p.categoria === this.filtroCategoria) &&
      (this.filtroMarca === 'Todas' || p.marca === this.filtroMarca) &&
      (!texto || p.nombre.toLowerCase().includes(texto))
    );
  }

  cambiarCategoria(valor: string): void {
    this.filtroCategoria = valor;
    this.aplicarFiltros();
  }

  cambiarMarca(valor: string): void {
    this.filtroMarca = valor;
    this.aplicarFiltros();
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  }
}
