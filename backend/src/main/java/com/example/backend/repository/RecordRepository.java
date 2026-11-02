package com.example.backend.repository;

import com.example.backend.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {

    List<Record> findByPetPetId(Long petId);
}
