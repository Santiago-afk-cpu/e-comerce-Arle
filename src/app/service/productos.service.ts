import { Injectable } from '@angular/core';
import { ProductoModule } from '../module/producto.module';

@Injectable({ providedIn: 'root' })
export class ProductosService {

  private productos: ProductoModule[] = [
    {
      id: 1,
      nombre: 'Balón Profesional Match',
      descripcion: 'Balón oficial para partidos profesionales con tecnología aerodinámica',
      precio: 89.99,
      categoria: 'Balones',
      marca: 'Nike',
      imagen: 'balon-profesional-match.jpg'
    },
    {
      id: 2,
      nombre: 'Guayos Elite Performance',
      descripcion: 'Guayos de alto rendimiento con suela FG para césped natural',
      precio: 129.99,
      categoria: 'Calzado',
      marca: 'Adidas',
      imagen: 'guayos-elite-performance.jpg'
    },
    {
      id: 3,
      nombre: 'Camiseta Oficial Home',
      descripcion: 'Jersey oficial con tecnología Dry-Fit para máxima transpirabilidad',
      precio: 79.99,
      categoria: 'Camisetas',
      marca: 'Puma',
      imagen: 'camiseta-oficial-home.jpg'
    },
    {
      id: 4,
      nombre: 'Guantes de Portero Pro',
      descripcion: 'Guantes profesionales con grip superior y protección de dedos',
      precio: 69.99,
      categoria: 'Accesorios',
      marca: 'Nike',
      imagen: 'guantes-portero-pro.jpg'
    },
    {
      id: 5,
      nombre: 'Espinilleras Carbon Shield',
      descripcion: 'Espinilleras ultra ligeras con carcasa de carbono',
      precio: 34.99,
      categoria: 'Protección',
      marca: 'Adidas',
      imagen: 'espinilleras-carbon-shield.jpg'
    },
    {
      id: 6,
      nombre: 'Balón de Entrenamiento',
      descripcion: 'Balón duradero ideal para entrenamientos diarios',
      precio: 49.99,
      categoria: 'Balones',
      marca: 'Puma',
      imagen: 'balon-entrenamiento.jpg'
    },
    {
      id: 7,
      nombre: 'Guayos Turf Control',
      descripcion: 'Guayos específicos para césped artificial y turf',
      precio: 99.99,
      categoria: 'Calzado',
      marca: 'Nike',
      imagen: 'guayos-turf-control.jpg'
    },
    {
      id: 8,
      nombre: 'Camiseta Training Pro',
      descripcion: 'Camiseta de entrenamiento con tecnología Climacool',
      precio: 54.99,
      categoria: 'Camisetas',
      marca: 'Adidas',
      imagen: 'camiseta-training-pro.jpg'
    }
  ];

  obtenerTodos(): ProductoModule[] {
    return this.productos;
  }
}
