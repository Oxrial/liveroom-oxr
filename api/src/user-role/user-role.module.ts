import { Module } from '@nestjs/common'
import { UserRoleService } from './user-role.service'
import { UserRoleController } from './user-role.controller'
import { UserRole } from './entities/user-role.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([UserRole])],
    controllers: [UserRoleController],
    providers: [UserRoleService]
})
export class UserRoleModule {}
