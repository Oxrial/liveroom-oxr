import { CommEntity } from 'src/common/entity/comm.entity'
import { Role } from 'src/role/entities/role.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_role')
export class UserRole extends CommEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Role, role => role.userRole)
    @JoinColumn({ name: 'rid' })
    role: Role

    @ManyToOne(() => User, user => user.userRole)
    @JoinColumn({ name: 'uid' })
    user: User
}
