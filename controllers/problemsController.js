// Responsável por controlar o fluxo da aplicação — recebe requisições, manipula dados com a Model, 
// e envia respostas.
// Importando a Model que contém a lógica de dados (problemas)
import { Problem } from "../models/problemsModel.js";

// Função responsável por listar todos os problemas cadastrados
export const listarProblemas = (req, res) => {
  // Chama o método da Model para obter todos os problemas e retorna como resposta em formato JSON
  res.json(Problem.getAllProblems());
};

// Função responsável por listar problemas filtrados pela cidade
export const listarProblemasPorCidade = (req, res) => {
  // Obtém o nome da cidade a partir dos parâmetros da requisição (ex.: /cidade/:cidade)
  const cidade = req.params.cidade;

  // Chama o método da Model para buscar os problemas dessa cidade
  const filtrados = Problem.getProblemsByCity(cidade);

  // Se não encontrar nenhum problema para essa cidade, retorna erro 404
  if (filtrados.length === 0) {
    return res.status(404).json({ mensagem: "Cidade ainda não possui problemas cadastrados." });
  }

  // Se encontrar problemas, retorna eles em formato JSON
  res.json(filtrados);
};

// Função responsável por listar problemas filtrados pelo status (ex.: "pendente", "resolvido")
export const getProblemsByStatus = (req, res) => {
  // Obtém o status da requisição (ex.: /filter/:status)
  const status = req.params.status;

  // Chama o método da Model para buscar os problemas com o status especificado
  const filtrados = Problem.getProblemsByStatus(status);

  // Se não encontrar nenhum problema com esse status, retorna erro 404
  if (filtrados.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum problema com esse status encontrado" });
  }

  // Se encontrar problemas com o status solicitado, retorna eles em formato JSON
  res.json(filtrados);
};

// Função responsável por adicionar um novo problema
export const addProblem = (req, res) => {
  // Extrai os dados do novo problema enviados no corpo da requisição
  const { tipo, cidade, descricao, localizacao } = req.body;

  // Log para verificar os dados que estão chegando no corpo da requisição (pode ser útil para debug)
  console.log("BODY:", req.body);

  // Verifica se todos os campos obrigatórios foram enviados
  if (!tipo || !cidade || !descricao || !localizacao) {
    // Se algum campo estiver faltando, retorna um erro 400 com uma mensagem explicando quais campos faltam
    return res.status(400).json({
      error: "Campos obrigatórios: tipo, cidade, descricao, localizacao.",
    });
  }

  try {
    // Chama o método da Model para criar um novo problema e adicionar na lista
    const novoProblema = Problem.addProblem(req.body);

    // Retorna o novo problema criado com um status 201 (Criado)
    res.status(201).json(novoProblema);
  } catch (error) {
    // Caso ocorra algum erro inesperado ao tentar adicionar o problema, retorna erro 500
    res.status(500).json({ error: "Erro ao criar problema." });
  }
};