#!/bin/bash

read -p 'informe o projeto que voce queira inserir uma feature (NAO USE ESPAÇOS, USE MAIUSCULO): ' caminho
read -p 'informe o nome da feature que voce deseja criar: ' tarefa


if [ -d "$caminho/backend/src/features/$tarefa" ]; then
    echo "A feature mencionada ja existe"
    exit 1
fi

if [ ! -d "$caminho" ]; then
    echo "diretório mencionado é inexistente, verifique se há algum erro de digitação"
    exit 1
fi

mkdir "$caminho/backend/src/features/$tarefa"
cd "$caminho/backend/src/features/$tarefa"
echo "criando feature $tarefa em $caminho/backend/src/features/$tarefa"
sleep 2s


cat <<EOL >  ${tarefa}.routes.js
import Controller from './${tarefa}.controller.js';
import Repository from './${tarefa}.repository.js';
import Service from './${tarefa}.service.js';

export default async function ${tarefa^}Routes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/${tarefa}', async (req, res) => {
        return controller.listar(req, res)
    })
}
EOL

cat <<EOL > ${tarefa}.controller.js
class Controller {
    constructor(service) {
        this.service = service
    }

    async listar(req, res) {
        // Deixamos o erro subir para o Error Handler Global resolver de forma limpa
        const response = await this.service.listar()
        return res.send({ status: 'OK', data: response })
    }
}

export default Controller

EOL

cat <<EOL > ${tarefa}.repository.js
import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM ${tarefa}")).rows
  }
}

export default Repository

EOL

cat <<EOL > ${tarefa}.service.js
import { NotFound } from './${tarefa}.error.js'

class Service {
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

export default Service
EOL

cat <<EOL > ${tarefa}.error.js
import { AppError } from "../../errors/AppError.js";

export class NotFound extends AppError{
    constructor(){
    super("Response não encontrada",404)
    }
}

//tenha a liberdade de escrever novos erros para esta aplicação, ex: Erro de validação, erro pra submitar, etc
EOL
echo "terminando umas coisinhas"
sleep 1s

echo "lembre-se de inserir no index.js"
sleep 0.5s
echo "revise os arquivos"
sleep 0.5s
echo "verifique se os nomes estão de acordo, principalmente no repository"

