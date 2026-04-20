package com.internship.recommendation.service;

import com.internship.recommendation.entity.Internship;
import com.internship.recommendation.entity.Student;
import com.internship.recommendation.entity.StudentSkill;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Pure Java rule-based scoring engine.
 * No external API calls made here.
 *
 * Scoring breakdown (out of 100):
 *  - Domain match      : 40 pts
 *  - Required skills   : 40 pts (proportional to matched / total required)
 *  - Preferred skills  : 20 pts (proportional to matched / total preferred)
 */
@Service
@Slf4j
public class ScoringService {

    private static final double DOMAIN_MATCH_POINTS = 40.0;
    private static final double REQUIRED_SKILLS_POINTS = 40.0;
    private static final double PREFERRED_SKILLS_POINTS = 20.0;

    public double score(Student student, Internship internship) {
        double total = 0.0;

        // Normalize student skill names to lowercase for comparison
        Set<String> studentSkillNames = student.getSkills().stream()
                .map(StudentSkill::getSkill)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());

        // Normalize student domain interests to lowercase
        Set<String> studentDomains = student.getInterests().stream()
                .map(interest -> interest.getDomain().toLowerCase())
                .collect(Collectors.toSet());

        // --- 1. Domain Match (40 pts) ---
        String internshipDomain = internship.getDomain().toLowerCase();
        if (studentDomains.contains(internshipDomain)) {
            total += DOMAIN_MATCH_POINTS;
            log.debug("Domain match '{}' for internship '{}': +{}", internshipDomain, internship.getTitle(), DOMAIN_MATCH_POINTS);
        }

        // --- 2. Required Skills Match (40 pts) ---
        List<String> requiredSkills = internship.getRequiredSkills();
        if (requiredSkills != null && !requiredSkills.isEmpty()) {
            long matchedRequired = requiredSkills.stream()
                    .map(String::toLowerCase)
                    .filter(studentSkillNames::contains)
                    .count();
            double requiredScore = (double) matchedRequired / requiredSkills.size() * REQUIRED_SKILLS_POINTS;
            total += requiredScore;
            log.debug("Required skills match {}/{} for '{}': +{}", matchedRequired, requiredSkills.size(), internship.getTitle(), requiredScore);
        }

        // --- 3. Preferred Skills Match (20 pts) ---
        List<String> preferredSkills = internship.getPreferredSkills();
        if (preferredSkills != null && !preferredSkills.isEmpty()) {
            long matchedPreferred = preferredSkills.stream()
                    .map(String::toLowerCase)
                    .filter(studentSkillNames::contains)
                    .count();
            double preferredScore = (double) matchedPreferred / preferredSkills.size() * PREFERRED_SKILLS_POINTS;
            total += preferredScore;
            log.debug("Preferred skills match {}/{} for '{}': +{}", matchedPreferred, preferredSkills.size(), internship.getTitle(), preferredScore);
        }

        double finalScore = Math.min(100.0, total);
        log.debug("Final score for internship '{}': {}", internship.getTitle(), finalScore);
        return finalScore;
    }
}
