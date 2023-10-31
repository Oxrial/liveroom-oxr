import { Injectable } from '@nestjs/common'
import { UserRole } from './entities/user-role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserRoleDto } from './dto/create-user-role.dto'

@Injectable()
export class UserRoleService {
    constructor(@InjectRepository(UserRole) private readonly repo: Repository<UserRole>) {}
    async registerWithUser(createUserRoleDto: CreateUserRoleDto) {
        return await this.repo.save(createUserRoleDto)
    }
}
