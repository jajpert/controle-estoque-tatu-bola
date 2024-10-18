
# Controle de Estoque - Tatu Bola

Bem-vindo ao **Controle de Estoque - Tatu Bola**! Este é um projeto de aplicação desktop desenvolvida com **Tauri**, **React**, e **TypeScript** para gerenciar o controle de estoque do bar Tatu Bola de Campo Grande MS.

## Índice
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral
O **Controle de Estoque - Tatu Bola** permite que os usuários façam a gestão de inventário, incluindo adicionar, editar e remover produtos. Este sistema foi desenvolvido como uma aplicação desktop usando **Tauri**, integrando um frontend em **React** com backend **Express**.

## Funcionalidades
- Adicionar novos produtos ao estoque
- Atualizar informações de produtos
- Listar e visualizar produtos cadastrados
- Remover produtos do estoque
- Navegação entre diferentes seções da aplicação

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
- **Tauri**: Framework para criar aplicações desktop com tecnologias web.
- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Express**: Framework para o backend em Node.js.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **Vite**: Ferramenta para o desenvolvimento do frontend.
- **Tailwind CSS**: Framework para estilização rápida com classes utilitárias.

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
