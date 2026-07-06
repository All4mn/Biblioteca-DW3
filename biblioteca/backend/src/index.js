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
