package com.internship.recommendation.service;

import com.internship.recommendation.dto.ProfileSubmissionDTO;
import com.internship.recommendation.dto.SkillDTO;
import com.internship.recommendation.entity.Student;
import com.internship.recommendation.entity.StudentInterest;
import com.internship.recommendation.entity.StudentSkill;
import com.internship.recommendation.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileService {

    private final StudentRepository studentRepository;

    @Transactional
    public Student saveProfile(ProfileSubmissionDTO dto) {

        Student student = studentRepository.findByEmail(dto.getEmail())
                .map(existing -> {
                    log.info("Updating existing profile for email: {}", dto.getEmail());
                    existing.getSkills().clear();
                    existing.getInterests().clear();
                    existing.setName(dto.getName());
                    return existing;
                })
                .orElseGet(() -> {
                    log.info("Creating new profile for email: {}", dto.getEmail());
                    return new Student(dto.getName(), dto.getEmail());
                });

        List<StudentSkill> skills = dto.getSkills().stream()
                .map(skillDTO -> mapSkill(skillDTO, student))
                .toList();
        student.getSkills().addAll(skills);

        List<StudentInterest> interests = dto.getInterests().stream()
                .map(domain -> new StudentInterest(student, domain.trim().toLowerCase()))
                .toList();
        student.getInterests().addAll(interests);

        Student saved = studentRepository.save(student);
        log.info("Profile saved with ID: {}", saved.getId());
        return saved;
    }

    private StudentSkill mapSkill(SkillDTO skillDTO, Student student) {
        return new StudentSkill(
                student,
                skillDTO.getSkill().trim().toLowerCase(),
                skillDTO.getProficiency()
        );
    }
}
