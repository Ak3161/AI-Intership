package com.internship.recommendation.service;

import com.internship.recommendation.entity.Internship;
import com.internship.recommendation.entity.Student;
import com.internship.recommendation.entity.StudentInterest;
import com.internship.recommendation.entity.StudentSkill;
import com.internship.recommendation.entity.StudentSkill.Proficiency;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

@DisplayName("ScoringService Unit Tests")
class ScoringServiceTest {

    private ScoringService scoringService;

    @BeforeEach
    void setUp() {
        scoringService = new ScoringService();
    }

    // -----------------------------------------------------------------------
    // Helper builders
    // -----------------------------------------------------------------------

    private Student buildStudent(List<String[]> skillsWithLevel, List<String> domains) {
        Student student = new Student();

        List<StudentSkill> skills = skillsWithLevel.stream()
                .map(s -> new StudentSkill(student, s[0].toLowerCase(), Proficiency.valueOf(s[1])))
                .toList();

        List<StudentInterest> interests = domains.stream()
                .map(d -> new StudentInterest(student, d.toLowerCase()))
                .toList();

        student.getSkills().addAll(skills);
        student.getInterests().addAll(interests);
        return student;
    }

    private Internship buildInternship(String domain, List<String> required, List<String> preferred) {
        Internship i = new Internship();
        i.setDomain(domain.toLowerCase());
        i.setTitle("Test Internship");
        i.setCompany("Test Co");
        i.setRequiredSkills(required.stream().map(String::toLowerCase).toList());
        i.setPreferredSkills(preferred.stream().map(String::toLowerCase).toList());
        i.setDurationWeeks(12);
        i.setIsActive(true);
        return i;
    }

    // -----------------------------------------------------------------------
    // Tests
    // -----------------------------------------------------------------------

    @Test
    @DisplayName("Perfect Match: domain + all required + all preferred = 100 pts")
    void testPerfectMatch() {
        Student student = buildStudent(
                List.of(
                        new String[]{"java", "ADVANCED"},
                        new String[]{"spring boot", "INTERMEDIATE"},
                        new String[]{"rest api", "INTERMEDIATE"},
                        new String[]{"docker", "BEGINNER"},
                        new String[]{"kafka", "BEGINNER"}
                ),
                List.of("fintech")
        );

        Internship internship = buildInternship(
                "fintech",
                List.of("java", "spring boot", "rest api"),
                List.of("docker", "kafka")
        );

        double score = scoringService.score(student, internship);
        assertThat(score).isEqualTo(100.0);
    }

    @Test
    @DisplayName("Partial Match: domain + 1 of 3 required + 0 preferred")
    void testPartialMatch() {
        Student student = buildStudent(
                List.of(new String[]{"java", "INTERMEDIATE"}),
                List.of("fintech")
        );

        Internship internship = buildInternship(
                "fintech",
                List.of("java", "python", "sql"),
                List.of("docker", "kafka")
        );

        double score = scoringService.score(student, internship);
        double expected = 40.0 + (1.0 / 3.0 * 40.0);
        assertThat(score).isCloseTo(expected, within(0.01));
    }

    @Test
    @DisplayName("No Match: different domain, no overlapping skills")
    void testNoMatch() {
        Student student = buildStudent(
                List.of(
                        new String[]{"java", "ADVANCED"},
                        new String[]{"spring boot", "INTERMEDIATE"}
                ),
                List.of("fintech")
        );

        Internship internship = buildInternship(
                "agritech",
                List.of("python", "computer vision", "deep learning"),
                List.of("pytorch", "opencv")
        );

        double score = scoringService.score(student, internship);
        assertThat(score).isEqualTo(0.0);
    }

    @Test
    @DisplayName("Domain Only Match: matching domain but no skills overlap = 40 pts")
    void testDomainOnlyMatch() {
        Student student = buildStudent(
                List.of(new String[]{"cobol", "BEGINNER"}),
                List.of("healthtech")
        );

        Internship internship = buildInternship(
                "healthtech",
                List.of("python", "machine learning", "tensorflow"),
                List.of("pytorch", "keras")
        );

        double score = scoringService.score(student, internship);
        assertThat(score).isEqualTo(40.0);
    }

    @Test
    @DisplayName("Skills Only: all required + all preferred but no domain match")
    void testSkillsOnlyNoDomainMatch() {
        Student student = buildStudent(
                List.of(
                        new String[]{"python", "ADVANCED"},
                        new String[]{"sql", "INTERMEDIATE"},
                        new String[]{"data analysis", "ADVANCED"},
                        new String[]{"pandas", "INTERMEDIATE"},
                        new String[]{"numpy", "BEGINNER"}
                ),
                List.of("edtech")
        );

        Internship internship = buildInternship(
                "fintech",
                List.of("python", "sql", "data analysis"),
                List.of("pandas", "numpy")
        );

        double score = scoringService.score(student, internship);
        assertThat(score).isCloseTo(60.0, within(0.01));
    }

    @Test
    @DisplayName("Score is capped at 100")
    void testScoreCapAt100() {
        Student student = buildStudent(
                List.of(
                        new String[]{"java", "ADVANCED"},
                        new String[]{"spring boot", "ADVANCED"},
                        new String[]{"rest api", "ADVANCED"},
                        new String[]{"docker", "ADVANCED"}
                ),
                List.of("fintech")
        );

        Internship internship = buildInternship(
                "fintech",
                List.of("java", "spring boot", "rest api"),
                List.of("docker")
        );

        double score = scoringService.score(student, internship);
        assertThat(score).isLessThanOrEqualTo(100.0);
        assertThat(score).isEqualTo(100.0);
    }

    @Test
    @DisplayName("Empty required skills: only domain + preferred scores")
    void testEmptyRequiredSkills() {
        Student student = buildStudent(
                List.of(new String[]{"python", "INTERMEDIATE"}),
                List.of("agritech")
        );

        Internship internship = buildInternship("agritech", List.of(), List.of("python", "sql"));

        double score = scoringService.score(student, internship);
        // domain=40, required=0 (empty list), preferred=1/2*20=10
        assertThat(score).isCloseTo(50.0, within(0.01));
    }
}
