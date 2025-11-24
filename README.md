# 🛡️ Gig-Trust: O Passaporte de Carreira (Front-End)<p align="center"><img src="../front/gig/public/gig-trust-logo.png" alt="Logo do Gig-Trust" width="200"/></p>

## 1. Título e Descrição
O **Gig-Trust** é uma plataforma inovadora focada no trabalhador da *gig economy* (Uber, iFood, freelancers). Nossa solução usa Inteligência Artificial para transformar dados voláteis de performance e reputação em métricas de confiança (Score de Renda) e desenvolvimento de carreira (Mapa de Competências).

O projeto ataca o desafio "O Futuro do Trabalho", alinhando-se aos ODS 8 (Trabalho Decente) e ODS 10 (Redução das Desigualdades) da ONU.

---
## 2. Status do Projeto
| Status | Branch Principal | Versão Atual |
| :--- | :--- | :--- |
| **Concluído (GS Final)** | `main` | `v1.0.0` (Tag Final) |

[![Plataforma](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Render-blue.svg)]()
[![Tecnologias](https://img.shields.io/badge/Stack-React%20%7C%20TS%20%7C%20Tailwind%20%7C%20Java%20%7C%20Python-orange.svg)]()
[![Build](https://img.shields.io/badge/Build-Success-brightgreen.svg)]()
[![Tema](https://img.shields.io/badge/Tema-Dark%20%7C%20Light%20Mode-black.svg)]()

---
## 3. Sumário* [4. Sobre o Projeto](#4-sobre-o-projeto)* [5. Tecnologias Utilizadas](#5-tecnologias-utilizadas)* [6. Instalação](#6-instalação)* [7. Como Usar (URL de Acesso)](#7-como-usar-url-de-acesso)* [8. Estrutura de Pastas](#8-estrutura-de-pastas)* [9. Endpoints ou Rotas Principais](#9-endpoints-ou-rotas-principais)* [10. Autores e Créditos (Contato)](#10-autores-e-créditos-contato)* [11. Screenshots / Demonstração](#11-screenshots--demonstração)* [12. Contato](#12-contato)

---
## 4. Sobre o Projeto
O problema central que resolvemos é a **invisibilidade financeira** dos trabalhadores autônomos. Sem um holerite fixo, eles não conseguem comprovar renda para alugar imóveis ou obter crédito.

Nossa solução oferece dois diferenciais através de IA:1.  **Score de Estabilidade de Renda (Regressão):** Fornece uma previsão de ganhos confiável para parceiros financeiros.2.  **Mapa de Competências (Agrupamento/NLP):** Analisa avaliações de clientes para identificar habilidades transferíveis, direcionando o trabalhador para o **Reskilling** (requalificação).

---
## 5. Tecnologias Utilizadas
O Front-End foi construído para atender aos requisitos técnicos com foco em performance e escalabilidade:

| Categoria | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Framework** | **React (SPA)** | Componentização e eficiência para o Passaporte Digital. |
| **Linguagem** | **TypeScript** | Segurança e tipagem para a integração com a API Java. |
| **Build Tool** | **Vite** | Ambiente de desenvolvimento e *bundling*. |
| **Estilização** | **TailwindCSS** | Estilização *Utility-First*, customização e alta responsividade. |
| **Temas** | **Context API** | Implementação do tema Escuro/Claro (Dark/Light Mode). |
| **Integração** | `fetch API` | Consumo da API Java (Domain Driven Design) para dados do Score. |

---
## 6. Instalação
Para rodar o projeto localmente, siga os passos abaixo:
1.  **Clonar o Repositório:**    ```bash
    git clone [INSIRA SEU LINK GITHUB AQUI]
    cd gig/
    ```
2.  **Instalar Dependências:**
    ```bash
    npm install
    # ou yarn install / pnpm install
    ```
3.  **Configurar API (Obrigatório):** Certifique-se de que a URL de deploy da **API Java (Backend)** esteja acessível.
4.  **Iniciar o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```---
## 7. Como Usar (URL de Acesso)
O acesso público e a demonstração final da aplicação Front-End (hospedada no Vercel) deve ser feito através deste link:

🔗 **URL Pública do Front-End (Vercel):** `[INSIRA URL PÚBLICA DO VERCEL AQUI]`
---
## 8. Estrutura de Pastas
A organização do código foi feita com base na modularização de rotas e componentes:

 gig/
├── public/                # Assets estáticos (Logo)
├── src/
│   ├── assets/            # Imagens dos integrantes
│   ├── components/        # Componentes reutilizáveis (Header, Footer, ThemeToggle)
│   ├── context/           # Contextos React (ThemeContext)
│   ├── routes/            # Páginas principais (Dashboard, Conexoes, Integrantes, etc.)
│   ├── AppLayout.tsx      # Layout para rotas logadas
│   ├── PublicLayout.tsx   # Layout para rotas públicas
│   └── main.tsx           # Ponto de entrada (Router e ThemeProvider)
└── tailwind.config.js

---

## 9. Endpoints ou Rotas Principais

As rotas da aplicação (Front-End) e os principais endpoints da API (Back-End) que são consumidos:

| Rota (Front-End) | Tipo | Endpoint Java Consumido (Exemplo) | Objetivo |
| :--- | :--- | :--- | :--- |
| `/dashboard` | **Logada** | `GET /trabalhador/{id}/dashboard` | Visualização do Score de Renda e Mapa de Competências |
| `/conexoes` | **Logada** | `POST/GET/DELETE /trabalhador/{id}/conexoes` | CRUD das plataformas conectadas |
| `/avaliar-trabalhador` | **Logada** | `POST /avaliacao` | Envio de nova avaliação de performance. |
| `/login` | Pública | `GET /usuario/validar/{cpf}/{senha}` | Autenticação |

---

## 10. Autores e Créditos (Contato)

Os integrantes do grupo **Gig-Trust** são da Turma **1TDSPO**.

| Nome | RM | Turma |
| :--- | :--- | :--- |
| **Matheus Borges Sansão Silva** | 562896 | 1TDSPO |
| **Julia Correa e Souza Altino** | 564870 | 1TDSPO |
| **Nicholas Camillo Canadas de Paula** | 561262 | 1TDSPO |

---

## 11. Screenshots / Demonstração

A apresentação completa do projeto Front-End, incluindo a demonstração da responsividade, da troca de tema e a aplicação das **Heurísticas de Nielsen** e das práticas de **UX Writing** (requisito da FDE), pode ser visualizada no vídeo:

🔗 **Link do Vídeo de Demonstração (Protótipo):** `[https://youtu.be/fzvCjDjNLcs]`

---

## 12. Contato

| Integrante | Imagem | Links de Contato |
| :--- | :--- | :--- |
| **Matheus Borges Sansão Silva** | `src/assets/img/fotoMatheus.jpeg` | [GitHub](https://github.com/Matheussansao) / [LinkedIn](https://www.linkedin.com/in/matheus-sansao-6a0505171/) |
| **Julia Correa e Souza Altino** | `src/assets/img/fotoJulia.jpeg` | [GitHub](https://github.com/Juliacsou) / [LinkedIn](https://www.linkedin.com/in/julia-de-altino-540261258/) |
| **Nicholas Camillo Canadas de Paula** | `src/assets/img/fotoNicholas.jpeg` | [GitHub](https://github.com/Canadas7) / [LinkedIn](https://www.linkedin.com/in/nicholas-cañadas-682a21248/) |
