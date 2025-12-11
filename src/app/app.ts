import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl:'./app.html',
})
export class App {

  constructor(private authService: AuthService) {
    // cargar usuario guardado (si existe)
    this.authService.loadUserFromStorage();
  }

}
