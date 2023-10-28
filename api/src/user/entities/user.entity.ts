import { CommEntity } from 'src/common/entity/comm.entity'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
@Entity('user')
export class User extends CommEntity {
    @PrimaryGeneratedColumn({ comment: '用户UID' })
    uid: number

    @Column({ comment: '用户码' })
    name: string

    @Column({ comment: '用户名' })
    name_cn: string

    @Column({ comment: '密码' })
    password: string

    @Column({ comment: '邮箱', nullable: true })
    email: string | null

    @Column({ comment: '手机号', length: 20 })
    mobile: string

    @Column({ comment: '电话', length: 20, nullable: true })
    tel: string | null
}
