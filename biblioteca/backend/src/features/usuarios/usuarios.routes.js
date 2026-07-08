import Controller from './usuarios.controller.js';
import Repository from './usuarios.repository.js';
import Service from './usuarios.service.js';
import {
    createUsuarioBodySchema,
    pessoaIdParamSchema,
    usuarioEmprestimosResponseSchema,
    usuarioIdParamSchema,
    usuarioResponseSchema,
    usuariosListResponseSchema,
    usuarioToggleResponseSchema
} from '../../schemas/usuarios.schema.js';

export default async function UsuariosRoutes(app) {
    const repository = new Repository();
    const service = new Service(repository);
    const controller = new Controller(service);

    app.get('/', {
        schema: {
            tags: ['Usuarios'],
            summary: 'Listar usuários',
            description: 'Retorna todos os usuários cadastrados no sistema, incluindo os dados da pessoa vinculada.',
            response: {
                200: usuariosListResponseSchema
            }
        },
        handler: async (req, res) => controller.listar(req, res)
    });

    app.get('/:id', {
        schema: {
            tags: ['Usuarios'],
            summary: 'Buscar usuário por ID',
            description: 'Retorna um usuário específico com base no identificador informado.',
            params: usuarioIdParamSchema,
            response: {
                200: usuarioResponseSchema
            }
        },
        handler: async (req, res) => controller.findById(req, res)
    });

    app.post('/', {
        schema: {
            tags: ['Usuarios'],
            summary: 'Criar usuário',
            description: 'Cria um novo usuário vinculando uma pessoa cadastrada ao sistema.',
            body: createUsuarioBodySchema,
            response: {
                200: usuarioResponseSchema
            }
        },
        handler: async (req, res) => controller.create(req, res)
    });

    app.put('/:id', {
        schema: {
            tags: ['Usuarios'],
            summary: 'Alternar status do usuário',
            description: 'Altera o estado ativo/inativo do usuário informado.',
            params: usuarioIdParamSchema,
            response: {
                200: usuarioToggleResponseSchema
            }
        },
        handler: async (req, res) => controller.delete(req, res)
    });

    app.get('/pessoa/:id', {
        schema: {
            tags: ['Usuarios'],
            summary: 'Buscar usuário por pessoa',
            description: 'Retorna o usuário vinculado ao identificador de pessoa informado.',
            params: pessoaIdParamSchema,
            response: {
                200: usuarioResponseSchema
            }
        },
        handler: async (req, res) => controller.findByPessoaIdInUsuario(req, res)
    });

    app.get('/emprestimos/:id', {
        schema: {
            tags: ['Usuarios'],
            summary: 'Listar empréstimos do usuário',
            description: 'Retorna todos os empréstimos associados ao usuário informado.',
            params: usuarioIdParamSchema,
            response: {
                200: usuarioEmprestimosResponseSchema
            }
        },
        handler: async (req, res) => controller.listAllEmprestimos(req, res)
    });
}
