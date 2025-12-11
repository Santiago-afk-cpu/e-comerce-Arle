package com.futstore.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futstore.backend.entity.Pedido;
import com.futstore.backend.repository.PedidoRepository;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository repository;

    public Pedido crear(Pedido pedido){
        return repository.save(pedido);
    }

    public List<Pedido> listar(){
        return repository.findAll();
    }
}
