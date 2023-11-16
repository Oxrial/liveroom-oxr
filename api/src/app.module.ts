import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from './role/role.module'
import { PermissionModule } from './permission/permission.module'
import { UserRoleModule } from './user-role/user-role.module'
import { AuthModule } from './auth/auth.module'
import { dbConfig, loadDB } from './config/db.config'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({ load: [loadDB] }),
        TypeOrmModule.forRootAsync(dbConfig),
        UserModule,
        RoleModule,
        PermissionModule,
        UserRoleModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
