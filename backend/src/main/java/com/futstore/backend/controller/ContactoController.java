package com.futstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futstore.backend.entity.Contacto;
import com.futstore.backend.service.ContactoService;

@RestController
@RequestMapping("/api/v1/contactos")
@CrossOrigin(origins = "*")
public class ContactoController {
    
    @Autowired
    private ContactoService service;

    @PostMapping
    public ResponseEntity<?> enviarMensaje(@RequestBody Contacto contacto) {
        Contacto mensajeGuardado = service.guardar(contacto);
        return ResponseEntity.ok(mensajeGuardado);
    }

    @GetMapping
    public List<Contacto> listarContactos(){
        return service.listar();
    }

    @DeleteMapping("/{id}")
    public void eliminarContacto(@PathVariable Long id){
        service.eliminar(id);
    }
}
