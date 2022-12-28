import { NextFunction, Request, Response } from 'express'

import { ResponseHandler } from '../../infrastructure/handler'
import { GetTicketsByTechnician } from '../../application/use_cases'

const getTicketsByTechnician = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { tecnico_id } = req.params
        next(
            new ResponseHandler(
                200,
                await GetTicketsByTechnician(Number(tecnico_id))
            )
        )
    } catch (error) {
        next(error)
    }
}

export { getTicketsByTechnician }
