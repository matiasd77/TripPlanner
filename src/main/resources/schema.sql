DROP DATABASE IF EXISTS trip_planner;
CREATE DATABASE trip_planner;

USE trip_planner;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50)
);

INSERT INTO user (email, password, name, role)
SELECT 'admin@admin.com', '$2a$10$HVoqJ3LPF.a4QKtTB7WbzOYKI0sfygQY2l3yAQiIdZOHNOmsoUAbi', 'Admin', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = 'admin@admin.com');
