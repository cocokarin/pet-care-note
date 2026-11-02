package com.example.backend.controller;

import com.example.backend.entity.Record;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RecordService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pets/{petId}/records")
public class RecordController {

    private final RecordService recordService;
    private final UserRepository userRepository;

    public RecordController(RecordService recordService,
                            UserRepository userRepository) {
        this.recordService = recordService;
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

    // 記録一覧
    @GetMapping
    public ResponseEntity<?> findAll(@PathVariable Long petId,
                                     HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(recordService.findAll(userId, petId));
    }

    // 記録登録
    @PostMapping
    public ResponseEntity<?> save(@PathVariable Long petId,
                                  @RequestBody Record record,
                                  HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(recordService.save(userId, petId, record));
    }

    // 記録編集
    @PutMapping("/{recordId}")
    public ResponseEntity<?> update(@PathVariable Long petId,
                                    @PathVariable Long recordId,
                                    @RequestBody Record record,
                                    HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(
                recordService.update(userId, petId, recordId, record)
        );
    }

    // 記録削除
    @DeleteMapping("/{recordId}")
    public ResponseEntity<?> delete(@PathVariable Long petId,
                                    @PathVariable Long recordId,
                                    HttpSession session) {
        Long userId = getUserId(session);

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        recordService.delete(userId, petId, recordId);
        return ResponseEntity.ok().build();
    }
}