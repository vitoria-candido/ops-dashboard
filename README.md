# 📊 OPS Dashboard | Full Stack Ticket Management System

Aplicação full stack para gerenciamento de tickets operacionais, com foco em organização, validação de dados e visualização de indicadores em tempo real.

---

## 🚀 Sobre o projeto

O **Ops Dashboard** é uma aplicação web para registro, acompanhamento e análise de tickets operacionais, permitindo maior controle de demandas e visualização de indicadores em tempo real.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento full stack, incluindo validações, organização de código e experiência do usuário.

---

## 🧩 Funcionalidades

* ✔️ Cadastro de tickets operacionais
* ✔️ Visualização em tabela organizada
* ✔️ Filtros por status (pendente, em andamento, resolvido)
* ✔️ Indicadores (KPIs) em tempo real
* ✔️ Validação completa de dados (frontend e backend)
* ✔️ Formatação de tempo e datas
* ✔️ Feedback visual (loading, sucesso e erro)

---

## 🛠️ Tecnologias utilizadas

### Frontend

* React (componentização e gerenciamento de estado)
* Vite (build e ambiente de desenvolvimento rápido)
* JavaScript (ES6+)
* CSS moderno e responsivo

### Backend

* Node.js
* Express (API REST)
* SQLite (persistência de dados)

---

## 🧪 Modo de demonstração

Este projeto foi configurado para uso em ambiente de demonstração:

* Os dados são armazenados temporariamente durante a execução
* Ao reiniciar o servidor, todos os tickets são automaticamente removidos

Isso garante uma experiência limpa para cada nova execução do sistema.

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/vitoria-candido/ops-dashboard.git
cd ops-dashboard
```

---

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Servidor rodando em:
http://localhost:3000

---

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

O arquivo `.env` define a URL da API utilizada pelo frontend.
Por padrão, o projeto utiliza:

```
VITE_API_URL=http://localhost:3000
```

Aplicação disponível em:
http://localhost:5173

---

## 📁 Estrutura do projeto

```
ops-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── vite.config.js
│   └── .env.example
```

---

## ✨ Melhorias implementadas

* 🔹 Validação robusta de dados (frontend e backend)
* 🔹 Tratamento de erros amigável
* 🔹 Organização de código em camadas
* 🔹 Uso de variáveis de ambiente
* 🔹 Reset automático de dados em ambiente de desenvolvimento
* 🔹 Interface limpa e responsiva

---

## 🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de consolidar conhecimentos em desenvolvimento full stack, incluindo:

* Comunicação entre frontend e backend
* Manipulação de dados
* Estruturação de aplicações web
* Boas práticas de desenvolvimento

---

## 👩‍💻 Autora

**Vitória Candido**

Estudante de Sistemas de Informação – FIAP

---

## 📸 Preview

<img src="dashboard.png">

---

## 📌 Observação

Desenvolvido para fins educacionais e demonstração de habilidades técnicas.
