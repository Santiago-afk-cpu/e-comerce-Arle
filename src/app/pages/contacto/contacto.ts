import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../service/contacto.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class Contacto {
  nombre = '';
  email = '';
  telefono = '';
  asunto = '';
  mensaje = '';
  mensajeExito = '';

  constructor(private contactoService: ContactoService) {}

  enviarMensaje(e?: Event) {
    if (e) e.preventDefault();

    const data = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      asunto: this.asunto,
      mensaje: this.mensaje
    };

    this.contactoService.enviarMensaje(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.nombre = '';
        this.email = '';
        this.telefono = '';
        this.asunto = '';
        this.mensaje = '';
      },
      error: (err) => {
        console.error(err);
        this.mensajeExito = "Hubo un error al enviar el mensaje.";
      }
    });
  }
}
