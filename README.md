# AI-Based Internship Recommendation Engine

A **Spring Boot 3.2.5 + Java 21 backend that combines rule-based scoring with **NVIDIA NIM API (LLaMA 3.1)** to deliver personalized internship recommendations.

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

## Data Flow Diagram

```mermaid
graph TD
    Client((Client)) -->|1. POST /api/v1/recommendations/generate| API[Recommendation API]
    API -->|2. Save Profile| DB[(MySQL DB)]
    API -->|3. Fetch Active Internships| DB
    API -->|4. Pure Java Scoring| Engine[Scoring Engine]
    Engine -->|5. Filter Top 5 >= 20 pts| API
    API -->|6. Generate Explanations| LLaMA[NVIDIA LLaMA 3.1]
    API -->|7. Save Results| DB
    API -->|8. Evict Cache| Cache[(Redis Cache)]
    API -->|9. Return JSON| Client
    
    Client -->|A. GET /api/v1/recommendations/{studentId}| API2["Fetch Cache API"]
    API2 -->|B. Check Cache| Cache
    Cache -.->|C. Cache Miss| DB
    Cache -->|D. Cache Hit| Client
```

---

## Testing Flow in Postman

Follow these steps to test the end-to-end flow of the application using Postman:

### 1. Create an Internship
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/v1/internships`
- **Body (JSON):**
  ```json
  {
      "title": "Backend Engineering Intern",
      "company": "Tech Corp",
      "domain": "Software Engineering",
      "requiredSkills": ["Java", "Spring Boot"],
      "preferredSkills": ["MySQL", "Redis"],
      "description": "Help build scalable backend services.",
      "durationWeeks": 12,
      "isActive": true
  }
  ```
- **Expected:** `201 Created` with the saved internship object.

### 2. Verify Internships
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/v1/internships`
- **Expected:** `200 OK` with a JSON array listing all created/seeded internships.

### 3. Generate Recommendations
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/v1/recommendations/generate`
- **Body (JSON):**
  ```json
  {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "skills": [
          {
              "skill": "Java",
              "proficiency": "INTERMEDIATE"
          },
          {
              "skill": "Spring Boot",
              "proficiency": "BEGINNER"
          }
      ],
      "interests": ["Software Engineering", "Backend Architecture"]
  }
  ```
- **Expected:** `200 OK` with an array of recommended internships, including the `matchScore` and the `aiExplanation` generated by the NVIDIA LLaMA 3.1 API.

### 4. Fetch Cached Recommendations
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/v1/recommendations/1` *(Replace `1` with the actual student ID from the previous step)*
- **Expected:** `200 OK` returning the cached recommendations without triggering a new AI generation process.
