import express from "express";
import { Problem } from "../models/problemsModel.js"; // ajuste o caminho se necessário

const router = express.Router();

router.get("/", (req, res) => {
  const problemas = Problem.getAllProblems();
  const tiposUnicos = Array.from(new Set(problemas.map((p) => p.tipo)));
  res.status(200).json(tiposUnicos);
});

export default router;
