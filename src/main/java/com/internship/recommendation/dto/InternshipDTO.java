package com.internship.recommendation.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InternshipDTO {

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotBlank(message = "Company must not be blank")
    private String company;

    @NotBlank(message = "Domain must not be blank")
    private String domain;

    @NotEmpty(message = "Required skills must not be empty")
    private List<String> requiredSkills;

    private List<String> preferredSkills;

    private String description;

    @NotNull(message = "Duration in weeks must not be null")
    @Min(value = 1, message = "Duration must be at least 1 week")
    private Integer durationWeeks;

    private Boolean isActive = true;

    // Explicit getter for Boolean field — @Data generates isActive() for boolean
    // but for Boolean (wrapper) it generates getIsActive(). We expose both for safety.
    public Boolean isActive() {
        return isActive;
    }
}
