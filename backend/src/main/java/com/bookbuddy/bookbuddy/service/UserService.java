package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.dto.user.UserResponse;
import com.bookbuddy.bookbuddy.model.User;
import com.bookbuddy.bookbuddy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;

    private final PasswordEncoder encoder;

    @Autowired
    public UserService(UserRepository repository, @Lazy PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public List<UserResponse> getAllUsers(){
        return repository.findAll()
                .stream()
                .map(this::toUserResponse)
                .toList();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = repository.findByEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return user.get();
    }

    public String addUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);
        return "User added successfully!";
    }

    public void deleteUser(String email){
        repository.deleteUserByEmail(email);
    }

    private UserResponse toUserResponse(User user){
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setRoles(user.getRoles());
        dto.setEmail(user.getEmail());

        return dto;
    }
}
