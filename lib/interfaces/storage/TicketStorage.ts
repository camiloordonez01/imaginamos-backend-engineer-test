import { Repository } from 'typeorm'
import Storage from './Storage'

import { logger } from '../../infrastructure/handler'

import { TicketEntity } from '../../domain/entities/TicketEntity'

export class TicketStorage extends Storage {
    repository: Repository<TicketEntity>
    constructor() {
        super()
        this.repository = this.database.getRepository(TicketEntity)
    }
}
