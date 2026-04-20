package com.internship.recommendation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student_skills")
@Getter
@Setter
@NoArgsConstructor
public class StudentSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false, length = 100)
    private String skill;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Proficiency proficiency;

    public StudentSkill(Student student, String skill, Proficiency proficiency) {
        this.student = student;
        this.skill = skill;
        this.proficiency = proficiency;
    }

    public enum Proficiency {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}
