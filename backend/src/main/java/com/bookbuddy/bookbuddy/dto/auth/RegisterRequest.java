package com.bookbuddy.bookbuddy.dto.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotEmpty private String email;
    @NotEmpty private String password;
    private String roles;
}
