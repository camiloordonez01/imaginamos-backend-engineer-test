import { ErrorHandler, logger } from '../../infrastructure/handler'
import messages from '../../../messages'

// Repository
import { TechnicianRepository } from '../../domain/repository/TechnicianRepository'
import { TicketRepository } from '../../domain/repository/TicketRepository'

// Storage
import { TechnicianStorage } from '../../interfaces/storage/TechnicianStorage'
import { TicketStorage } from '../../interfaces/storage/TicketStorage'

const technicianRepository = new TechnicianRepository(new TechnicianStorage())
const ticketRepository = new TicketRepository(new TicketStorage())

export default async (id: number): Promise<unknown> => {
    try {
        // Gets and validates the technician's id
        const technician = await technicianRepository.getById(id)
        if (technician === null) {
            throw new ErrorHandler(401, messages.NO_FOUND_TECHNICIAN)
        }

        // Obtains technical tickets
        const tickets = await ticketRepository.getByTechnician(technician.id)

        return tickets
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file: 'GetTicketsByTechnician.ts',
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        return Promise.reject(error)
    }
}
