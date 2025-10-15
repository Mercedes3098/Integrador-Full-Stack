import { pool } from "../config/db.js";

export const createEtiqueta = async (req, res) => {
  try {
    const { nombre } = req.body;
    const id_usuario = req.usuario.id_usuario; // ✅ Obtener del token

    const [result] = await pool.query(
      "INSERT INTO etiquetas (nombre, id_usuario) VALUES (?, ?)",
      [nombre, id_usuario]
    );

    res.status(201).json({ 
      id_etiqueta: result.insertId, 
      nombre,
      id_usuario 
    });
  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "Ya tienes una etiqueta con ese nombre" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getEtiquetas = async (req, res) => {
  try {
    const id_usuario = req.usuario.id_usuario; // ✅ Filtrar por usuario

    const [rows] = await pool.query(
      "SELECT id_etiqueta, nombre, fecha_creacion FROM etiquetas WHERE id_usuario = ? ORDER BY nombre ASC",
      [id_usuario]
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEtiquetaById = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id_usuario;

    const [rows] = await pool.query(
      "SELECT id_etiqueta, nombre, fecha_creacion FROM etiquetas WHERE id_etiqueta = ? AND id_usuario = ?",
      [id, id_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEtiquetaById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const id_usuario = req.usuario.id_usuario;

    const [result] = await pool.query(
      "UPDATE etiquetas SET nombre = ? WHERE id_etiqueta = ? AND id_usuario = ?",
      [nombre, id, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    res.status(200).json({ message: "Etiqueta actualizada correctamente" });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "Ya tienes una etiqueta con ese nombre" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteEtiqueta = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id_usuario;

    const [result] = await pool.query(
      "DELETE FROM etiquetas WHERE id_etiqueta = ? AND id_usuario = ?",
      [id, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    res.status(204).json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addEtiquetaToNota = async (req, res) => {
  try {
    const { id_nota, id_etiqueta } = req.body;
    const id_usuario = req.usuario.id_usuario;

    const [nota] = await pool.query(
      "SELECT id_nota FROM notas WHERE id_nota = ? AND id_usuario = ?",
      [id_nota, id_usuario]
    );

    const [etiqueta] = await pool.query(
      "SELECT id_etiqueta FROM etiquetas WHERE id_etiqueta = ? AND id_usuario = ?",
      [id_etiqueta, id_usuario]
    );

    if (nota.length === 0 || etiqueta.length === 0) {
      return res.status(404).json({ message: "Nota o etiqueta no encontrada" });
    }

    const [result] = await pool.query(
      "INSERT IGNORE INTO nota_etiqueta (id_nota, id_etiqueta) VALUES (?, ?)",
      [id_nota, id_etiqueta]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "La etiqueta ya está asignada a esta nota" });
    }

    res.status(200).json({ message: "Etiqueta asignada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeEtiquetaFromNota = async (req, res) => {
  try {
    const { id_nota, id_etiqueta } = req.body;
    const id_usuario = req.usuario.id_usuario;

    // ✅ Verificar que la nota pertenece al usuario
    const [nota] = await pool.query(
      "SELECT id_nota FROM notas WHERE id_nota = ? AND id_usuario = ?",
      [id_nota, id_usuario]
    );

    if (nota.length === 0) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    const [result] = await pool.query(
      "DELETE FROM nota_etiqueta WHERE id_nota = ? AND id_etiqueta = ?",
      [id_nota, id_etiqueta]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Etiqueta no encontrada en esta nota" });
    }

    res.status(200).json({ message: "Etiqueta removida correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};