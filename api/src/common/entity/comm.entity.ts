import { CreateDateColumn, UpdateDateColumn, ValueTransformer } from 'typeorm'
import * as dayjs from 'dayjs'
const dateTransFormer = {
    to: v => v,
    from: v => dayjs(new Date(v + '')).format('YYYY-MM-DD HH:mm:ss')
} as ValueTransformer
export abstract class CommEntity {
    @CreateDateColumn({
        type: 'timestamp',
        comment: '创建时间',
        name: 'create_at',
        transformer: dateTransFormer
    })
    createAt: Date

    @UpdateDateColumn({
        type: 'timestamp',
        comment: '更新时间',
        name: 'update_at',
        transformer: dateTransFormer
    })
    updateAt: Date
}
