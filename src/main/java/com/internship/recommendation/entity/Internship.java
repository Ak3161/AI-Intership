package com.internship.recommendation.entity;

import com.internship.recommendation.converter.JsonListConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "internships")
@Getter
@Setter
@NoArgsConstructor
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 100)
    private String company;

    @Column(nullable = false, length = 100)
    private String domain;

    @Convert(converter = JsonListConverter.class)
    @Column(name = "required_skills", columnDefinition = "TEXT")
    private List<String> requiredSkills = new ArrayList<>();

    @Convert(converter = JsonListConverter.class)
    @Column(name = "preferred_skills", columnDefinition = "TEXT")
    private List<String> preferredSkills = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration_weeks")
    private Integer durationWeeks;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
}
