import { NextFunction, Request, Response } from 'express'

import { ResponseHandler } from '../../infrastructure/handler'
import { CreateTicket } from '../../application/use_cases'

const createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        next(new ResponseHandler(201, await CreateTicket()))
    } catch (error) {
        next(error)
    }
}

export { createTicket }
