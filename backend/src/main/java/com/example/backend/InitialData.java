package com.example.backend;

import com.example.backend.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
public class InitialData implements CommandLineRunner {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void run(String... args) {

        Long count = entityManager.createQuery(
                "SELECT COUNT(u) FROM User u", Long.class
        ).getSingleResult();

        if (count == 0) {
            User user = new User();
            user.setLoginId("tester");
            user.setPassword(
                    new BCryptPasswordEncoder().encode("test1234")
            );

            entityManager.persist(user);
            System.out.println("初期ユーザーを登録しました");
        }
    }
}