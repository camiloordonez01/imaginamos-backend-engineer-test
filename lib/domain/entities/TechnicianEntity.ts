import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { TicketEntity } from './TicketEntity'

@Entity('technicians')
export class TechnicianEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @OneToMany(() => TicketEntity, (ticket) => ticket.technicians_id)
    tickets: TicketEntity[]

    constructor(id: number, nombre: string, tickets: TicketEntity[]) {
        this.id = id
        this.nombre = nombre
        this.tickets = tickets
    }
}
