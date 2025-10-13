import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import notasRoutes from "./routes/notas.routes.js";
import etiquetasRoutes from "./routes/etiquetas.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/notas", notasRoutes);
app.use("/api/etiquetas", etiquetasRoutes);

app.get("/", (req, res) => {
  res.send("API de Notas funcionando correctamente 🚀");
});

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
