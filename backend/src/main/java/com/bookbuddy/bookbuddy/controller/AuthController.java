package com.bookbuddy.bookbuddy.controller;

import com.bookbuddy.bookbuddy.dto.auth.LoginRequest;
import com.bookbuddy.bookbuddy.dto.auth.RegisterRequest;
import com.bookbuddy.bookbuddy.service.AuthService;
import com.bookbuddy.bookbuddy.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(UserService userService, AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Login with email and password")
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }

    @Operation(summary = "Register a user")
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }
}
