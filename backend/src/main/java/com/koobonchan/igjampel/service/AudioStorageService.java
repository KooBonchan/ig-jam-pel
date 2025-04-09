package com.koobonchan.igjampel.service;

import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import com.koobonchan.igjampel.entity.AudioFile;
import jakarta.annotation.PostConstruct;
@Service
public class AudioStorageService {

    private final Path storageDir = Paths.get("uploads/audio").toAbsolutePath().normalize();

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(storageDir);
    }

    public AudioFile save(MultipartFile file) throws IOException {
        String original = file.getOriginalFilename();
        String ext = Optional.ofNullable(original)
                             .filter(f -> f.contains("."))
                             .map(f -> f.substring(original.lastIndexOf(".")))
                             .orElse("");
        String uuid = UUID.randomUUID().toString() + ext;

        Path target = storageDir.resolve(uuid);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        AudioFile audioFile = new AudioFile();
        audioFile.setOriginalFilename(original);
        audioFile.setStoredFilename(uuid);
        audioFile.setContentType(file.getContentType());
        audioFile.setSize(file.getSize());
        audioFile.setStoragePath(target.toString());
        audioFile.setUploadedAt(LocalDateTime.now());

        return audioFile;
    }

    public Resource loadAsResource(String filename) throws MalformedURLException {
        Path file = storageDir.resolve(filename);
        return new UrlResource(file.toUri());
    }
}

