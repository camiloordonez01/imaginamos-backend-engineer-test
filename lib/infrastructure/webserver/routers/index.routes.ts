import express from 'express'
import TicketRouter from './ticket.routes'
import TechnicianRouter from './technician.routes'

const RouterMain = express.Router()

RouterMain.use('/tickets', TicketRouter)
RouterMain.use('/tecnicos', TechnicianRouter)

export default RouterMain
