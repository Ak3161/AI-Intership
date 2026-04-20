package com.internship.recommendation.service;

import com.internship.recommendation.entity.Internship;
import com.internship.recommendation.entity.Student;
import com.internship.recommendation.entity.StudentSkill;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.core.ParameterizedTypeReference;

@Service
@RequiredArgsConstructor
@Slf4j
public class NvidiaExplanationService {

    private final WebClient webClient;

    @Value("${nvidia.api.key}")
    private String apiKey;

    @Value("${nvidia.api.url}")
    private String apiUrl;

    @Value("${nvidia.api.model}")
    private String apiModel;

    public String generateExplanation(Student student, Internship internship, double score) {
        String prompt = buildPrompt(student, internship, score);

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", apiModel,
                    "messages", List.of(
                            Map.of("role", "system",
                                    "content", "You are a career advisor. Generate exactly 2 concise sentences explaining why this internship matches the student's profile. Be specific and encouraging."),
                            Map.of("role", "user", "content", prompt)
                    ),
                    "max_tokens", 150,
                    "temperature", 0.7
            );

            String response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .timeout(Duration.ofSeconds(15))
                    .map(this::extractContent)
                    .onErrorResume(e -> {
                        log.error("NVIDIA API error for internship '{}': {}", internship.getTitle(), e.getMessage());
                        return Mono.just(generateFallbackExplanation(student, internship, score));
                    })
                    .block();

            return response != null ? response.trim() : generateFallbackExplanation(student, internship, score);

        } catch (Exception e) {
            log.error("Failed to call NVIDIA API: {}", e.getMessage());
            return generateFallbackExplanation(student, internship, score);
        }
    }

    private String buildPrompt(Student student, Internship internship, double score) {
        String studentSkills = student.getSkills().stream()
                .map(s -> s.getSkill() + " (" + s.getProficiency().name() + ")")
                .collect(Collectors.joining(", "));

        String studentInterests = student.getInterests().stream()
                .map(i -> i.getDomain())
                .collect(Collectors.joining(", "));

        return String.format(
                "Student Profile:\n" +
                "- Name: %s\n" +
                "- Skills: %s\n" +
                "- Domain Interests: %s\n\n" +
                "Internship Details:\n" +
                "- Title: %s at %s\n" +
                "- Domain: %s\n" +
                "- Required Skills: %s\n" +
                "- Preferred Skills: %s\n" +
                "- Duration: %d weeks\n" +
                "- Match Score: %.1f/100\n\n" +
                "Write exactly 2 sentences explaining why this is a good match for the student.",
                student.getName(),
                studentSkills,
                studentInterests,
                internship.getTitle(), internship.getCompany(),
                internship.getDomain(),
                String.join(", ", internship.getRequiredSkills()),
                internship.getPreferredSkills() != null ? String.join(", ", internship.getPreferredSkills()) : "None",
                internship.getDurationWeeks(),
                score
        );
    }

    private String extractContent(Map<String, Object> response) {
        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> choice = choices.get(0);
                @SuppressWarnings("unchecked")
                Map<String, Object> message = (Map<String, Object>) choice.get("message");
                if (message != null) {
                    return (String) message.get("content");
                }
            }
        } catch (Exception e) {
            log.error("Failed to extract content from NVIDIA response: {}", e.getMessage());
        }
        return null;
    }

    private String generateFallbackExplanation(Student student, Internship internship, double score) {
        String topSkill = student.getSkills().stream()
                .findFirst()
                .map(StudentSkill::getSkill)
                .orElse("your technical skills");

        return String.format(
                "Based on your profile, you are a strong candidate for the %s role at %s with a match score of %.1f/100. " +
                "Your expertise in %s aligns well with the internship requirements, making this an excellent opportunity for your career growth.",
                internship.getTitle(),
                internship.getCompany(),
                score,
                topSkill
        );
    }
}
