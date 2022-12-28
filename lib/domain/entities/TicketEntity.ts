import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    BaseEntity,
} from 'typeorm'
import { TechnicianEntity } from './TechnicianEntity'

@Entity('tickets')
export class TicketEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    token: string

    @Column()
    technicians_id: number

    constructor(token: string, technicians_id: number) {
        super()
        this.token = token
        this.technicians_id = technicians_id
    }
}
