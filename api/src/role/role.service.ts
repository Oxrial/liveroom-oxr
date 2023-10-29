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

    async findOne(rid: number) {
        return await this.repo.findOne({ where: { rid } })
    }

    async update(rid: number, updateRoleDto: UpdateRoleDto) {
        const role = await this.findOne(rid)
        Object.assign(role, updateRoleDto)
        return this.repo.save(role)
    }

    remove(rid: number) {
        return this.repo.delete(rid)
    }
}
