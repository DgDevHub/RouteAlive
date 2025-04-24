// Definição das rotas

import express from "express";

//Recebendo respotas já manipuladas do controller junto da model
import { listarProblemas, listarProblemasPorCidade, addProblem, getProblemsByStatus } from "../controllers/problemsController.js";

// Roteador específico para problemas
const router = express.Router();

// Rota para postar algum problema
router.post("/cadastrar", addProblem);

// Rotas de consulta
router.get("/", listarProblemas);
router.get("/filter-city/:cidade", listarProblemasPorCidade);
router.get("/filter-status/:status", getProblemsByStatus);


export default router;