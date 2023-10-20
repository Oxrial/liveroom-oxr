// export class User {}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    uid!: number

    @Column()
    uname!: string
}
