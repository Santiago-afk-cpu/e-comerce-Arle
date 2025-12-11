package com.futstore.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futstore.backend.entity.Producto;
import com.futstore.backend.repository.ProductoRepository;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository repository;

    public List<Producto> listarTodos(){
        return repository.findAll();
    }

    public Producto crearProducto(Producto producto){
        return repository.save(producto);
    }

    public Producto actualizarImagen(Long id, String nuevaImagen) {
        Optional<Producto> optionalProducto = repository.findById(id);
        if (optionalProducto.isPresent()) {
            Producto producto = optionalProducto.get();
            producto.setImagen(nuevaImagen);
            return repository.save(producto);
        }
        return null; // o lanzar excepción si no existe
    }

    public void eliminarProducto(Long id){
        repository.deleteById(id);
    }
}
