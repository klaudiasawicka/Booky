package com.bookbuddy.bookbuddy.controller;


import com.bookbuddy.bookbuddy.dto.error.ErrorResponse;
import com.bookbuddy.bookbuddy.dto.user.UserResponse;
import com.bookbuddy.bookbuddy.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Delete currently logged in user")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully deleted user",
                    content = @Content(
                            mediaType = "text/plain",
                            schema = @Schema(implementation = String.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Access denied",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            )
    })
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

    @Operation(summary = "Get current user")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully fetched a user",
                    content = @Content(
                            mediaType = "text/plain",
                            schema = @Schema(implementation = String.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Access denied",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            )
    })
    @GetMapping("/me")
    public String user(Authentication authentication){
        String userName = authentication.getName();
        return userName;
    }

    //TODO: Implement method and secure it so only admin can access it
//    @GetMapping
//    public List<UserResponse> getUsers(Authentication authentication){
//        return userService.getAllUsers();
//    }
}
