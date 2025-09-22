CREATE DATABASE odontology_api;
USE odontology_api;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('patient', 'dentist', 'admin') NOT NULL
);

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- Agrega 'INT' aquí
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE dentists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Agrega 'INT' aquí
    specialty VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    dentist_id INT NOT NULL,
    appointment_datetime DATETIME NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (dentist_id) REFERENCES dentists(id) ON DELETE CASCADE
);