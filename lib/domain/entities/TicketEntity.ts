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

    @ManyToOne(() => TechnicianEntity, (technician) => technician.tickets)
    technicians_id: TechnicianEntity

    constructor(token: string, technicians_id: TechnicianEntity) {
        super()
        this.token = token
        this.technicians_id = technicians_id
    }
}
