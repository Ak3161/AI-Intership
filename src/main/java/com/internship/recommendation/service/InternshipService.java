package com.internship.recommendation.service;

import com.internship.recommendation.dto.InternshipDTO;
import com.internship.recommendation.entity.Internship;
import com.internship.recommendation.exception.ResourceNotFoundException;
import com.internship.recommendation.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InternshipService {

    private final InternshipRepository internshipRepository;

    @Transactional
    public Internship createInternship(InternshipDTO dto) {
        Internship internship = mapToEntity(dto, new Internship());
        Internship saved = internshipRepository.save(internship);
        log.info("Created internship '{}' at '{}' with ID: {}", saved.getTitle(), saved.getCompany(), saved.getId());
        return saved;
    }

    @Transactional(readOnly = true)
    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Internship> getActiveInternships() {
        return internshipRepository.findByIsActiveTrue();
    }

    @Transactional(readOnly = true)
    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship", "id", id));
    }

    @Transactional
    public Internship updateInternship(Long id, InternshipDTO dto) {
        Internship internship = getInternshipById(id);
        mapToEntity(dto, internship);
        Internship updated = internshipRepository.save(internship);
        log.info("Updated internship ID: {}", id);
        return updated;
    }

    @Transactional
    public void deleteInternship(Long id) {
        if (!internshipRepository.existsById(id)) {
            throw new ResourceNotFoundException("Internship", "id", id);
        }
        internshipRepository.deleteById(id);
        log.info("Deleted internship ID: {}", id);
    }

    private Internship mapToEntity(InternshipDTO dto, Internship internship) {
        internship.setTitle(dto.getTitle());
        internship.setCompany(dto.getCompany());
        internship.setDomain(dto.getDomain().toLowerCase());
        internship.setRequiredSkills(
                dto.getRequiredSkills().stream()
                        .map(String::toLowerCase)
                        .toList()
        );
        internship.setPreferredSkills(
                dto.getPreferredSkills() != null
                        ? dto.getPreferredSkills().stream().map(String::toLowerCase).toList()
                        : new ArrayList<>()
        );
        internship.setDescription(dto.getDescription());
        internship.setDurationWeeks(dto.getDurationWeeks());
        internship.setIsActive(dto.isActive() != null ? dto.isActive() : Boolean.TRUE);
        return internship;
    }
}
