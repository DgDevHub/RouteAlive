//Esqueleto da API

import express from "express";
import problemsRoutes from "./routes/problemsRoutes.js";

const app = express();
const PORT = 3000;

// Middleware para entender JSON no body
app.use(express.json());

// Rotas
app.use("/problems", problemsRoutes);

// Inicializa servidor
app.listen(PORT, () => {
  console.log("🚀 Servidor rodando na porta " + PORT);
});
