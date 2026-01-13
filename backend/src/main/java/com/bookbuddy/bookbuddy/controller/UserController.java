package com.bookbuddy.bookbuddy.controller;


import com.bookbuddy.bookbuddy.dto.user.UserResponse;
import com.bookbuddy.bookbuddy.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(  UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> deleteAccount(Authentication authentication){
        String userName = authentication.getName();
        try {
            userService.deleteUser(userName);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Deleted User");
    }

    @GetMapping("/me")
    public String user(Authentication authentication){
        String userName = authentication.getName();
        return userName;
    }

    @GetMapping
    public List<UserResponse> getUsers(Authentication authentication){
        return userService.getAllUsers();
    }
}
