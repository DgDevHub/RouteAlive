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

// Tipos de problemas relevantes para motoristas
const tiposDeProblema = {
  Buraco: [
    "Buraco profundo na faixa da direita.",
    "Asfalto afundando próximo ao retorno.",
    "Cratera na curva perigosa sem sinalização.",
    "Buraco largo na entrada da avenida.",
    "Pista esburacada nos dois sentidos."
  ],
  Inundação: [
    "Trecho da pista intransitável devido a alagamento.",
    "Rua completamente coberta por água após chuva intensa.",
    "Ponto de alagamento recorrente durante chuvas.",
    "Água cobrindo metade da roda em trecho urbano.",
    "Inundação impedindo passagem de veículos baixos."
  ],
  Iluminação: [
    "Poste apagado em curva acentuada.",
    "Trecho sem iluminação aumenta risco de acidentes.",
    "Via expressa escura durante a noite.",
    "Luz intermitente no cruzamento pode causar confusão.",
    "Estrada rural sem iluminação por 1 km."
  ],
  Acidente: [
    "Colisão entre dois veículos no acostamento.",
    "Capotamento no meio da pista, trânsito parado.",
    "Engavetamento com três carros na marginal.",
    "Motociclista ferido após colisão com caminhão.",
    "Carro atravessado na via após acidente."
  ],
  Animal: [
    "Animal morto na pista, faixa da esquerda.",
    "Carcaça de cachorro em ponto cego da curva.",
    "Veado atropelado bloqueando acostamento.",
    "Corpo de cavalo atingido na BR-101.",
    "Animal morto oferecendo risco de novos acidentes."
  ]
};

const cidades = [
  { nome: "São Paulo", bairros: ["Marginal Tietê", "Avenida Aricanduva", "Rodovia Anhanguera", "Imigrantes", "Raposo Tavares"] },
  { nome: "Rio de Janeiro", bairros: ["Linha Amarela", "Avenida Brasil", "Estrada dos Bandeirantes", "Redentor", "Niterói"] },
  { nome: "Curitiba", bairros: ["Linha Verde", "BR-277", "Contorno Sul", "Santa Cândida", "CIC"] },
  { nome: "Belo Horizonte", bairros: ["Anel Rodoviário", "Cristiano Machado", "Contagem", "Sabará", "Pampulha"] },
  { nome: "Porto Alegre", bairros: ["Av. Sertório", "Freeway", "BR-290", "Protásio Alves", "Zona Norte"] }
];

const statusList = ["pendente", "em andamento", "resolvido"];

tiposDeProblema && Object.entries(tiposDeProblema).forEach(([tipo, descricoes]) => {
  for (let i = 0; i < 10; i++) {
    const cidadeObj = cidades[Math.floor(Math.random() * cidades.length)];
    const bairro = cidadeObj.bairros[Math.floor(Math.random() * cidadeObj.bairros.length)];
    const rua = faker.location.street();
    const data = faker.date.between({ from: "2025-07-01", to: "2025-07-09" });

    Problem.addProblem({
      tipo,
      cidade: cidadeObj.nome,
      descricao: faker.helpers.arrayElement(descricoes),
      localizacao: `${rua}, ${bairro}, ${cidadeObj.nome}`,
      data,
      status: faker.helpers.arrayElement(statusList)
    });
  }
});