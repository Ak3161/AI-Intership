package com.internship.recommendation.controller;

import com.internship.recommendation.dto.InternshipDTO;
import com.internship.recommendation.entity.Internship;
import com.internship.recommendation.service.InternshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/internships")
@RequiredArgsConstructor
@Slf4j
public class InternshipController {

    private final InternshipService internshipService;

    /**
     * POST /api/v1/internships
     * Create a new internship listing.
     */
    @PostMapping
    public ResponseEntity<Internship> createInternship(@Valid @RequestBody InternshipDTO dto) {
        log.info("Creating internship: {}", dto.getTitle());
        Internship created = internshipService.createInternship(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * GET /api/v1/internships
     * List all internships (including inactive).
     */
    @GetMapping
    public ResponseEntity<List<Internship>> getAllInternships() {
        return ResponseEntity.ok(internshipService.getAllInternships());
    }

    /**
     * GET /api/v1/internships/active
     * List only active internships.
     */
    @GetMapping("/active")
    public ResponseEntity<List<Internship>> getActiveInternships() {
        return ResponseEntity.ok(internshipService.getActiveInternships());
    }

    /**
     * GET /api/v1/internships/{id}
     * Get a single internship by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Internship> getInternshipById(@PathVariable Long id) {
        return ResponseEntity.ok(internshipService.getInternshipById(id));
    }

    /**
     * PUT /api/v1/internships/{id}
     * Update an existing internship.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Internship> updateInternship(
            @PathVariable Long id,
            @Valid @RequestBody InternshipDTO dto) {
        log.info("Updating internship ID: {}", id);
        Internship updated = internshipService.updateInternship(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/v1/internships/{id}
     * Delete an internship.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable Long id) {
        log.info("Deleting internship ID: {}", id);
        internshipService.deleteInternship(id);
        return ResponseEntity.noContent().build();
    }
}
