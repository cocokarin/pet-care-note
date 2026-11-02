package com.example.backend.controller;

import com.example.backend.entity.Pet;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.PetService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;
    private final UserRepository userRepository;

    public PetController(PetService petService, UserRepository userRepository) {
        this.petService = petService;
        this.userRepository = userRepository;
    }

    // ログイン中のユーザーIDを取得
    private Long getUserId(HttpSession session) {
        String loginId = (String) session.getAttribute("loginId");

        if (loginId == null) {
            return null;
        }

        return userRepository.findByLoginId(loginId)
                .map(User::getUserId)
                .orElse(null);
    }

    // ペット一覧
    @GetMapping
    public ResponseEntity<?> findAll(HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        List<Pet> pets = petService.findAll(userId);
        return ResponseEntity.ok(pets);
    }

    // ペット登録
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Pet pet, HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(petService.save(userId, pet));
    }

    // ペット編集
    @PutMapping("/{petId}")
    public ResponseEntity<?> update(@PathVariable Long petId,
                                    @RequestBody Pet pet,
                                    HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(petService.update(userId, petId, pet));
    }

    // ペット削除
    @DeleteMapping("/{petId}")
    public ResponseEntity<?> delete(@PathVariable Long petId,
                                    HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        petService.delete(userId, petId);
        return ResponseEntity.ok().build();
    }
}