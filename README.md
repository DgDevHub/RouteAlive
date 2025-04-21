# RouteAlive
# 🚦 Route Alive API

Uma API desenvolvida para mapear e compartilhar problemas em estradas brasileiras, como **falta de sinalização**, **iluminação precária** e **animais mortos na pista**. Criada de forma independente por um desenvolvedor que cruzou o país de carro e vivenciou esses desafios de perto.

## 🌍 Objetivo
Contribuir com a **segurança viária** e fornecer dados relevantes para apps como **Waze**, **Google Maps** e plataformas de gestão pública. Motoristas e usuários podem relatar problemas encontrados nas estradas em tempo real.

---

## 🔧 Tecnologias Utilizadas
- Node.js
- Express.js
- UUID (para gerar identificadores únicos)

---

## 🧠 Arquitetura MVC

- **Model:** Representa os dados e regras de negócio (ex: Problem).
- **Controller:** Contém a lógica das requisições HTTP (listar, cadastrar, filtrar).
- **View:** Neste caso, a resposta é um JSON enviado ao cliente.

Estrutura de pastas:
```
src/
├── controllers/
│   └── problemsController.js
├── models/
│   └── problemsModel.js
├── routes/
│   └── problemsRoutes.js
└── app.js
```

---

## 📬 Rotas da API

### POST `/problems/cadastrar`
Cadastra um novo problema.

**Body (JSON):**
```json
{
  "tipo": "Falta de sinalização",
  "cidade": "Recife",
  "descricao": "Trecho sem placas e com curva perigosa",
  "localizacao": "BR-101, km 45",
  "data": "2025-04-21T12:00:00Z",
  "status": "pendente"
}
```

### GET `/problems/`
Lista todos os problemas cadastrados.

### GET `/problems/:cidade`
Filtra os problemas por cidade (sem acento e espaços).

### GET `/problems/filter/:status`
Filtra os problemas por status (`pendente`, `resolvido`, etc).

---

## 📌 Exemplo de retorno:
```json
{
  "id": "1a2b3c4d",
  "tipo": "Animal morto na pista",
  "cidade": "João Pessoa",
  "descricao": "Cachorro atropelado próximo à entrada da cidade",
  "localizacao": "BR-230, km 67",
  "data": "2025-04-21T10:00:00.000Z",
  "status": "pendente"
}
```

---

## 🙋 Sobre o criador
Este projeto foi desenvolvido de forma independente por um entusiasta de tecnologia e viagens, que percebeu um grande problema de segurança ao dirigir do **Sudeste ao Nordeste do Brasil**.

> "Vi muitos lugares perigosos, mal sinalizados, com animais mortos na estrada. Decidi criar uma solução simples que possa ajudar outros motoristas e, quem sabe, ser integrada a apps maiores."

