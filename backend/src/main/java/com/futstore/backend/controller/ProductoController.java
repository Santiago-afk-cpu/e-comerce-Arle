package com.futstore.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futstore.backend.entity.Producto;
import com.futstore.backend.service.ProductoService;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping
    public List<Producto> listar(){
        return service.listarTodos();
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto){
        return service.crearProducto(producto);
    }

    @PatchMapping("/{id}/imagen")
    public ResponseEntity<?> actualizarImagen(@PathVariable Long id, @RequestBody String nuevaImagen) {
        Producto actualizado = service.actualizarImagen(id, nuevaImagen);
        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.status(404).body("Producto no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.eliminarProducto(id);
    }
}
