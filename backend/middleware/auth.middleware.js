import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "No tienes token de autenticación" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
