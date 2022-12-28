import { Repository } from 'typeorm'
import { Storage } from './Storage'

import { logger } from '../../infrastructure/handler'

import { TicketEntity } from '../../domain/entities/TicketEntity'

export class TicketStorage extends Storage {
    repository: Repository<TicketEntity>
    constructor() {
        super()
        this.repository = this.database.getRepository(
            TicketEntity
        ) as Repository<TicketEntity>
    }

    async getByTechnician(technicians_id: number): Promise<TicketEntity[]> {
        try {
            const tickets = await this.repository.findBy({
                technicians_id,
            })

            return tickets
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
