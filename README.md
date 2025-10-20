# App de notas

## Descripción del Proyecto

Este proyecto desarrollada por Node.js y Express por parte del Backend, y React y Vite por parte del Frontend, se trata de una aplicación web de notas donde cada usuario puede crear, editar o hasta eliminar sus propias notas.
---

## Entidades Principales

El sistema se basa en tres entidades principales, interconectadas a través de sus identificadores (`ID`):

### 1. Usuarios
Representa a todas las personas que utilizan la aplicación de notas. Contiene información básica como nombre, correo electrónico y contraseña. Es la entidad principal para la autenticación y la gestión de acceso. Cada usuario puede crear sus propias notas y etiquetas.

### 2. Notas
Entidad que representa cada nota creada por un usuario. Incluye un título, contenido, fecha de creación y fecha de última modificación. Cada nota está asociada a un usuario (id_usuario) y puede tener múltiples etiquetas para facilitar su organización.

### 3. Etiquetas
Representa las categorías o palabras clave que los usuarios pueden asignar a sus notas. Cada etiqueta pertenece a un usuario (id_usuario) y tiene un nombre único dentro del contexto de ese usuario. Las etiquetas permiten clasificar y buscar notas de forma más eficiente.

---

## Desarrolladora

* **[Mercedes Lagardo]** 