import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '192.168.100.10',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [__dirname + '/**/*.entity{.ts,.js}']
            //     // autoLoadEntities: true,
            //     // synchronize: true,
            //     // keepConnectionAlive: true
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
