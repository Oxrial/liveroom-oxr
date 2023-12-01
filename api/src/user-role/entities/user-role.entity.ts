import { CommEntity } from '@/common/entity/comm.entity'
import { Role } from '@/role/entities/role.entity'
import { User } from '@/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_role')
export class UserRole extends CommEntity {
    @PrimaryGeneratedColumn()
    id: number

    // 声明外键字段
    @Column({ comment: '用户关联UID' })
    uid: number

    @Column({ comment: '角色关联RID' })
    rid: number

    // 使用ManyToOne将上述列与外键Join指定name
    @ManyToOne(() => Role, role => role.userRole)
    @JoinColumn({ name: 'rid' })
    role: Role

    @ManyToOne(() => User, user => user.userRole)
    @JoinColumn({ name: 'uid' })
    user: User
}
