package com.internship.recommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationResponseDTO implements Serializable {

    private Long internshipId;
    private String title;
    private String company;
    private String domain;
    private Double matchScore;
    private String aiExplanation;
    private Integer durationWeeks;
}
