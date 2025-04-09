package com.koobonchan.igjampel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.koobonchan.igjampel.entity.AudioFile;
import com.koobonchan.igjampel.service.AudioStorageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/music")
@RequiredArgsConstructor
public class MusicController {

    private final AudioStorageService audioStorageService;


    @PostMapping("/upload")
    public ResponseEntity<AudioFile> uploadMusic(@RequestParam("file") MultipartFile file) {
        try {
            AudioFile savedFile = audioStorageService.save(file);
            return ResponseEntity.ok(savedFile); // returns file metadata
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
