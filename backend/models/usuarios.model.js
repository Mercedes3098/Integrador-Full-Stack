import { pool } from "../config/db.js";

const UsuarioModel = {
  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows[0];
  },

  create: async ({ nombre, email, password }) => {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, password]
    );
    return { id_usuario: result.insertId, nombre, email };
  },

  getAll: async () => {
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, email, fecha_creacion FROM usuarios"
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, email, fecha_creacion FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    return rows[0];
  },

  updateById: async (id, { nombre, email, password }) => {
    let query = "UPDATE usuarios SET nombre = ?, email = ?";
    const params = [nombre, email];

    if (password) {
      query += ", password = ?";
      params.push(password);
    }

    query += " WHERE id_usuario = ?";
    params.push(id);

    const [result] = await pool.query(query, params);
    return result.affectedRows > 0;
  },

  deleteById: async (id) => {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
    return result.affectedRows > 0;
  },
};

export default UsuarioModel;
