import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  mensajeError: string = '';
  mode: 'login' | 'register' = 'login';
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  setMode(m: 'login' | 'register') {
    this.mode = m;
  }

  login(form: NgForm): void {

    if (form.invalid){
      return;
    }

    const data = form.value;

    this.authService.login(data).subscribe({
      next: (res: any) => {
        console.log(res); 
        this.authService.setUser(res.user);
        this.authService.setToken(res.token); 
        this.router.navigate(['/']); 
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.mensajeError = "Las credenciales no coinciden";
        this.cdr.detectChanges();
      }
    });
  }


  register(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    const data = form.value;

    this.authService.register(data).subscribe({
      next: () => {

        form.resetForm();

        this.mode = 'login';
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }
}

