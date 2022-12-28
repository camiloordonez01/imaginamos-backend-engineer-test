import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { TicketEntity } from './TicketEntity'

@Entity('technicians')
export class TechnicianEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    constructor(id: number, nombre: string) {
        this.id = id
        this.nombre = nombre
    }
}
