import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import * as path from 'path'
const K = {
    H: 'POSTGRES_HOST',
    P: 'POSTGRES_PORT',
    DB: 'POSTGRES_DATABASE',
    UN: 'POSTGRES_USER',
    PW: 'POSTGRES_PASSWORD'
}
const _ = (k: string) => process.env[k]
export const loadDB = () => ({
    host: _(K.H),
    port: Number(_(K.P)),
    database: _(K.DB),
    username: _(K.UN),
    password: _(K.PW)
})
export const dbConfig = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        const __ = (k: string) => config.get(k)
        return {
            type: 'postgres',
            host: __(K.H),
            port: +__(K.P),
            username: __(K.UN),
            password: __(K.PW),
            database: __(K.DB),
            entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
            logging: true,
            retryDelay: 500,
            retryAttempts: 3,
            logNotifications: true,
            // autoLoadEntities: true,
            synchronize: true
            // keepConnectionAlive: true
        } as TypeOrmModuleAsyncOptions
    }
}
