package com.koobonchan.igjampel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.koobonchan.igjampel.entity.AudioFile;

public interface AudioFileRepository extends JpaRepository<AudioFile, Long> {
}
