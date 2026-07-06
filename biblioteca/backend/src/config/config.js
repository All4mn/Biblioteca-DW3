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




