package com.example.backend.controller;

import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request,
                                   HttpSession session) {

        String loginId = request.get("loginId");
        String password = request.get("password");

        if (loginId == null || password == null ||
                !userService.login(loginId, password)) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "ログインIDまたはパスワードが違います"));
        }

        session.setAttribute("loginId", loginId);

        return ResponseEntity.ok(Map.of("message", "ログイン成功"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "ログアウトしました"));
    }
}