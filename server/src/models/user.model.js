const connection = require('../config/db.js');
const bcrypt = require('bcryptjs');

class User {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    static async create(newUser) {
        try {
            const [result] = await connection.query("INSERT INTO users SET ?", newUser);
            return { id: result.insertId, ...newUser };
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await connection.query(`SELECT * FROM users WHERE email = ?`, [email]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM users WHERE id = ?`, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await connection.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateById(id, user) {
        try {
            const [result] = await connection.query(
                "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?",
                [user.name, user.email, user.password, user.role, id]
            );
            if (result.affectedRows === 0) {
                return null;
            }
            return { id: id, ...user };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query("DELETE FROM users WHERE id = ?", id);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async findByRole(role) {
        try {
            const [rows] = await connection.query(`SELECT * FROM users WHERE role = ?`, [role]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updatePassword(id, hashedPassword) {
        try {
            const [result] = await connection.query(
                "UPDATE users SET password = ? WHERE id = ?",
                [hashedPassword, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async comparePassword(candidatePassword, hashedPassword) {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}

module.exports = User;