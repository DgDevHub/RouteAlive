// Model - Responsável por representar os dados e a lógica de negócio.

import { v4 as uuidv4 } from 'uuid';

export class Problem {
  constructor({ tipo, cidade, descricao, localizacao, data = new Date(), status = "pendente" }) {
    this.id = uuidv4(); // gera id único
    this.tipo = tipo;
    this.cidade = cidade;
    this.descricao = descricao;
    this.localizacao = localizacao;
    this.data = new Date(data);
    this.status = status;
  }

  // banco simulado (privado)
  static #problems = [];

  // Método para pegar todos problemas
  static getAllProblems() {
    return Problem.#problems;
  }

  // Método estático para normalizar o texto
  static normalizarTexto(texto) {
    return texto
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  // Método para obter problemas por cidade
  static getProblemsByCity(cidadeParam) {
    return Problem.#problems.filter(
      (p) => Problem.normalizarTexto(p.cidade) === Problem.normalizarTexto(cidadeParam)
    );
  }

  static getProblemsByType(typeParam) {
    return Problem.#problems.filter(
      (p) => Problem.normalizarTexto(p.tipo) === Problem.normalizarTexto(typeParam)
    );
  }


  // Método para obter problemas por status
  static getProblemsByStatus(statusParam) {
    return Problem.#problems.filter(
      (p) => Problem.normalizarTexto(p.status) === Problem.normalizarTexto(statusParam)
    );
  }

  // Método estático responsável por criar um novo problema e adicioná-lo à lista de problemas
  static addProblem(problemData) {
    const novoProblema = new Problem(problemData);  // Cria uma nova instância de problema
    Problem.#problems.push(novoProblema); // Adiciona o problema à lista interna de problemas
    return novoProblema;  // Retorna o problema recém-criado
  }
}

const tipos = [
  "Animal",
  "Iluminação",
  "Buraco",
  "Inundações",
  "Acidentes"
];

const cidades = [
  "São Paulo",
  "Rio de Janeiro",
  "Curitiba",
  "Belo Horizonte",
  "Porto Alegre"
];

const statusList = ["pendente", "em andamento", "resolvido"];

const descricoes = {
  Animais: "Animal solto em via pública, pode causar acidentes.",
  Iluminação: "Poste sem luz, rua escura à noite.",
  Buraco: "Buraco na pista, prejudicando o tráfego.",
  Inundações: "Rua alagada após chuva forte.",
  Acidentes: "Acidente de trânsito registrado na via."
};

// Gera 10 problemas para cada tipo
tipos.forEach((tipo) => {
  for (let i = 0; i < 10; i++) {
    Problem.addProblem({
      tipo: tipo,
      cidade: cidades[i % cidades.length],
      descricao: `${descricoes[tipo]} Caso número ${i + 1}.`,
      localizacao: `Rua Exemplo ${i + 1}, ${cidades[i % cidades.length]}`,
      data: new Date(2025, 6, (i % 28) + 1), // Julho de 2025
      status: statusList[i % statusList.length]
    });
  }
});

