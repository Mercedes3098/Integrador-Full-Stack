import EtiquetaModel from "../models/etiquetas.model.js";

export const createEtiqueta = async (req, res) => {
  try {
    const { nombre } = req.body;
    const etiqueta = await EtiquetaModel.create({ nombre });
    res.status(201).json(etiqueta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEtiquetas = async (req, res) => {
  try {
    const etiquetas = await EtiquetaModel.getAll();
    res.status(200).json(etiquetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEtiquetaById = async (req, res) => {
  try {
    const { id } = req.params;
    const etiqueta = await EtiquetaModel.getById(id);
    if (!etiqueta) return res.status(404).json({ message: "Etiqueta no encontrada" });
    res.status(200).json(etiqueta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEtiquetaById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const updated = await EtiquetaModel.updateById(id, { nombre });
    if (!updated) return res.status(404).json({ message: "Etiqueta no encontrada" });
    res.status(200).json({ message: "Etiqueta actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEtiqueta = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EtiquetaModel.deleteById(id);
    if (!deleted) return res.status(404).json({ message: "Etiqueta no encontrada" });
    res.status(204).json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addEtiquetaToNota = async (req, res) => {
  try {
    const { id_nota, id_etiqueta } = req.body;
    const added = await EtiquetaModel.addEtiquetaToNota(id_nota, id_etiqueta);
    if (!added) return res.status(400).json({ message: "Etiqueta ya asignada o error" });
    res.status(200).json({ message: "Etiqueta asignada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeEtiquetaFromNota = async (req, res) => {
  try {
    const { id_nota, id_etiqueta } = req.body;
    const removed = await EtiquetaModel.removeEtiquetaFromNota(id_nota, id_etiqueta);
    if (!removed) return res.status(400).json({ message: "Etiqueta no encontrada o error" });
    res.status(200).json({ message: "Etiqueta removida correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
