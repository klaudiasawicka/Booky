package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.config.JwtService;
import com.bookbuddy.bookbuddy.dto.auth.RegisterRequest;
import com.bookbuddy.bookbuddy.exception.InvalidRegisterRequestException;
import com.bookbuddy.bookbuddy.model.User;
import com.bookbuddy.bookbuddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final UserRepository userRepository;

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public String login(String email, String password){
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Bad credentials");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Bad credentials"));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user);
        } else {
            throw new BadCredentialsException("Invalid user request!");
        }
    }

    public String register(RegisterRequest request){
        validateRegistration(request);

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setNameAndSurname(request.getNameAndSurname());
        user.setRoles("USER");

        userService.addUser(user);

        return login(request.getEmail(), request.getPassword());
    }

    private void validateRegistration(RegisterRequest request){
        if (request.getEmail() == null || request.getEmail().isEmpty() || !VALID_EMAIL_ADDRESS_REGEX.matcher(request.getEmail()).matches()){
            throw new InvalidRegisterRequestException("Provided email is invalid");
        }else if (request.getPassword() == null || request.getPassword().isEmpty()){
            throw new InvalidRegisterRequestException("Password is empty");
        }else if (request.getPassword().length() < 8 || request.getPassword().length() > 30){
            throw new InvalidRegisterRequestException("Password should be between 8 to 30 characters");
        }else if(request.getNameAndSurname() == null || request.getNameAndSurname().isEmpty()){
            throw new InvalidRegisterRequestException("Name and Surname is empty");
        }
    }
}
