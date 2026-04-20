-- ============================================================
-- Seed Data: 10 Internship Listings across 5 domains
-- FinTech, HealthTech, EdTech, LogisticsTech, AgriTech
-- ============================================================

-- NOTE: This file runs via spring.sql.init.mode=always only if ddl-auto=create/create-drop.
-- For ddl-auto=update, insert data manually or use a DataLoader @Component.
-- These records are idempotent — they rely on auto-increment IDs.

-- FinTech (2 internships)
INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'FinTech Backend Developer Intern',
    'PaySmart Solutions',
    'fintech',
    '["java", "spring boot", "rest api"]',
    '["kafka", "docker", "postgresql"]',
    'Work on high-throughput payment processing APIs and microservices architecture powering millions of transactions daily.',
    12,
    true
);

INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'Quantitative Finance Data Analyst Intern',
    'AlphaEdge Capital',
    'fintech',
    '["python", "sql", "data analysis"]',
    '["machine learning", "pandas", "numpy"]',
    'Analyze financial datasets, build predictive models for risk assessment, and contribute to algorithmic trading research.',
    16,
    true
);

-- HealthTech (2 internships)
INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'HealthTech Full Stack Intern',
    'MediConnect Innovations',
    'healthtech',
    '["javascript", "react", "node.js"]',
    '["mongodb", "typescript", "tailwindcss"]',
    'Build patient portal features and integrate with EHR systems to improve the digital health experience for patients and doctors.',
    10,
    true
);

INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'AI in Healthcare Research Intern',
    'GenomAI Labs',
    'healthtech',
    '["python", "machine learning", "tensorflow"]',
    '["medical imaging", "deep learning", "pytorch"]',
    'Apply deep learning models to medical imaging datasets for early disease detection and diagnosis assistance.',
    20,
    true
);

-- EdTech (2 internships)
INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'EdTech Platform Engineer Intern',
    'LearnVerse Technologies',
    'edtech',
    '["java", "spring boot", "mysql"]',
    '["redis", "aws", "microservices"]',
    'Develop scalable backend services for an online learning platform serving over 500,000 students globally.',
    12,
    true
);

INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'Adaptive Learning AI Intern',
    'BrainWave EdTech',
    'edtech',
    '["python", "machine learning", "nlp"]',
    '["recommendation systems", "spark", "sql"]',
    'Build personalized curriculum recommendation engines using NLP and collaborative filtering to improve student outcomes.',
    14,
    true
);

-- LogisticsTech (2 internships)
INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'Supply Chain Data Engineering Intern',
    'TrackNet Logistics',
    'logisticstech',
    '["python", "sql", "data engineering"]',
    '["airflow", "spark", "kafka"]',
    'Design and maintain ETL pipelines for real-time supply chain visibility dashboards used by 200+ warehouse partners.',
    12,
    true
);

INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'Route Optimization Backend Intern',
    'SwiftMove Systems',
    'logisticstech',
    '["java", "algorithms", "rest api"]',
    '["graph algorithms", "spring boot", "redis"]',
    'Implement graph-based route optimization algorithms to reduce last-mile delivery costs by up to 25% for e-commerce clients.',
    10,
    true
);

-- AgriTech (2 internships)
INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'AgriTech IoT Software Intern',
    'GreenField Innovations',
    'agritech',
    '["python", "mqtt", "rest api"]',
    '["raspberry pi", "postgresql", "time-series databases"]',
    'Develop software to collect and analyze real-time sensor data from smart irrigation systems deployed across 10,000 acres of farmland.',
    12,
    true
);

INSERT INTO internships (title, company, domain, required_skills, preferred_skills, description, duration_weeks, is_active)
VALUES (
    'Crop Disease Detection ML Intern',
    'AgroVision AI',
    'agritech',
    '["python", "deep learning", "computer vision"]',
    '["pytorch", "image classification", "opencv"]',
    'Train convolutional neural networks to detect crop diseases from drone imagery, helping farmers take early preventive action.',
    16,
    true
);
