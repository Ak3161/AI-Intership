package com.internship.recommendation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AiInternshipRecommendationApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiInternshipRecommendationApplication.class, args);
    }
}
