import express from 'express'
import TicketRouter from './ticket.routes'

const RouterMain = express.Router()

RouterMain.use('/tickets', TicketRouter)

export default RouterMain
