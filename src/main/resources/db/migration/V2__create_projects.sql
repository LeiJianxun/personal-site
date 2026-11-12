CREATE TABLE projects (
                          id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                          slug VARCHAR(255) DEFAULT NULL,
                          title VARCHAR(255) DEFAULT NULL,
                          summary VARCHAR(255) DEFAULT NULL,
                          stack JSON DEFAULT NULL,
                          body_markdown TEXT,
                          links JSON DEFAULT NULL,
                          PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;