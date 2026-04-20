package com.internship.recommendation.service;

import com.internship.recommendation.dto.ProfileSubmissionDTO;
import com.internship.recommendation.dto.RecommendationResponseDTO;
import com.internship.recommendation.entity.Internship;
import com.internship.recommendation.entity.RecommendationResult;
import com.internship.recommendation.entity.Student;
import com.internship.recommendation.exception.ResourceNotFoundException;
import com.internship.recommendation.repository.RecommendationResultRepository;
import com.internship.recommendation.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {

    private final ProfileService profileService;
    private final InternshipService internshipService;
    private final ScoringService scoringService;
    private final NvidiaExplanationService nvidiaExplanationService;
    private final RecommendationResultRepository recommendationResultRepository;
    private final StudentRepository studentRepository;

    @Value("${recommendation.top-n:5}")
    private int topN;

    @Value("${recommendation.min-score:20.0}")
    private double minScore;

    @Transactional
    @CacheEvict(value = "recommendations", key = "#dto.email")
    public List<RecommendationResponseDTO> generateRecommendations(ProfileSubmissionDTO dto) {

        Student student = profileService.saveProfile(dto);
        log.info("Generating recommendations for student ID: {}", student.getId());

        List<Internship> activeInternships = internshipService.getActiveInternships();
        if (activeInternships.isEmpty()) {
            log.warn("No active internships found in the system.");
            return List.of();
        }

        List<ScoredInternship> scored = activeInternships.stream()
                .map(internship -> new ScoredInternship(internship, scoringService.score(student, internship)))
                .filter(si -> si.getScore() >= minScore)
                .sorted(Comparator.comparingDouble(ScoredInternship::getScore).reversed())
                .limit(topN)
                .toList();

        log.info("Found {} internships above threshold {}", scored.size(), minScore);

        recommendationResultRepository.deleteByStudentId(student.getId());

        List<RecommendationResult> results = scored.stream()
                .map(si -> {
                    String explanation = nvidiaExplanationService.generateExplanation(
                            student, si.getInternship(), si.getScore());
                    RecommendationResult result = new RecommendationResult(
                            student, si.getInternship(), si.getScore(), explanation);
                    return recommendationResultRepository.save(result);
                })
                .toList();

        log.info("Recommendations generated and saved for student ID: {}", student.getId());

        return results.stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Cacheable(value = "recommendations", key = "#studentId")
    @Transactional(readOnly = true)
    public List<RecommendationResponseDTO> getRecommendationsForStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new ResourceNotFoundException("Student", "id", studentId);
        }

        List<RecommendationResult> results =
                recommendationResultRepository.findByStudentIdOrderByScoreDesc(studentId);

        if (results.isEmpty()) {
            log.info("No recommendations found for student ID: {}", studentId);
        }

        return results.stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    private RecommendationResponseDTO mapToResponseDTO(RecommendationResult result) {
        RecommendationResponseDTO dto = new RecommendationResponseDTO();
        dto.setInternshipId(result.getInternship().getId());
        dto.setTitle(result.getInternship().getTitle());
        dto.setCompany(result.getInternship().getCompany());
        dto.setDomain(result.getInternship().getDomain());
        dto.setMatchScore(result.getScore());
        dto.setAiExplanation(result.getAiExplanation());
        dto.setDurationWeeks(result.getInternship().getDurationWeeks());
        return dto;
    }

    // -----------------------------------------------------------------------
    // Private helper — avoids local record (which STS/Eclipse mishandles)
    // -----------------------------------------------------------------------
    private static class ScoredInternship {
        private final Internship internship;
        private final double score;

        ScoredInternship(Internship internship, double score) {
            this.internship = internship;
            this.score = score;
        }

        Internship getInternship() { return internship; }
        double getScore()          { return score; }
    }
}
