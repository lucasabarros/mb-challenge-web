# MB Web Challenge

Este projeto é uma aplicação de cadastro de usuários que diferencia entre Pessoa Física e Pessoa Jurídica. O processo de cadastro é dividido em quatro etapas:

- **Seleção de Email e Tipo de Usuário**: O usuário fornece seu email e seleciona o tipo de usuário (Pessoa Física ou Pessoa Jurídica).
- **Informações Básicas**: Coleta de informações básicas específicas para Pessoa Física ou Pessoa Jurídica, conforme selecionado na etapa anterior.
- **Senha**: O usuário define uma senha para a conta.
- **Revisão e Edição**: Permite ao usuário revisar todas as informações fornecidas e realizar edições, se necessário, antes da submissão final.

A aplicação utiliza um frontend moderno com Vue 3 e um backend básico em Node.js com Express para simular a recepção de dados via API.


## Versões
- **Vue**: 3.4.37
- **Node.js**: 16.20.2
- **Npm**: 8.19.4
- **Vite**: 5.4.1


## Clonar o Projeto
Para clonar o projeto, execute o seguinte comando:
`git clone https://github.com/lucasabarros/mb-challenge-web.git`


## Instalar Dependências
Certifique-se que esteja no diretório **mb-challenge-web/** e instale as dependências com o comando: `npm install`


## Configurar
Certifique-se de ter as seguintes versões do Node.js e do Npm para evitar incompatibilidades:
- **Node.js**: 16.20.2
- **Npm**: 8.19.4


## Executar
Para iniciar o servidor de desenvolvimento e o backend, utilize os seguintes comandos em dois terminais separados.

<br>

**FRONTEND (roda na porta 3001)**: http://localhost:3001.

Navegue até o diretório do projeto e execute: `npm run dev`

<br>

**BACKEND (roda na porta 3000)**: Tela inicial da API: http://localhost:3000/registration.

Navegue até o diretório **frontend-mb-web/api/** e execute: `npm start`

## Testar
Para executar os testes unitários, use o comando: `npm test`

Os testes estão localizados em **mb-challenge-web/tests/unit/(aqui)**.

## Build
Para criar uma versão de produção do aplicativo, execute: `npm run build`
