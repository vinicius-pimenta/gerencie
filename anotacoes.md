<p> Inicializa o arquivo package.json </p>

`yarn init -y`

<p> Adiciona o express </p>

`yarn add express`

<p> Adiciona o typescript como dependência de desenvolvimento </p>

`yarn add typescript -D`

<p> Gera o arquivo tsconfig.json. É um arquivo que vai armazenar as configurações de como o typescript vai ser executado dentro desse projeto </p>

`yarn tsc --init`

<p> Converte o código dentro da pasta src em código javascript para a pasta dist </p>

`yarn tsc`

<p> Corrige problema do typescript de não reconhecer o módulo express </p>

`yarn add @types/express -D`

<p> Adiciona o ts-node-dev. É uma ferramenta que compila os projetos com Typescript e reinicia o projeto quando o arquivo é modificado. Ele faz o papel do tsc e do nodemon. </p>

`yarn add ts-node-dev -D`

<p> O --transpileOnly serve para não verificar se o código está certo ou errado na hora da execução. Já o --ignore-watch tem objetivo de igorar qualquer modificação feita na pasta node_modules. Esses 2 parâmetros melhora o desempenho da execução do script. </p>

`"dev:server": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"`

<p> Padrões de projeto com ESLint, Prettier e EditorConfig:
    <a> https://www.notion.so/Padr-es-de-projeto-com-ESLint-Prettier-e-EditorConfig-0b57b47a24724c859c0cf226aa0cc3a7 </a>
</p>

<p> Adiciona o ESLint nas dependências de desenvolvimento. </p>

`yarn add eslint -D`

<p> Inicia o ESLint </p>

`yarn eslint --init`

<p> Adiciona as dependências de desenvolvimento do ESLint </p>

`yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1 @typescript-eslint/parser@latest -D`

<p> Para que o NodeJS consiga entender arquivos Typescript nas importações é preciso instalar uma dependência que habilite essa funcionalidade </p>

`yarn add eslint-import-resolver-typescript -D`

<p> Esse comando vai adicionar 3 dependências que serão as responsáveis por fazer a formatação do código e também integrar o Prettier com o ESLint. </p>

`yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`

<p> Correção de alguns erros no ESLint com o prettier: <a> https://github.com/prettier/eslint-config-prettier/issues/100 </a></p>
