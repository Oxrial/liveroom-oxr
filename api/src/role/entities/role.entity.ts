import { CommEntity } from 'src/common/entity/comm.entity'
import { UserRole } from 'src/user-role/entities/user-role.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('role')
export class Role extends CommEntity {
    @PrimaryGeneratedColumn({ name: 'id', comment: '角色ID' })
    rid: number

    @Column({ name: 'name', comment: '角色名称' })
    rname: string

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRole: UserRole
}
