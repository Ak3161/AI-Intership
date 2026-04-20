package com.internship.recommendation.config;

import com.internship.recommendation.entity.Internship;
import com.internship.recommendation.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * Seeds 10 sample internships at startup if the table is empty.
 * Works with ddl-auto=update.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final InternshipRepository internshipRepository;

    @Override
    public void run(String... args) {
        if (internshipRepository.count() > 0) {
            log.info("Internship data already present. Skipping seed.");
            return;
        }

        log.info("Seeding 10 sample internships...");

        List<Internship> internships = Arrays.asList(
            makeInternship("FinTech Backend Developer Intern",     "PaySmart Solutions",      "fintech",
                List.of("java","spring boot","rest api"),          List.of("kafka","docker","postgresql"),
                "Work on high-throughput payment processing APIs and microservices.", 12),

            makeInternship("Quantitative Finance Data Analyst",    "AlphaEdge Capital",       "fintech",
                List.of("python","sql","data analysis"),           List.of("machine learning","pandas","numpy"),
                "Analyze financial datasets and build predictive models for risk assessment.", 16),

            makeInternship("HealthTech Full Stack Intern",         "MediConnect Innovations",  "healthtech",
                List.of("javascript","react","node.js"),           List.of("mongodb","typescript","tailwindcss"),
                "Build patient portal features and integrate with EHR systems.", 10),

            makeInternship("AI in Healthcare Research Intern",     "GenomAI Labs",             "healthtech",
                List.of("python","machine learning","tensorflow"), List.of("medical imaging","deep learning","pytorch"),
                "Apply deep learning models to medical imaging for early disease detection.", 20),

            makeInternship("EdTech Platform Engineer Intern",      "LearnVerse Technologies",  "edtech",
                List.of("java","spring boot","mysql"),             List.of("redis","aws","microservices"),
                "Develop scalable backend services for an online learning platform.", 12),

            makeInternship("Adaptive Learning AI Intern",          "BrainWave EdTech",         "edtech",
                List.of("python","machine learning","nlp"),        List.of("recommendation systems","spark","sql"),
                "Build personalized curriculum recommendation engines using NLP.", 14),

            makeInternship("Supply Chain Data Engineering Intern", "TrackNet Logistics",       "logisticstech",
                List.of("python","sql","data engineering"),        List.of("airflow","spark","kafka"),
                "Design and maintain ETL pipelines for real-time supply chain visibility.", 12),

            makeInternship("Route Optimization Backend Intern",    "SwiftMove Systems",        "logisticstech",
                List.of("java","algorithms","rest api"),           List.of("graph algorithms","spring boot","redis"),
                "Implement graph-based route optimization algorithms to reduce delivery costs.", 10),

            makeInternship("AgriTech IoT Software Intern",         "GreenField Innovations",   "agritech",
                List.of("python","mqtt","rest api"),               List.of("raspberry pi","postgresql","time-series databases"),
                "Develop software to collect and analyze real-time sensor data from smart irrigation.", 12),

            makeInternship("Crop Disease Detection ML Intern",     "AgroVision AI",            "agritech",
                List.of("python","deep learning","computer vision"),List.of("pytorch","image classification","opencv"),
                "Train CNNs to detect crop diseases from drone imagery for early preventive action.", 16)
        );

        internshipRepository.saveAll(internships);
        log.info("Successfully seeded {} internships.", internships.size());
    }

    private Internship makeInternship(String title, String company, String domain,
                                      List<String> required, List<String> preferred,
                                      String description, int weeks) {
        Internship i = new Internship();
        i.setTitle(title);
        i.setCompany(company);
        i.setDomain(domain);
        i.setRequiredSkills(required);
        i.setPreferredSkills(preferred);
        i.setDescription(description);
        i.setDurationWeeks(weeks);
        i.setIsActive(true);
        return i;
    }
}
