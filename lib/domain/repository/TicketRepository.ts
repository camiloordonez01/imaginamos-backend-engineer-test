// Storages
import { TicketStorage } from '../../interfaces/storage/TicketStorage'

// Entities
import { TicketEntity } from '../entities/TicketEntity'

export class TicketRepository {
    constructor(public storage: TicketStorage) {
        this.storage = storage
    }

    async getByTechnician(technicians_id: number): Promise<TicketEntity[]> {
        return this.storage.getByTechnician(technicians_id)
    }
}
