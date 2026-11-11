# Interview Application

Aplicação de estudo para registrar entrevistas e avaliações de candidatos, com frontend Vue Material Dashboard e API Express/TypeORM sobre MySQL. O código inclui cadastro de usuários, consulta de entrevistas e controles de acesso por permissões. Autores do projeto: Paulo da Luz e Luan de Gregori.

[![Vue 2](https://img.shields.io/badge/Vue-2.6.3-4FC08D?logo=vue.js)](https://v2.vuejs.org/)
[![Boost](https://img.shields.io/badge/license-BSL--1.0-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🔌 API usage](#api)
- [🗂️ Project structure](#structure)
- [✅ Testing and quality](#testing)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- Formulário de nova entrevista e listagem de entrevistas no frontend.
- Cadastro de usuários e armazenamento de senha com bcrypt no backend.
- Edição, remoção e consulta de entrevistas, incluindo registros excluídos.
- HTTP Basic nas rotas protegidas e permissões `read`/`write` por usuário.
- Telas adicionais do template Vue Material Dashboard, preservadas no frontend.

<a id="technologies"></a>

## 🧪 Technologies

Cada componente tem seu próprio `package.json`, sem lockfile ou `engines.node`.

| Componente | Tecnologia | Declaração |
| --- | --- | --- |
| Frontend | [Vue](https://v2.vuejs.org/) | `2.6.3` |
| Frontend | [Vue CLI](https://cli.vuejs.org/) | `3.4.0` |
| Frontend | [Vue Material](https://vuematerial.io/) | `1.0.0-beta-8` |
| Frontend | [node-sass](https://github.com/sass/node-sass) | `4.11.0` |
| Frontend | [Axios](https://axios-http.com/docs/intro) | `^0.18.0` |
| Backend | [TypeScript](https://www.typescriptlang.org/docs/) | `^2.8.1` |
| Backend | [Express](https://expressjs.com/) | `^4.16.3` |
| Backend | [TypeORM](https://typeorm.io/) | `^0.2.16` |
| Backend | [mysql](https://github.com/mysqljs/mysql) | `^2.15.0` |
| Backend | [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | `^3.0.5` |

<a id="environment-setup"></a>

## 🛠️ Environment setup

Tenha Git, Node.js e acesso a um MySQL de desenvolvimento. A versão MySQL não é fixada. Para testar as dependências nativas antigas, foi escolhido **Node.js 10.24.1**, da geração suportada pelo `node-sass@4.11.0`. Essa versão histórica não é recomendação de runtime para uma implantação nova; uma atualização exige validação separada.

```bash
nvm install 10.24.1
nvm use 10.24.1
git clone https://github.com/paulodaluz/InterviewApplication.git
cd InterviewApplication/client
npm install
cd ../server
npm install
```

As instalações são independentes. Não há lockfiles para `npm ci`, hooks ou scripts `prepare`. Não instale Vue CLI, TypeScript ou nodemon globalmente: os manifestos os disponibilizam localmente quando a instalação conclui.

Configure seu MySQL em [server/ormconfig.json](server/ormconfig.json): `host`, `port`, `username`, `password` e `database`. A porta declarada é 3306. A opção `synchronize: true` permite ao TypeORM ajustar o schema automaticamente; use uma base exclusiva de desenvolvimento. As entidades são lidas de `build/entity/*.js`, portanto compile primeiro. Não existem migrações versionadas.

A URL da API e o header de autenticação do cliente estão diretamente em [client/src/services/Api.js](client/src/services/Api.js). A URL atual é `http://localhost:3001`. Configure somente credenciais fictícias de teste local; o header embutido no frontend não constitui armazenamento seguro de credenciais. O código não lê `.env` para essas configurações.

<a id="getting-started"></a>

## 🚀 Getting started

No terminal do backend, após a instalação:

```bash
cd server
./node_modules/.bin/tsc
npm run server
```

`npm start` executa em paralelo `tsc -w` e `nodemon build/index.js`. Não há script `build`; a compilação direta usa `tsconfig.json`. `node build/index.js` é a entrada compilada sem observador.

Em outro terminal, na raiz do repositório:

```bash
cd client
npm run dev
```

`dev` chama `serve`, que inicia o Vue CLI com `--open`. A URL padrão de desenvolvimento é `http://localhost:8080`; a CLI pode escolher outra porta se estiver ocupada. O backend fixa **3001** em `server/src/config/env_vars.ts`. O frontend redireciona a entrada para o dashboard e inclui páginas de usuário, tabela e nova entrevista.

O processo HTTP do backend pode abrir antes de a conexão MySQL terminar; isso não confirma que as rotas foram registradas. Teste uma rota existente somente após configurar a base. Encerre ambos os terminais com `Ctrl+C`.

<a id="api"></a>

## 🔌 API usage

Todos os caminhos usam a base `http://localhost:3001`, sem prefixo global.

| Método | Caminho | Controle implementado |
| --- | --- | --- |
| POST | `/user` | Sem middleware de autenticação |
| POST | `/newInterview` | Sem middleware de autenticação |
| PUT | `/editInterview/:id` | Basic + `write` |
| DELETE | `/deleteInterview/:id` | Basic + `write` |
| GET | `/searchAllInterviews` | Basic |
| GET | `/searchInterview/:user` | Basic + `read` |
| GET | `/searchInterview` | Basic |
| GET | `/allInterviewsDeleted` | Basic |

Exemplo de consulta com uma conta de teste já cadastrada:

```bash
curl -u 'usuario-exemplo:SENHA_FICTICIA' http://localhost:3001/searchAllInterviews
```

O middleware espera `Authorization: Basic ...`; não usa JWT. Campos e validações estão em `server/src/entity/`, `server/src/controller/` e `server/src/models/informationValidation.ts`. Consulte também a [especificação histórica](Documenta%C3%A7%C3%A3o/swagger.yaml), conferindo-a contra as rotas atuais.

<a id="structure"></a>

## 🗂️ Project structure

| Caminho | Responsabilidade |
| --- | --- |
| `client/src/pages/` | Telas e formulários Vue |
| `client/src/services/` | Cliente HTTP e chamadas da API |
| `client/src/routes/` | Navegação |
| `client/src/components/` e `client/src/assets/` | Componentes e recursos do dashboard |
| `server/src/config/` | Express e porta |
| `server/src/routes/` | Registro das rotas após conectar ao banco |
| `server/src/controller/` | Casos de uso e autorização |
| `server/src/entity/` | Entidades TypeORM |
| `server/src/models/` | Validações e erros |
| `Documentação/` | Materiais históricos de API |

<a id="testing"></a>

## ✅ Testing and quality

| Diretório/comando | Finalidade |
| --- | --- |
| `client`: `npm run build` | Gerar frontend em `dist/` |
| `client`: `npm run lint` | ESLint do Vue CLI; pode corrigir arquivos |
| `server`: `./node_modules/.bin/tsc` | Compilar para `build/` |
| `server`: `npm test` | Placeholder que encerra com erro; não é uma suíte |

Não há testes automatizados de integração configurados.

Com Node.js 10.24.1/npm 6.14.12, a instalação do frontend terminou, mas `npm run build` falhou porque `regenerator-runtime/runtime` não foi resolvido. A instalação do backend falhou em `bcrypt@3.0.8` (`node-pre-gyp`: “Completion callback never invoked”, código 6), e a tentativa de compilação falhou em declarações de tipos incompatíveis com o TypeScript antigo. Dependências transitivas também declararam engines superiores ao Node escolhido. Nenhuma dependência foi atualizada para contornar esses erros. A tentativa de iniciar o servidor Vue na porta temporária 4404 também apresentou o módulo ausente e não renderizou a interface; não foi produzida screenshot. `node build/index.js` no backend falhou com módulo `bcrypt` ausente. MySQL e operações funcionais não foram validados. Todos os processos de validação foram encerrados.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

| Situação | Verificação |
| --- | --- |
| Falha de instalação de node-sass/bcrypt | Confira Node compatível e disponibilidade do binário antigo. Compilação nativa pode pedir ferramentas não presentes; nenhuma foi instalada nesta tarefa. |
| Erros TypeScript em `node_modules` | Intervalos sem lockfile podem resolver tipos incompatíveis com TypeScript 2. |
| Backend abre, mas rotas não funcionam | Verifique a conexão MySQL e as entidades compiladas. |
| `401` nas consultas | Confira conta de teste, Basic e permissões `read`/`write`; o cliente tem um header fixo no código. |
| Frontend aponta para API errada | Ajuste a configuração direta de `client/src/services/Api.js` no seu ambiente. |

<a id="contributing"></a>

## 🤝 Contributing

Crie uma branch a partir de `master`, valide cada componente afetado e preserve os créditos de Paulo da Luz, Luan de Gregori e do template Creative Tim. Abra um pull request indicando testes, limites de execução e alterações realizadas. Não versione credenciais ou bases reais.

<a id="license"></a>

## 📜 License

O [LICENSE da raiz](LICENSE) contém **Boost Software License 1.0**. O frontend preserva a [MIT de Creative Tim, 2018](client/LICENSE.md), referente ao template. `server/package.json` declara `ISC`, em divergência com a licença da raiz; a revisão dessa declaração ficou pendente. Nenhum arquivo de licença existente foi substituído.

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
