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
        // Gets all the technicians and validates that at least one exists
        const technicians = await technicianRepository.getAll()
        if (technicians.length === 0) {
            throw new ErrorHandler(401, messages.LENGTH_TECHNICIANS)
        }

        // Obtains a random number to assign a technician
        const numberRandom = randomNumber(technicians.length)

        // Get a unique token for the ticket
        const token = uuidv4()

        // Create the ticket
        const ticket = new TicketEntity(token, technicians[numberRandom].id)
        await ticket.save()

        return {
            token,
            tecnico: technicians[numberRandom].nombre,
        }
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file: 'CreateTicket.ts',
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        return Promise.reject(error)
    }
}
