import { Injectable } from '@nestjs/common'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from './entities/permission.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly repo: Repository<Permission>) {}
    create(createPermissionDto: CreatePermissionDto) {
        return this.repo.save(createPermissionDto)
    }

    async findAll() {
        return await this.repo.find()
    }

    async findOne(id: number) {
        return await this.repo.findOne({ where: { id } })
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        const permission = await this.findOne(id)
        Object.assign(permission, updatePermissionDto)
        return this.repo.save(permission)
    }

    remove(id: number) {
        return this.repo.delete(id)
    }
}
