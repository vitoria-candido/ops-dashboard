# 📊 Ops Dashboard

Ops Dashboard é uma aplicação full stack para registro e acompanhamento de tickets operacionais.

O projeto permite cadastrar, visualizar e analisar tickets com base em diferentes critérios, como status, categoria e tempo de resolução, simulando um cenário real de operação.

---

## 💡 Objetivo

Este projeto foi desenvolvido com foco em prática e evolução técnica, principalmente para:

* Trabalhar com arquitetura full stack (frontend + backend)
* Criar uma API REST com Node.js e Express
* Integrar frontend em React com backend
* Manipular e validar dados de forma consistente
* Simular um fluxo real de operação com indicadores (KPIs)

Também é um projeto voltado para portfólio, com o objetivo de demonstrar minhas habilidades como desenvolvedora.

---

## 🚀 Funcionalidades

* Cadastro de tickets com:

  * Data
  * Categoria
  * Status
  * Canal
  * Tempo de resolução
  * Responsável
  * Observações

* Listagem de tickets em tabela

* Indicadores (KPIs):

  * Total de tickets
  * Tickets resolvidos
  * Tempo médio de resolução
  * Taxa de escalonamento

---

## ⚙️ Regras de Negócio

Algumas regras implementadas:

* Entrada flexível para tempo de resolução no frontend, com suporte a formatos como `30min`, `1h` e `1:30`
* Conversão automática do tempo para um valor numérico em horas antes do envio para a API
* Validação de campos obrigatórios
* Validação de tipos e formatos de dados no backend
* Tempo de resolução deve ser maior que zero

---

## 🧱 Arquitetura

O projeto é dividido em duas partes principais:

### 🔹 Backend (Node.js + Express)

* API REST para gerenciamento de tickets
* Validação de dados recebidos
* Persistência em banco SQLite

Principais camadas:

* `controllers`
* `routes`
* `database`

---

### 🔹 Frontend (React + Vite)

* Interface para cadastro e visualização de tickets
* Consumo da API via fetch
* Exibição de indicadores (KPIs)
* Conversão de dados antes do envio para o backend

---

## 🛠️ Tecnologias utilizadas

### Backend

* Node.js
* Express
* SQLite

### Frontend

* React
* Vite
* JavaScript
* CSS

---

## ▶️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/vitoria-candido/ops-dashboard.git
cd ops-dashboard
```

---

### 🔧 Backend

```bash
cd backend
npm install
npm run dev
```

O backend roda em:

```
http://localhost:3000
```

---

### 💻 Frontend

Em outro terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

No `.env`, use:

```
VITE_API_URL=http://localhost:3000
```

O frontend roda em:

```
http://localhost:5173
```

---

## ⚠️ Observações

* Em ambiente de desenvolvimento, o banco pode ser reiniciado ao subir o servidor, removendo os tickets cadastrados
* O tempo de resolução é armazenado como valor numérico em horas no backend

---

## 📸 Preview

<img src="dashboard.png">

---

## 👩‍💻 Autora

Desenvolvido por Vitória Candido
