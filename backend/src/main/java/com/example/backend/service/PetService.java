package com.example.backend.service;

import com.example.backend.entity.Pet;
import com.example.backend.entity.User;
import com.example.backend.repository.PetRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public PetService(PetRepository petRepository, UserRepository userRepository) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    // ペット一覧取得
    public List<Pet> findAll(Long userId) {
        return petRepository.findByUserUserId(userId);
    }

    // ペット登録
    public Pet save(Long userId, Pet pet) {
        User user = userRepository.findById(userId).orElseThrow();
        pet.setPetId(null);
        pet.setUser(user);
        return petRepository.save(pet);
    }

    // ペット編集
    public Pet update(Long userId, Long petId, Pet pet) {
        Pet existing = petRepository.findById(petId).orElseThrow();

        if (!existing.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("対象のペットが見つかりません");
        }

        existing.setName(pet.getName());
        existing.setSpecies(pet.getSpecies());
        existing.setBirthday(pet.getBirthday());

        return petRepository.save(existing);
    }

    // ペット削除
    public void delete(Long userId, Long petId) {
        Pet pet = petRepository.findById(petId).orElseThrow();

        if (!pet.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("対象のペットが見つかりません");
        }

        petRepository.delete(pet);
    }
}