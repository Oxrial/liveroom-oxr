import { CommEntity } from 'src/common/entity/comm.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('role')
export class Role extends CommEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ comment: '角色名称' })
    name: string
}
