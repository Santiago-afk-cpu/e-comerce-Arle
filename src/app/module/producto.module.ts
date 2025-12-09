export interface ProductoModule {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Balones' | 'Calzado' | 'Camisetas' | 'Accesorios' | 'Protección';
  marca: 'Nike' | 'Adidas' | 'Puma';
  imagen: string;
}
