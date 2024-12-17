<h1 align="center">
   <br>
   <img src="frontend/src/assets/logo.svg" width="200" />
   <br>
   Controle de Estoque
   <br>
</h1>

<h4 align="center">Um sistema de controle de estoque feito com <a href="https://tauri.app/">Tauri</a>.</h4>

<p align="center">
   <img src="https://img.shields.io/badge/Tauri-FFB00C?logo=tauri&logoColor=000" />
   <img src="https://img.shields.io/badge/React-%2320232A.svg?logo=react&logoColor=%2361DAFB" />
   <img src="https://img.shields.io/badge/Vite-BD34FE?logo=vite&logoColor=FFC131" />
   <img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" />
   <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" />
   <img src="https://img.shields.io/badge/Tailwind%20CSS-%230B1120.svg?logo=tailwind-css&logoColor=38bdf8" />
   <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB" />
   <Img src="https://img.shields.io/badge/SQLite-%230F80CC.svg?logo=sqlite&logoColor=003B57" />
</p>

![Controle de Estoque - Tatu Bola](/screenshots/controle-de-estoque.png "Controle de Estoque - Tatu Bola")

Bem-vindo ao **Controle de Estoque - Tatu Bola**! Este é um projeto de aplicação desktop desenvolvida com **Tauri**, **React**, e **TypeScript** para o controle de estoque do **Tatu Bola Bar & Grill** de Campo Grande MS.

## Índice

- [Visão Geral](#visão-geral)
- [Imagens](#imagens)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

O **Controle de Estoque - Tatu Bola** permite que os usuários façam a gestão de inventário, incluindo adicionar, editar e remover produtos. Este sistema foi desenvolvido como uma aplicação desktop usando **Tauri**, integrando um frontend em **React** com backend **Express**.

## Imagens

<details>
<summary>Clique para abrir</summary>

![Lista de produtos](/screenshots/lista-de-produtos.png "Lista de produtos")
![Criar novo produto](/screenshots/criar-novo-produto.png "Criar novo produto")
![Estoque do produto](/screenshots/estoque-do-produto.png "Estoque do produto")
![Histórico de entradas e saídas](/screenshots/historico-de-ocorrencias.png "Histórico de entradas e saídas")
![Registro de entrada](/screenshots/registro-de-entrada.png "Registro de entrada")
![Adicionar produto à entrada](/screenshots/adicionar-produto-na-entrada.png "Adicionar produto à entrada")
![Registro de saída](/screenshots/registro-de-saida.png "Registro de saída")
![Adicionar produto à saída](/screenshots/adicionar-produto-na-saida.png "Adicionar produto à saída")

</details>

## Funcionalidades

- Registro de produtos, entradas e saídas.
- Aviso de vencimento dos produtos.
- Aviso de baixa quantidade de estoque.
- Histórico de movimentações de produtos no estoque.

## Pré-requisitos

Antes de iniciar, você precisará ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/en/)
- [Rust](https://www.rust-lang.org/) (necessário para o Tauri)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites) (para build e execução da aplicação)

## Instalação

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/seu-usuario/controle-estoque-tatu-bola.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd controle-estoque-tatu-bola/frontend
   ```

3. Instale as dependências do frontend:

   ```bash
   npm install
   ```

4. Instale as dependências do Tauri:

   ```bash
   cargo install tauri-cli
   ```

## Execução

1. Para rodar o ambiente de desenvolvimento, execute o comando:

   ```bash
   npm run tauri dev
   ```

   Isso iniciará o frontend com Vite e o backend Tauri em modo de desenvolvimento.

2. Para compilar a aplicação para produção:

   ```bash
   npm run build
   npm run tauri build
   ```

## Tecnologias Utilizadas

- [Tauri](https://tauri.app/)
- [Node.js](https://nodejs.org/)
- [Vite](https://vite.dev/)
- [TanStack Table](https://tanstack.com/table/latest/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)
- [ExpressJS](https://expressjs.com/)
- [Axios](https://axios-http.com/)

## Contribuição

Sinta-se à vontade para contribuir com este projeto! Aqui estão as etapas para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch:

   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

3. Faça suas alterações e commite-as:

   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```

4. Envie para o repositório remoto:

   ```bash
   git push origin feature/nova-funcionalidade
   ```

5. Abra um Pull Request no GitHub.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
