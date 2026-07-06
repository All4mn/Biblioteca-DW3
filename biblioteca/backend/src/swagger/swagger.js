export const swaggerOptions = {
 openapi: {
    info: {
      title: 'API Biblioteca',
      description: 'API para gerenciamento de tarefas',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  }

}

export const swaggerUIoptions ={
  routePrefix: '/docs',
  swagger: {
    url: '/docs/json'
  }
}