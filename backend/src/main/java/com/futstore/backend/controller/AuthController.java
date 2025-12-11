package com.futstore.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futstore.backend.entity.User;
import com.futstore.backend.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        String resultado = service.register(user);
        return ResponseEntity.ok(Map.of("message", resultado));
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        User user = service.login(email, password);

        if(user != null){
            return ResponseEntity.ok(Map.of(
                "message", "Login exitoso",
                "user", user
            ));
        } else {
            return ResponseEntity.status(400).body(Map.of(
                "message", "Credenciales incorrectas"
            ));
        }
    }


    @GetMapping
    public List<User> listar(){
        return service.listar();
    }
}
