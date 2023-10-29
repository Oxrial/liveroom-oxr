import { CommEntity } from 'src/common/entity/comm.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('permission')
export class Permission extends CommEntity {
    @PrimaryGeneratedColumn({ name: 'id', comment: '权限ID' })
    pid: number

    @Column({ name: 'name', comment: '权限名称' })
    pname: string

    @Column({ nullable: true })
    description: string

    @Column({ name: 'type', comment: '权限类型' })
    permissionType: string
}
