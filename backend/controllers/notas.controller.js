import { pool } from "../config/db.js";

export const createNota = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const id_usuario = req.usuario.id_usuario; // ✅ Obtener del token JWT

    const [result] = await pool.query(
      "INSERT INTO notas (titulo, contenido, id_usuario) VALUES (?, ?, ?)",
      [titulo, contenido, id_usuario]
    );

    res.status(201).json({ 
      id_nota: result.insertId, 
      titulo, 
      contenido, 
      id_usuario 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNotas = async (req, res) => {
  try {
    const id_usuario = req.usuario.id_usuario; // ✅ Filtrar por usuario

    const [notas] = await pool.query(
      `SELECT n.*, GROUP_CONCAT(e.id_etiqueta) as etiquetas_ids, 
              GROUP_CONCAT(e.nombre) as etiquetas_nombres
       FROM notas n
       LEFT JOIN nota_etiqueta ne ON n.id_nota = ne.id_nota
       LEFT JOIN etiquetas e ON ne.id_etiqueta = e.id_etiqueta
       WHERE n.id_usuario = ?
       GROUP BY n.id_nota
       ORDER BY n.fecha_creacion DESC`,
      [id_usuario]
    );

    // ✅ Formatear las etiquetas
    const notasConEtiquetas = notas.map(nota => ({
      ...nota,
      etiquetas: nota.etiquetas_ids ? 
        nota.etiquetas_ids.split(',').map((id, index) => ({
          id_etiqueta: parseInt(id),
          nombre: nota.etiquetas_nombres.split(',')[index]
        })) : []
    }));

    res.status(200).json(notasConEtiquetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotaById = async (req, res) => {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM notas WHERE id_nota = ? AND id_usuario = ?", 
      [id, id_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotaById = async (req, res) => {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id } = req.params;
    const { titulo, contenido } = req.body;

    const [result] = await pool.query(
      `UPDATE notas 
       SET titulo = COALESCE(?, titulo), 
           contenido = COALESCE(?, contenido) 
       WHERE id_nota = ? AND id_usuario = ?`,
      [titulo, contenido, id, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200).json({ message: "Nota actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotaById = async (req, res) => {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM notas WHERE id_nota = ? AND id_usuario = ?", 
      [id, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200).json({ message: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};