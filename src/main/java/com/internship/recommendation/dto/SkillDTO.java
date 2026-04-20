package com.internship.recommendation.dto;

import com.internship.recommendation.entity.StudentSkill.Proficiency;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillDTO {

    @NotBlank(message = "Skill name must not be blank")
    private String skill;

    @NotNull(message = "Proficiency level must not be null")
    private Proficiency proficiency;
}
