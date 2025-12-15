import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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

  mensajeExito = '';
  mensajeError = '';

  constructor(private contactoService: ContactoService) {}

  enviarMensaje(form: NgForm) {

    if (form.invalid) {
      this.mensajeError = "Faltan campos por llenar";
      return;
    }

    const data = form.value;

    this.contactoService.enviarMensaje(data).subscribe({
      next: (res: any) => {
        console.log(res);

        this.mensajeExito = 'Mensaje enviado correctamente';
        this.mensajeError = '';

        form.resetForm();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.mensajeExito = 'Hubo un error al enviar el mensaje.';
      }
    });
  }
}
