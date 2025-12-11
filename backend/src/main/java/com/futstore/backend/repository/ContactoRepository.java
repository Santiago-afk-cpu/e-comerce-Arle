package com.futstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futstore.backend.entity.Contacto;

public interface ContactoRepository extends JpaRepository<Contacto, Long>{
    
}
