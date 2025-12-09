import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/productos/productos').then(m => m.productos)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contacto/contacto').then(m => m.Contacto)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./pages/carrito/carrito').then(m => m.Carrito)
  }
];
