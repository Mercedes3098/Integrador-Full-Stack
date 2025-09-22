const connection = require('../config/db');

class Patient {
    constructor(patient) {
        this.user_id = patient.user_id;
    }

    static async create(newPatient) {
        try {
            const [result] = await connection.query('INSERT INTO patients SET ?', newPatient);
            return { id: result.insertId, ...newPatient };
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM patients WHERE id = ?`, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async findByUserId(user_id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM patients WHERE user_id = ?`, [user_id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await connection.query('SELECT * FROM patients');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateById(id, patient) {
        try {
            const [result] = await connection.query(
                'UPDATE patients SET user_id = ? WHERE id = ?',
                [patient.user_id, id]
            );
            if (result.affectedRows === 0) {
                return null;
            }
            return { id: id, ...patient };
        } catch (error) {
            throw error;
        }
    }

    static async remove(id) {
        try {
            const [result] = await connection.query('DELETE FROM patients WHERE id = ?', id);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Patient;