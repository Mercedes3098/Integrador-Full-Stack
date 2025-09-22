const connection = require('../config/db');

class Appointment {
  constructor(appointment) {
    this.patient_id = appointment.patient_id;
    this.dentist_id = appointment.dentist_id;
    this.appointment_datetime = appointment.appointment_datetime;
  }

  static async create(newAppointment) {
    try {
      const [result] = await connection.query('INSERT INTO appointments SET ?', newAppointment);
      return { id: result.insertId, ...newAppointment };
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await connection.query(`SELECT * FROM appointments WHERE id = ?`, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const [rows] = await connection.query('SELECT * FROM appointments');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findByPatientId(patient_id) {
    try {
      const [rows] = await connection.query(`SELECT * FROM appointments WHERE patient_id = ?`, [patient_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findByDentistId(dentist_id) {
    try {
      const [rows] = await connection.query(`SELECT * FROM appointments WHERE dentist_id = ?`, [dentist_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, appointment) {
    try {
      const [result] = await connection.query(
        'UPDATE appointments SET patient_id = ?, dentist_id = ?, appointment_datetime = ? WHERE id = ?',
        [appointment.patient_id, appointment.dentist_id, appointment.appointment_datetime, id]
      );
      if (result.affectedRows === 0) {
        return null;
      }
      return { id: id, ...appointment };
    } catch (error) {
      throw error;
    }
  }

  static async remove(id) {
    try {
      const [result] = await connection.query('DELETE FROM appointments WHERE id = ?', id);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Appointment;