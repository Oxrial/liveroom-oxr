import { CommEntity } from 'src/common/entity/comm.entity'
import { UserRole } from 'src/user-role/entities/user-role.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm'
@Entity('user')
export class User extends CommEntity {
    @PrimaryGeneratedColumn({ name: 'id', comment: '用户UID' })
    uid: number

    @Column({ name: 'name', comment: '用户码' })
    uname: string

    @Column({ name: 'name_cn', comment: '用户名' })
    unameCN: string

    @Column({ comment: '密码' })
    password: string

    @Column({ comment: '邮箱', nullable: true })
    email: string | null

    @Column({ comment: '手机号', length: 20, nullable: true })
    mobile: string

    @Column({ comment: '电话', length: 20, nullable: true })
    tel: string | null

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRole: UserRole
}
