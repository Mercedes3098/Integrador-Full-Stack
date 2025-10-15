import express from "express";
const router = express.Router();

import {
  createEtiqueta,
  getEtiquetas,
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
} from "../middleware/etiquetas.validator.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

router.get("/", isAuthenticated, getEtiquetas);
router.get("/:id", isAuthenticated, valEtiquetaId, getEtiquetaById);
router.post("/", isAuthenticated, valCreateEtiqueta, createEtiqueta);
router.put("/:id", isAuthenticated, valEtiquetaId, updateEtiquetaById);
router.delete("/:id", isAuthenticated, valEtiquetaId, deleteEtiqueta);

router.post("/asignar", isAuthenticated, valNotaEtiqueta, addEtiquetaToNota);
router.post("/remover", isAuthenticated, valNotaEtiqueta, removeEtiquetaFromNota);

export default router;