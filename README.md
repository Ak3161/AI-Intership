# AI-Based Internship Recommendation Engine

A **Spring Boot 3.2.5 + Java 21** backend that combines rule-based scoring with **NVIDIA NIM API (LLaMA 3.1)** to deliver personalized internship recommendations.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Spring Boot 3.2.5, Java 21 |
| Database | MySQL 8+ (JPA/Hibernate, ddl-auto=update) |
| Cache | Redis (Spring Cache + Jackson serializer) |
| HTTP Client | WebFlux WebClient |
| AI Layer | NVIDIA NIM API — `meta/llama-3.1-8b-instruct` |
| Utilities | Lombok, Bean Validation, Jackson |
| Tests | JUnit 5, AssertJ |

---

## Project Structure

```
src/main/java/com/internship/recommendation/
├── AiInternshipRecommendationApplication.java   # Entry point
├── config/
│   ├── DataLoader.java           # Seeds 10 internships at startup
│   ├── RedisConfig.java          # Redis cache with Jackson serializer
│   └── WebClientConfig.java      # WebClient bean
├── controller/
│   ├── InternshipController.java # CRUD /api/v1/internships
│   └── RecommendationController.java  # /api/v1/recommendations
├── converter/
│   └── JsonListConverter.java    # List<String> ↔ JSON TEXT column
├── dto/
│   ├── InternshipDTO.java
│   ├── ProfileSubmissionDTO.java
│   ├── RecommendationResponseDTO.java
│   └── SkillDTO.java
├── entity/
│   ├── Internship.java
│   ├── RecommendationResult.java
│   ├── Student.java
│   ├── StudentInterest.java
│   └── StudentSkill.java         # Proficiency: BEGINNER/INTERMEDIATE/ADVANCED
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
├── repository/
│   ├── InternshipRepository.java
│   ├── RecommendationResultRepository.java
│   └── StudentRepository.java
└── service/
    ├── InternshipService.java        # CRUD logic
    ├── NvidiaExplanationService.java # NVIDIA NIM API calls + fallback
    ├── ProfileService.java           # Save/upsert student profile
    ├── RecommendationService.java    # Orchestrator + @Cacheable
    └── ScoringService.java           # Pure Java rule-based scoring
```

---

## Scoring Algorithm

Each internship is scored **out of 100** against a student profile:

| Criterion | Points | Logic |
|-----------|--------|-------|
| Domain Match | 40 | Binary: student's domain interests contain the internship domain |
| Required Skills | 40 | Proportional: `(matched / total_required) × 40` |
| Preferred Skills | 20 | Proportional: `(matched / total_preferred) × 20` |

Only the top-5 internships scoring **≥ 20 pts** are returned.

---

## API Endpoints

### Recommendations

| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/v1/recommendations/generate` | Submit profile, get AI-ranked recommendations |
| `GET` | `/api/v1/recommendations/{studentId}` | Fetch cached recommendations |

### Internships (Admin)

| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/v1/internships` | Create internship |
| `GET` | `/api/v1/internships` | List all |
| `GET` | `/api/v1/internships/active` | List active only |
| `GET` | `/api/v1/internships/{id}` | Get by ID |
| `PUT` | `/api/v1/internships/{id}` | Update |
| `DELETE` | `/api/v1/internships/{id}` | Delete |

---

## Sample Request — Generate Recommendations

```json
POST /api/v1/recommendations/generate
Content-Type: application/json

{
  "name": "Aryan Kumar",
  "email": "aryan@example.com",
  "skills": [
    { "skill": "Java", "proficiency": "ADVANCED" },
    { "skill": "Spring Boot", "proficiency": "INTERMEDIATE" },
    { "skill": "REST API", "proficiency": "INTERMEDIATE" },
    { "skill": "MySQL", "proficiency": "BEGINNER" }
  ],
  "interests": ["fintech", "edtech"]
}
```

### Sample Response

```json
[
  {
    "internshipId": 1,
    "title": "FinTech Backend Developer Intern",
    "company": "PaySmart Solutions",
    "domain": "fintech",
    "matchScore": 93.33,
    "aiExplanation": "Your advanced Java skills and Spring Boot expertise make you an excellent fit for PaySmart's payment processing platform. This 12-week internship will give you invaluable hands-on experience with high-throughput microservices in the financial sector.",
    "durationWeeks": 12
  }
]
```

---

## Setup & Configuration

### 1. Prerequisites

- Java 21
- Maven 3.8+
- MySQL 8+
- Redis (running on `localhost:6379`)

### 2. Database Setup

```sql
CREATE DATABASE IF NOT EXISTS internship_db;
```

### 3. Configure `application.properties`

```properties
# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/internship_db?createDatabaseIfNotExist=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# NVIDIA NIM API Key
nvidia.api.key=nvapi-YOUR_API_KEY_HERE
```

Get your NVIDIA NIM API key at: https://build.nvidia.com

### 4. Run

```bash
mvn spring-boot:run
```

The DataLoader will automatically seed 10 internships on first startup.

---

## Running Tests

```bash
mvn test
```

The `ScoringServiceTest` covers 7 scenarios:
- ✅ Perfect match (100 pts)
- ✅ Partial match (domain + 1/3 required)
- ✅ No match (0 pts)
- ✅ Domain-only match (40 pts)
- ✅ Skills-only match (no domain match)
- ✅ Score cap at 100
- ✅ Empty required skills edge case

---

## Architecture Flow

```
POST /generate
    │
    ├─ ProfileService.saveProfile()          → MySQL (upsert)
    ├─ InternshipService.getActiveInternships() → MySQL
    ├─ ScoringService.score()                → Pure Java (no I/O)
    ├─ Filter top-5 above 20pt threshold
    ├─ NvidiaExplanationService.generateExplanation() → NVIDIA NIM API
    │       └─ Fallback if API fails
    ├─ RecommendationResultRepository.save() → MySQL
    └─ @CacheEvict → Redis cache cleared
         └─ Results returned to client

GET /{studentId}
    └─ @Cacheable("recommendations") → Redis (1hr TTL)
              └─ Cache miss → RecommendationResultRepository → MySQL
```
