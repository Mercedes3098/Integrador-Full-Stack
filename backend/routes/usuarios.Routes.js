// backend/routes/usuarios.routes.js
import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser
} from "../controllers/usuarios.controller.js";

import { valUpdateUser, valUserId } from "../middleware/usuarios.validator.js";

// Rutas CRUD usuarios
router.get("/", getAllUsers);
router.get("/:id", valUserId, getUserById);
router.put("/:id", valUpdateUser, updateUserById);
router.delete("/:id", valUserId, deleteUser);

export default router;
