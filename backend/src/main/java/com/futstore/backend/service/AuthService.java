package com.futstore.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.futstore.backend.entity.User;
import com.futstore.backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    public String register(User user){

        if(repository.existsByEmail(user.getEmail())){
            return "El email ya esta registrado";
        }

        repository.save(user);
        return "Usuario registrado con exito";
    }

    public User login(String email, String password) {
        User user = repository.findByEmail(email);

        if(user == null) return null;

        if(!user.getPassword().equals(password)) return null;

        return user;
    }



    public List<User> listar(){
        return repository.findAll();
    }
}
