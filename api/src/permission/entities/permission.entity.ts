import { CommEntity } from 'src/common/entity/comm.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('permission')
export class Permission extends CommEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    permissionType: string
}
