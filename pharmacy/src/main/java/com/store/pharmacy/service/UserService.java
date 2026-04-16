package com.store.pharmacy.service;

import com.store.pharmacy.model.User;
import com.store.pharmacy.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    // 📝 REGISTER
    public User register(User user) {

        if (user.getUsername() == null || user.getUsername().isBlank() ||
                user.getEmail() == null || user.getEmail().isBlank() ||
                user.getPassword() == null || user.getPassword().isBlank()) {
            throw new RuntimeException("All fields are required");
        }

        repo.findByUsername(user.getUsername())
                .ifPresent(u -> {
                    throw new RuntimeException("Username already exists");
                });

        repo.findByEmail(user.getEmail())
                .ifPresent(u -> {
                    throw new RuntimeException("Email already exists");
                });

        user.setPassword(encoder.encode(user.getPassword()));

        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        return repo.save(user);
    }

    // 🔐 LOGIN
    public User login(String username, String password) {

        if (username == null || username.isBlank() ||
                password == null || password.isBlank()) {
            throw new RuntimeException("Username and password required");
        }

        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}