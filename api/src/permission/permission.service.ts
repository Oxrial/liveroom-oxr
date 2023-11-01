import { Injectable } from '@nestjs/common'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from './entities/permission.entity'
import { Repository } from 'typeorm'
import { Result } from 'src/liveroom-common-oxr/types/result'

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly repo: Repository<Permission>) {}
    create(createPermissionDto: CreatePermissionDto) {
        return this.repo.save(createPermissionDto)
    }

    async findAll() {
        return new Result(await this.repo.find())
    }

    async findOne(pid: number) {
        return await this.repo.findOne({ where: { pid } })
    }

    async update(pid: number, updatePermissionDto: UpdatePermissionDto) {
        const permission = await this.findOne(pid)
        Object.assign(permission, updatePermissionDto)
        return this.repo.save(permission)
    }

    remove(pid: number) {
        return this.repo.delete(pid)
    }
}
