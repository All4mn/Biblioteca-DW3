import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import UsuariosRoutes from './features/usuarios/usuarios.routes.js'
import PessoasRoutes from './features/pessoas/pessoas.routes.js'
import AutoresRoutes from './features/autores/autores.routes.js'
import LivrosRoutes from './features/livros/livros.routes.js'
import EmprestimosRoutes from './features/emprestimos/emprestimos.routes.js'
import Categorias_generosRoutes from './features/categorias_generos/categorias_generos.routes.js'
import livros_autoresRoutes from './features/livros_autores/livros_autores.routes.js'
import FuncionariosRoutes from './features/funcionarios/funcionarios.routes.js'


import { AppError } from './errors/AppError.js'
import { swaggerOptions, swaggerUIoptions } from './swagger/swagger.js'


const app = fastify({
    logger: true
})

app.register(cors)

app.register(fastifySwagger, swaggerOptions)

app.register(fastifySwaggerUi, swaggerUIoptions)


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

app.register(UsuariosRoutes, {prefix: '/usuarios'})
app.register(PessoasRoutes, {prefix: '/pessoas'})
app.register(AutoresRoutes, {prefix: '/autores'})
app.register(LivrosRoutes, {prefix: '/livros'})
app.register(EmprestimosRoutes, {prefix: '/emprestimos'})
app.register(Categorias_generosRoutes, {prefix: '/categorias_generos'})
app.register(livros_autoresRoutes, {prefix: '/livros_autores'})
app.register(FuncionariosRoutes, {prefix: '/funcionarios'})

const start = async () => {
    try {
      await app.ready()
        await app.listen({ port: 3000 })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
