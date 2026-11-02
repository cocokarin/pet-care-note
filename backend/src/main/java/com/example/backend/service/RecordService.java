package com.example.backend.service;

import com.example.backend.entity.Pet;
import com.example.backend.entity.Record;
import com.example.backend.repository.PetRepository;
import com.example.backend.repository.RecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordService {

    private final RecordRepository recordRepository;
    private final PetRepository petRepository;

    public RecordService(RecordRepository recordRepository,
                         PetRepository petRepository) {
        this.recordRepository = recordRepository;
        this.petRepository = petRepository;
    }

    // ペットごとの記録一覧
    public List<Record> findAll(Long userId, Long petId) {
        findPet(userId, petId);
        return recordRepository.findByPetPetId(petId);
    }

    // 記録の登録
    public Record save(Long userId, Long petId, Record record) {
        Pet pet = findPet(userId, petId);
        record.setRecordId(null);
        record.setPet(pet);
        return recordRepository.save(record);
    }

    // 記録の編集
    public Record update(Long userId, Long petId, Long recordId, Record record) {
        findPet(userId, petId);

        Record existing = recordRepository.findById(recordId).orElseThrow();

        if (!existing.getPet().getPetId().equals(petId)) {
            throw new IllegalArgumentException("対象の記録が見つかりません");
        }

        existing.setDate(record.getDate());
        existing.setCategory(record.getCategory());
        existing.setContent(record.getContent());
        existing.setMemo(record.getMemo());

        return recordRepository.save(existing);
    }

    // 記録の削除
    public void delete(Long userId, Long petId, Long recordId) {
        findPet(userId, petId);

        Record record = recordRepository.findById(recordId).orElseThrow();

        if (!record.getPet().getPetId().equals(petId)) {
            throw new IllegalArgumentException("対象の記録が見つかりません");
        }

        recordRepository.delete(record);
    }

    // 指定したユーザーのペットか確認
    private Pet findPet(Long userId, Long petId) {
        Pet pet = petRepository.findById(petId).orElseThrow();

        if (!pet.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("対象のペットが見つかりません");
        }

        return pet;
    }
}