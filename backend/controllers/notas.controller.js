import { pool } from "../config/db.js";

export const createNota = async (req, res) => {
  try {
    const { titulo, contenido, id_usuario } = req.body;
    const [result] = await pool.query(
      "INSERT INTO notas (titulo, contenido, id_usuario) VALUES (?, ?, ?)",
      [titulo, contenido, id_usuario]
    );
    res.status(201).json({ id: result.insertId, titulo, contenido, id_usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNotas = async (req, res) => {
  try {
    const [notas] = await pool.query("SELECT * FROM notas");
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotaById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM notas WHERE id_nota = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Nota no encontrada" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotaById = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const [result] = await pool.query(
      "UPDATE notas SET titulo = COALESCE(?, titulo), contenido = COALESCE(?, contenido) WHERE id_nota = ?",
      [titulo, contenido, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Nota no encontrada" });
    res.status(200).json({ message: "Nota actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotaById = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM notas WHERE id_nota = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Nota no encontrada" });
    res.status(200).json({ message: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
