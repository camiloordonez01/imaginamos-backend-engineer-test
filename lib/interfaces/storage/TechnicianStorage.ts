import { Repository } from 'typeorm'
import { Storage } from './Storage'

import { logger } from '../../infrastructure/handler'

import { TechnicianEntity } from '../../domain/entities/TechnicianEntity'

export class TechnicianStorage extends Storage {
    repository: Repository<TechnicianEntity>
    constructor() {
        super()
        this.repository = this.database.getRepository(
            TechnicianEntity
        ) as Repository<TechnicianEntity>
    }

    async getAll(): Promise<TechnicianEntity[]> {
        try {
            const technicians = await this.repository.find()

            return technicians
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

    async getById(id: number): Promise<TechnicianEntity | null> {
        try {
            const technician = await this.repository.findOneBy({ id })

            return technician
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
}
