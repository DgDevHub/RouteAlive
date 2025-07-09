import express from "express";
import cors from "cors"; // <-- IMPORTANTE!
import tiposRoutes from "./routes/tipos.js";
import problemsRoutes from "./routes/problemsRoutes.js";

const app = express();
const PORT = 3001;

// 🔓 Permitir requisições de outras origens (ex: localhost:3000)
app.use(cors());

// 🧠 Middleware para entender JSON no body
app.use(express.json());

// 🌐 Rotas
app.use("/problems", problemsRoutes);
app.use("/api/tipos", tiposRoutes);

// 🚀 Inicializa servidor
app.listen(PORT, () => {
  console.log("🚀 Servidor rodando na porta " + PORT);
});
