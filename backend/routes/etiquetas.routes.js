// backend/routes/etiquetas.routes.js
import express from "express";
const router = express.Router();

import {
  createEtiqueta,
  getEtiquetas,        // ✅ nombre correcto
  getEtiquetaById,
  updateEtiquetaById,
  deleteEtiqueta,
  addEtiquetaToNota,
  removeEtiquetaFromNota
} from "../controllers/etiquetas.controller.js";

import {
  valCreateEtiqueta,
  valEtiquetaId,
  valNotaEtiqueta
} from "../middleware/etiquetas.validator.js"; // ✅ nombre correcto del archivo

// Rutas principales de etiquetas
router.get("/", getEtiquetas);
router.get("/:id", valEtiquetaId, getEtiquetaById);
router.post("/", valCreateEtiqueta, createEtiqueta);
router.put("/:id", valEtiquetaId, updateEtiquetaById);
router.delete("/:id", valEtiquetaId, deleteEtiqueta);

// Rutas para asignar y remover etiquetas de notas
router.post("/asignar", valNotaEtiqueta, addEtiquetaToNota);
router.post("/remover", valNotaEtiqueta, removeEtiquetaFromNota);

export default router;
