import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],   // 👈 AQUI ESTA LA SOLUCIÓN
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  mensajeRegistro: string = '';
  mode: 'login' | 'register' = 'login';
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  setMode(m: 'login' | 'register') {
    this.mode = m;
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log("Respuesta del backend:", res); // opcional para debug
        this.authService.setUser(res.user); // ⚡ solo guardar el user
        this.router.navigate(['/']); // redirige al home
      },
      error: () => alert("Credenciales incorrectas")
    });
  }


  register() {
    this.mensajeRegistro = '';
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (res: any) => {

        this.name = '';
        this.email = '';
        this.password = '';

        this.mode = 'login';
      },
      error: (err) => {
        console.error(err);
        this.mensajeRegistro = err.error.message || "Hubo un error al registrarse";
      }
    });
  }
}

