import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly repo: Repository<Role>) {}
    create(createRoleDto: CreateRoleDto) {
        return this.repo.save(createRoleDto)
    }

    async findAll() {
        return await this.repo.find()
    }

    async findOne(id: number) {
        return await this.repo.findOne({ where: { id } })
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        const role = await this.findOne(id)
        Object.assign(role, updateRoleDto)
        return this.repo.save(role)
    }

    remove(id: number) {
        return this.repo.delete(id)
    }
}
