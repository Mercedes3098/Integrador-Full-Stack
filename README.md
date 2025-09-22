# 🦷 Dental Clinic API

## Descripción del Proyecto

Este proyecto es una API RESTful desarrollada en Node.js y Express que simula la gestión de una clínica dental. Permite la administración de usuarios (pacientes, dentistas y administradores) y la programación de citas, facilitando la interacción entre los diferentes roles del sistema. La API utiliza MariaDB como base de datos y sigue las mejores prácticas de la programación asíncrona.
El frontend de la aplicación está desarrollado con React, lo que permite una interfaz dinámica y reactiva, optimizando la experiencia del usuario al interactuar con la plataforma. Para el diseño y la presentación visual, se emplea CSS personalizado, asegurando una apariencia consistente y profesional tanto en la sección de administración de citas como en los paneles de pacientes y dentistas. Esta combinación de React y CSS permite que la aplicación sea intuitiva, responsiva y estéticamente agradable, facilitando la navegación y la gestión de la clínica dental desde cualquier dispositivo.
---

## Entidades Principales

El sistema se basa en cuatro entidades principales, interconectadas a través de sus identificadores (`ID`):

### 1. Usuarios (`users`)
Representa a todas las personas en el sistema. Contiene información básica como nombre, correo electrónico, contraseña y un rol (`patient`, `dentist`, `admin`). Es la entidad base para la autenticación y el control de acceso.

### 2. Pacientes (`patients`)
Entidad específica que representa a los pacientes de la clínica. Cada paciente está asociado a un usuario (`user_id`), lo que le permite tener sus propias citas y perfil.

### 3. Dentistas (`dentists`)
Entidad específica para los dentistas. Al igual que los pacientes, cada dentista está asociado a un usuario (`user_id`) y tiene una especialidad.

### 4. Citas (`appointments`)
Representa las citas programadas. Cada cita está vinculada a un paciente (`patient_id`) y a un dentista (`dentist_id`), y contiene información sobre la fecha y hora.

---

## Desarrolladora

* **[Mercedes Lagardo]** 