package com.futstore.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futstore.backend.entity.Contacto;
import com.futstore.backend.repository.ContactoRepository;

@Service
public class ContactoService {
    
    @Autowired
    private ContactoRepository repository;

    public Contacto guardar(Contacto contacto){
        return repository.save(contacto);
    }

    public List<Contacto> listar(){
        return repository.findAll();
    }

    public void eliminar(Long id){
        repository.deleteById(id);
    }
}
