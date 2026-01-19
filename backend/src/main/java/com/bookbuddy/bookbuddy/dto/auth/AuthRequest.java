package com.bookbuddy.bookbuddy.dto.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    @NotEmpty public String email;
    @NotEmpty public String password;
    public String roles;
}
