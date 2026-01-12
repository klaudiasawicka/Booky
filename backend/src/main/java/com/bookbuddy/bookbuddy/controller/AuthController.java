package com.bookbuddy.bookbuddy.controller;

import com.bookbuddy.bookbuddy.dto.auth.AuthRequest;
import com.bookbuddy.bookbuddy.model.User;
import com.bookbuddy.bookbuddy.service.AuthService;
import com.bookbuddy.bookbuddy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    @Autowired
    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest){
        return authService.login(authRequest);
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request){
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRoles(request.getRoles());

        userService.addUser(user);

        return authService.login(request);
    }
}
