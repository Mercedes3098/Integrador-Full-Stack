// backend/routes/notas.routes.js
import express from "express";
const router = express.Router();

import {
  createNota,
  getAllNotas,
  getNotaById,
  updateNotaById,
  deleteNotaById
} from "../controllers/notas.controller.js";

import { valCreateNota, valUpdateNota, valNotaId } from "../middleware/notas.validator.js";

// Crear nota
router.post("/", valCreateNota, createNota);

// Obtener todas las notas
router.get("/", getAllNotas);

// Obtener nota por ID
router.get("/:id", valNotaId, getNotaById);

// Actualizar nota
router.put("/:id", valNotaId, valUpdateNota, updateNotaById);

// Eliminar nota
router.delete("/:id", valNotaId, deleteNotaById);

export default router;
