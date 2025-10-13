import { pool } from "../config/db.js";

const NotaModel = {

  create: async ({ id_usuario, titulo, contenido }) => {
    const [result] = await pool.query(
      "INSERT INTO notas (id_usuario, titulo, contenido) VALUES (?, ?, ?)",
      [id_usuario, titulo, contenido]
    );
    return { id_nota: result.insertId, titulo, contenido };
  },

  getAllByUsuario: async (id_usuario) => {
    const [rows] = await pool.query(
      "SELECT id_nota, titulo, contenido, fecha_creacion FROM notas WHERE id_usuario = ?",
      [id_usuario]
    );
    return rows;
  },

  getById: async (id_nota, id_usuario) => {
    const [rows] = await pool.query(
      "SELECT id_nota, titulo, contenido, fecha_creacion FROM notas WHERE id_nota = ? AND id_usuario = ?",
      [id_nota, id_usuario]
    );
    return rows[0];
  },

  updateById: async (id_nota, id_usuario, { titulo, contenido }) => {
    const [result] = await pool.query(
      "UPDATE notas SET titulo = ?, contenido = ? WHERE id_nota = ? AND id_usuario = ?",
      [titulo, contenido, id_nota, id_usuario]
    );
    return result.affectedRows > 0;
  },

  deleteById: async (id_nota, id_usuario) => {
    const [result] = await pool.query(
      "DELETE FROM notas WHERE id_nota = ? AND id_usuario = ?",
      [id_nota, id_usuario]
    );
    return result.affectedRows > 0;
  },
};

export default NotaModel;
