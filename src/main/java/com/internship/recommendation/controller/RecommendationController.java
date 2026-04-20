package com.internship.recommendation.controller;

import com.internship.recommendation.dto.ProfileSubmissionDTO;
import com.internship.recommendation.dto.RecommendationResponseDTO;
import com.internship.recommendation.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recommendations")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController {

    private final RecommendationService recommendationService;

    /**
     * POST /api/v1/recommendations/generate
     * Submit a student profile and receive ranked internship recommendations.
     */
    @PostMapping("/generate")
    public ResponseEntity<List<RecommendationResponseDTO>> generateRecommendations(
            @Valid @RequestBody ProfileSubmissionDTO profileSubmissionDTO) {
        log.info("Received recommendation request for email: {}", profileSubmissionDTO.getEmail());
        List<RecommendationResponseDTO> recommendations =
                recommendationService.generateRecommendations(profileSubmissionDTO);
        return ResponseEntity.ok(recommendations);
    }

    /**
     * GET /api/v1/recommendations/{studentId}
     * Fetch previously generated (and optionally cached) recommendations.
     */
    @GetMapping("/{studentId}")
    public ResponseEntity<List<RecommendationResponseDTO>> getRecommendations(
            @PathVariable Long studentId) {
        log.info("Fetching recommendations for student ID: {}", studentId);
        List<RecommendationResponseDTO> recommendations =
                recommendationService.getRecommendationsForStudent(studentId);
        return ResponseEntity.ok(recommendations);
    }
}
