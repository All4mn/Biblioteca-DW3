import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import TarefaRoutes from './features/tarefas/tarefas.routes.js'
import UsuariosRoutes from './features/usuarios/usuarios.routes.js'
import PessoasRoutes from './features/pessoas/pessoas.routes.js'
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

app.register(TarefaRoutes)

app.register(UsuariosRoutes, {prefix: '/usuarios'})
app.register(PessoasRoutes, {prefix: '/pessoas'})

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
