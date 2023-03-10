// Storages
import { TechnicianStorage } from '../../interfaces/storage/TechnicianStorage'

// Entities
import { TechnicianEntity } from '../entities/TechnicianEntity'

export class TechnicianRepository {
    constructor(public storage: TechnicianStorage) {
        this.storage = storage
    }

    async getAll(): Promise<TechnicianEntity[]> {
        return this.storage.getAll()
    }

    async getById(id: number): Promise<TechnicianEntity | null> {
        return this.storage.getById(id)
    }
}
