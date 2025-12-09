import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";


@Component({
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, RouterLink],
})
export class Login {
  mode: 'login' | 'register' = 'login';

  setMode(newMode: 'login' | 'register') {
    this.mode = newMode;
  }
}
