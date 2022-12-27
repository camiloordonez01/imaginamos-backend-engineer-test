import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { logger } from '../handler'

import { TechnicianEntity } from '../../domain/entities/TechnicianEntity'
import { TicketEntity } from '../../domain/entities/TicketEntity'

const { HOST_DB, PORT_DB, USER_DB, PASSWORD_DB, SCHEMA_DB } = process.env

class DataBase {
    static instance: DataBase | null = null
    private appDataSource: DataSource

    private constructor() {
        this.appDataSource = new DataSource({
            type: 'mysql',
            host: HOST_DB,
            port: Number(PORT_DB),
            username: USER_DB,
            password: PASSWORD_DB,
            database: SCHEMA_DB,
            synchronize: false,
            logging: false,
            entities: [TechnicianEntity, TicketEntity],
            subscribers: [],
            migrations: [],
        })
    }

    private async startConnection(): Promise<void | Error> {
        try {
            await this.appDataSource.initialize()
            console.log('Data Source has been initialized!')
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                logger.crit({
                    level: 'crit',
                    file: 'database/index.ts',
                    message: `${error.message}`,
                    stack: error.stack,
                })
            }
            return Promise.reject(error)
        }
    }

    static createConnection(): DataBase {
        if (DataBase.instance === null) {
            DataBase.instance = new DataBase()
            DataBase.instance.startConnection()
        }
        return DataBase.instance
    }

    getRepository(
        entity: EntityTarget<ObjectLiteral>
    ): Repository<ObjectLiteral> {
        return this.appDataSource.getRepository(entity)
    }
}

export default DataBase
