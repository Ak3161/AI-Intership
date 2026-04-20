package com.internship.recommendation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_results")
@Getter
@Setter
@NoArgsConstructor
public class RecommendationResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internship_id", nullable = false)
    private Internship internship;

    @Column(nullable = false)
    private Double score;

    @Column(name = "ai_explanation", columnDefinition = "TEXT")
    private String aiExplanation;

    @CreationTimestamp
    @Column(name = "generated_at", updatable = false)
    private LocalDateTime generatedAt;

    public RecommendationResult(Student student, Internship internship, Double score, String aiExplanation) {
        this.student = student;
        this.internship = internship;
        this.score = score;
        this.aiExplanation = aiExplanation;
    }
}
