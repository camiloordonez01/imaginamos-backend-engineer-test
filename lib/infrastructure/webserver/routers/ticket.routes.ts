import express from 'express'

import { createTicket } from '../../../interfaces/controllers/TicketController'

const TicketRouter = express.Router()

TicketRouter.post('/', createTicket)

export default TicketRouter
