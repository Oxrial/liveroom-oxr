import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from './role/role.module'
import { PermissionModule } from './permission/permission.module'
import { UserRoleModule } from './user-role/user-role.module'

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            // host: '192.168.100.10',
            // port: 5432,
            host: '127.0.0.1',
            port: 8650,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            logging: true,
            retryDelay: 500,
            retryAttempts: 3,
            logNotifications: true,
            // autoLoadEntities: true,
            synchronize: true
            // keepConnectionAlive: true
        }),
        RoleModule,
        PermissionModule,
        UserRoleModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
