import { pool } from "../config/db.js";

const EtiquetaModel = {

  create: async ({ nombre }) => {
    const [result] = await pool.query(
      "INSERT INTO etiquetas (nombre) VALUES (?)",
      [nombre]
    );
    return { id_etiqueta: result.insertId, nombre };
  },

  getAll: async () => {
    const [rows] = await pool.query("SELECT id_etiqueta, nombre, fecha_creacion FROM etiquetas");
    return rows;
  },

  getById: async (id_etiqueta) => {
    const [rows] = await pool.query(
      "SELECT id_etiqueta, nombre, fecha_creacion FROM etiquetas WHERE id_etiqueta = ?",
      [id_etiqueta]
    );
    return rows[0];
  },

  updateById: async (id_etiqueta, { nombre }) => {
    const [result] = await pool.query(
      "UPDATE etiquetas SET nombre = ? WHERE id_etiqueta = ?",
      [nombre, id_etiqueta]
    );
    return result.affectedRows > 0;
  },

  deleteById: async (id_etiqueta) => {
    const [result] = await pool.query(
      "DELETE FROM etiquetas WHERE id_etiqueta = ?",
      [id_etiqueta]
    );
    return result.affectedRows > 0;
  },

  addEtiquetaToNota: async (id_nota, id_etiqueta) => {
    const [result] = await pool.query(
      "INSERT IGNORE INTO nota_etiqueta (id_nota, id_etiqueta) VALUES (?, ?)",
      [id_nota, id_etiqueta]
    );
    return result.affectedRows > 0;
  },

  removeEtiquetaFromNota: async (id_nota, id_etiqueta) => {
    const [result] = await pool.query(
      "DELETE FROM nota_etiqueta WHERE id_nota = ? AND id_etiqueta = ?",
      [id_nota, id_etiqueta]
    );
    return result.affectedRows > 0;
  },

  getEtiquetasByNota: async (id_nota) => {
    const [rows] = await pool.query(
      `SELECT e.id_etiqueta, e.nombre 
       FROM etiquetas e 
       JOIN nota_etiqueta ne ON e.id_etiqueta = ne.id_etiqueta
       WHERE ne.id_nota = ?`,
      [id_nota]
    );
    return rows;
  },
};

export default EtiquetaModel;
