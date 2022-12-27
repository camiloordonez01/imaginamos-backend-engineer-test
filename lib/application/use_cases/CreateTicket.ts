import { v4 as uuidv4 } from 'uuid'

import { ErrorHandler, logger } from '../../infrastructure/handler'
import { randomNumber } from '../common/Helpers'
import messages from '../../../messages'

// Entities
import { TicketEntity } from '../../domain/entities/TicketEntity'

// Repository
import { TechnicianRepository } from '../../domain/repository/TechnicianRepository'

// Storage
import { TechnicianStorage } from '../../interfaces/storage/TechnicianStorage'

const technicianRepository = new TechnicianRepository(new TechnicianStorage())

export default async (): Promise<unknown> => {
    try {
        const technicians = await technicianRepository.getAll()
        if (technicians.length === 0) {
            throw new ErrorHandler(401, messages.LENGTH_TECHNICIANS)
        }

        const token = uuidv4()

        const ticket = new TicketEntity(
            token,
            technicians[randomNumber(technicians.length)]
        )
        await ticket.save()

        return {
            token,
        }
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file: 'GetProduct.ts',
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        return Promise.reject(error)
    }
}
