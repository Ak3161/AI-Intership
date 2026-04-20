package com.internship.recommendation.repository;

import com.internship.recommendation.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {

    List<Internship> findByIsActiveTrue();

    List<Internship> findByDomainIgnoreCase(String domain);
}
