package com.internship.recommendation.repository;

import com.internship.recommendation.entity.RecommendationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationResultRepository extends JpaRepository<RecommendationResult, Long> {

    List<RecommendationResult> findByStudentIdOrderByScoreDesc(Long studentId);

    @Modifying
    void deleteByStudentId(Long studentId);
}
