#!/bin/bash

echo "Aguarde um momento..."
echo "Bem vindo ao alfinha!"
read -p "Digite o nome do projeto inicial: " nome_projeto

if [ -d "$nome_projeto" ]; then
    echo "O projeto '$nome_projeto' já existe. Por favor, escolha outro nome."
    exit 1
fi

if [ -z "$nome_projeto" ]; then
    nome_projeto="$(date +%d-%m-%Y)"
fi

echo "Projeto sendo criado na pasta: $nome_projeto"
mkdir "$nome_projeto"
cd "$nome_projeto" || exit

# Guardamos o caminho absoluto da raiz do projeto para não se perder com "cd .."
RAIZ_PROJETO=$(pwd)

# =========================================
# CRIAÇÃO DO BACKEND
# =========================================
mkdir 'backend'
cd 'backend' || exit

echo "Criando o arquivo de configuração do backend..."
npm init -y > /dev/null 2>&1

# Injeta o tipo ES Modules e o script dev
node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json')); pkg.type = 'module'; pkg.scripts = { ...pkg.scripts, 'dev': 'node --watch src/index.js' }; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));"

echo "Instalando dependências (Fastify e Cors)..."
npm install fastify @fastify/cors pg dotenv > /dev/null 2>&1

echo "@url = http://localhost:3000" > http.http
touch DATABASE_URL= > .env

# Criação da estrutura de pastas de forma limpa (sem risco de errar o cd ..)
mkdir -p src/features/tarefas
mkdir -p src/errors
mkdir -p src/config

# --- Criando src/index.js ---
cat <<EOL > src/index.js
import fastify from 'fastify'
import cors from '@fastify/cors'
import TarefaRoutes from './features/tarefas/tarefas.routes.js'
import { AppError } from './errors/AppError.js'

const app = fastify({
    logger: true
})

app.register(cors)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message
    })
  }

  console.error('🔥 ERRO INTERNO:', error)

  return reply.status(500).send({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.register(TarefaRoutes)

const start = async () => {
    try {
        await app.listen({ port: 3000 })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
EOL

# --- Criando arquivos da feature Tarefas ---
cat <<EOL > src/features/tarefas/tarefas.routes.js
import TarefaController from "./tarefas.controller.js";
import TarefaRepository from "./tarefas.repository.js";
import TarefaService from "./tarefas.service.js";

export default async function TarefaRoutes(app) {
    const repository = new TarefaRepository()
    const service = new TarefaService(repository)
    const controller = new TarefaController(service)
    
    app.get('/tarefas', async (req, res) => {
        return controller.listar(req, res)
    })
}
EOL

cat <<EOL > src/features/tarefas/tarefas.error.js
import { AppError } from "../../errors/AppError.js";

export class NotFound extends AppError{
    constructor(){
    super("Response não encontrada",404)
    }
}

//tenha a liberdade de escrever novos erros para esta aplicação, ex: Erro de validação, erro pra submitar, etc
EOL

cat <<EOL > src/features/tarefas/tarefas.controller.js
class TarefaController {
    constructor(service) {
        this.service = service
    }

    async listar(req, res) {
        // Deixamos o erro subir para o Error Handler Global resolver de forma limpa
        const response = await this.service.listar()
        return res.send({ status: 'OK', data: response })
    }
}

export default TarefaController
EOL

cat <<EOL > src/features/tarefas/tarefas.service.js
import { NotFound } from './tarefas.error.js'

class TarefaService {
    constructor(repository) {
        this.repository = repository
    }

    async listar() {
        const response = await this.repository.listar()
        if (!response || response.length === 0) {
            // Boa prática: usando o AppError customizado que você criou!
            throw new NotFound()
        }
        return response
    }
}

export default TarefaService
EOL

cat <<EOL > src/features/tarefas/tarefas.repository.js
import database from '../../config/config.js'

class TarefaRepository {
    async listar() {
        return await database.query(`SELECT * FROM tarefas`).rows
  }
}

export default TarefaRepository
EOL

# --- Criando o AppError.js ---
cat <<EOL > src/errors/AppError.js
export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.name = 'AppError'
  }
}
EOL

# --- Criando o config.js ---
cat <<EOL > src/config/config.js
import pgk from 'pg' 
import dotenv from 'dotenv'
import { AppError } from '../errors/AppError.js'
dotenv.config()

const { Pool } = pgk

export class ConnectionError extends AppError {
    constructor() {
        super('Erro a conectar ao banco de dados')
        this.statusCode = 400
    }
}


class database{
    constructor() {
        this.pool = new Pool({
            connectionString:process.env.DATABASE_URL,

        })
    }

    async connection(){
        const connection = await this.pool.connect()
        if(!connection){
            throw new ConnectionError()
        }
    }

    async query(text,params){
        return this.pool.query(text,params)
    }
}


export default new database()




EOL

echo "Backend criado com sucesso!"

# =========================================
# CONFIGURAÇÃO DO FRONTEND (CONDICIONAL)
# =========================================
# Forçamos o retorno para a raiz real do projeto de forma segura
cd "$RAIZ_PROJETO" || exit

read -p "Criar um Frontend também? (y/n): " -r resposta

if [[ "$resposta" =~ [yY] ]]; then
    echo "Criando o arquivo de configuração do frontend com Vite..."
    
    # Resolvido: O --yes na posição correta impede travamentos
    # npm -y create vite@latest frontend -- --template react
    # O 'yes n' fica enviando a letra 'n' e apertando Enter automaticamente
yes n | npx create-vite frontend --template react > /dev/null 2>&1
    
    cd frontend || exit
    echo "Instalando dependências do frontend (pode demorar um pouco)..."
    npm install > /dev/null 2>&1
    cd .. # Volta de forma segura para a raiz
    echo "Frontend criado com sucesso!" 
else
    echo "Frontend não criado. Caso necessário, crie manualmente."
fi

echo "========================================================="
echo "🎉 Projeto '$nome_projeto' criado com sucesso! Desfrute-o!"
echo "========================================================="