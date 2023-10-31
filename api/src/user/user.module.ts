import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserRole } from 'src/user-role/entities/user-role.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([UserRole])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
