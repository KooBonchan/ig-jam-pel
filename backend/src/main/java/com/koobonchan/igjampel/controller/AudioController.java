package com.koobonchan.igjampel.controller;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.koobonchan.igjampel.entity.AudioFile;
import com.koobonchan.igjampel.repository.AudioFileRepository;
import com.koobonchan.igjampel.service.AudioStorageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/audio")
@RequiredArgsConstructor
public class AudioController {

    private final AudioStorageService storageService;
    private final AudioFileRepository repository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAudio(@RequestParam MultipartFile file) throws IOException {
        if (!file.getContentType().startsWith("audio")) {
            return ResponseEntity.badRequest().body("Only audio files are allowed.");
        }

        AudioFile saved = storageService.save(file);
        repository.save(saved);
        return ResponseEntity.ok(saved.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getAudio(@PathVariable Long id) throws IOException {
        AudioFile audio = repository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        Resource resource = storageService.loadAsResource(audio.getStoredFilename());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(audio.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + audio.getOriginalFilename() + "\"")
                .body(resource);
    }
}
