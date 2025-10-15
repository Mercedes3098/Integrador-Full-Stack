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
import { isAuthenticated } from "../middleware/auth.middleware.js";

router.post("/", isAuthenticated, valCreateNota, createNota);
router.get("/", isAuthenticated, getAllNotas);
router.get("/:id", isAuthenticated, valNotaId, getNotaById);
router.put("/:id", isAuthenticated, valNotaId, valUpdateNota, updateNotaById);
router.delete("/:id", isAuthenticated, valNotaId, deleteNotaById);

export default router;