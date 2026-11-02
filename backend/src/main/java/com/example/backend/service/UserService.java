package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean login(String loginId, String password) {

        Optional<User> user = userRepository.findByLoginId(loginId);

        if (user.isEmpty()) {
            return false;
        }

        return passwordEncoder.matches(
                password,
                user.get().getPassword()
        );
    }
}