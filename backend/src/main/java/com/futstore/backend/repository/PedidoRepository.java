package com.futstore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futstore.backend.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long>{

}
