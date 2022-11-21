# Cash

[![NPM](https://camo.githubusercontent.com/a581cd1e13be14972f2eca7065fa686ab5718b9c233570190f92be36ed39664e/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7265616374)](https://github.com/RangelMoreira/dscatalog/blob/main/LICENSE)

# Sobre o projeto

Cash é uma aplicação Full Stack web construída usando JavaScript

O software consiste em uma mini aplicação financeira, cujo objetivo seja possibilitar que usuários consigam realizar transferências internas entre si.

Neste projeto também foram trabalhados tópicos como testes com Jest. 

## Layout web

<p align="center">
<img height="650" src="frontend/src/assets/login.png" />
</p>

<p align="center">
<img height="650" src="frontend/src/assets/dashboard.png" />
</p>

<p align="center">
<img height="650" src="frontend/src/assets/pagtransfer.png" />
</p>

<p align="center">
<img height="650" src="frontend/src/assets/dashboard2.png" />
</p>

## Modelo conceitual

<p align="center">
<img height="650" src="frontend/src/assets/modelo.png" />
</p>
  
# Tecnologias utilizadas

## Back end

- JavaScript
- TypeScript
- Express
- Prisma
- JWT
- Jest
- SuperTest

## Front end

- HTML / JavaScript / TypeScript
- ReactJS
- TailwindCSS
- Axios
- React Hook Forms
- Hero icons
- React datePicker
- React Toastify
- Nookies
- Date-Fns

# Como executar o projeto

## Back end

Para executadar via docker(docker-compose)

  - Pré-requisitos: docker (docker-compose)

Para executadar localmente

  - Pré-requisitos: npm 

```
# clonar repositório
git clone git@github.com:sirAndre1337/cash.git

# entrar na pasta do projeto back end
cd backend

# executar o projeto com docker
 - criar o arquivo .env na raiz para que o Prisma(ORM) se connect
  DATABASE_URL="postgresql://postgres:admin@localhost:5432/ngCash?schema=public" apenas um Exemplo para se conectar localmente,
  olhe em 'https://www.prisma.io/docs/reference/database-reference/connection-urls' para mais exemplos.
- subir o container com o bd
    rodar o comando : docker-compose up bd
- Apos o BD estiver up subir o container da app backend
    rodar o comando : docker-compose up app

# executar o projeto localmente
 -  rodar o comando : npm install
 -  rodar o comando : npx prisma generete
 -  criar e configurar o arquivo .env na raiz do projeto para que o prisma se conecte ao banco de dados
 -  rodar o comando : npx prisma migrate dev (Para gerar as migrations)
 -  rodar o comando : npm run dev
 
```
## Front end

Para executadar via docker(docker-compose)

  - Pré-requisitos: docker (docker-compose)

Para executadar localmente

  - Pré-requisitos: npm 

```
# clonar repositório
git clone git@github.com:sirAndre1337/cash.git

# entrar na pasta do projeto back end
cd frontend

# executar o projeto com docker
- subir o container
    rodar o comando : docker-compose up app

# executar o projeto localmente
 -  rodar o comando : npm install
 -  rodar o comando : npm run dev
 
```


