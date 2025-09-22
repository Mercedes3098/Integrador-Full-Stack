const connection = require('../config/db');

class Dentist {
    constructor(dentist) {
        this.user_id = dentist.user_id;
        this.specialty = dentist.specialty;
    }

    static async create(newDentist) {
        try {
            const [result] = await connection.query('INSERT INTO dentists SET ?', newDentist);
            return { id: result.insertId, ...newDentist };
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM dentists WHERE id = ?`, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async findByUserId(user_id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM dentists WHERE user_id = ?`, [user_id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await connection.query('SELECT * FROM dentists');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateById(id, dentist) {
        try {
            const [result] = await connection.query(
                'UPDATE dentists SET user_id = ?, specialty = ? WHERE id = ?',
                [dentist.user_id, dentist.specialty, id]
            );
            if (result.affectedRows === 0) {
                return null;
            }
            return { id: id, ...dentist };
        } catch (error) {
            throw error;
        }
    }

    static async remove(id) {
        try {
            const [result] = await connection.query('DELETE FROM dentists WHERE id = ?', id);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Dentist;