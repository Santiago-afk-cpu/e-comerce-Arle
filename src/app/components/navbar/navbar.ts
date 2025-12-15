import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {

  textoBusqueda: string = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    private searchService: SearchService
  ) {}

  logout() {
    this.authService.logout();
  }

  onBuscar() {
    this.searchService.actualizarBusqueda(this.textoBusqueda);
  }
}
