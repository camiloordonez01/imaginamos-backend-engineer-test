import express from 'express'

import { getTicketsByTechnician } from '../../../interfaces/controllers/TechnicianController'

const TechnicianRouter = express.Router()

TechnicianRouter.get('/:tecnico_id/tickets', getTicketsByTechnician)

export default TechnicianRouter
