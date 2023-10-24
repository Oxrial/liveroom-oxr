import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

    create(createUserDto: CreateUserDto) {
        return this.repo.save(createUserDto)
    }

    async findAll() {
        return await this.repo.find()
    }

    async findOneByUname(uname: string) {
        return await this.repo.findOne({ where: { uname } })
    }
    async findOne(uid: number) {
        return await this.repo.findOne({ where: { uid } })
    }

    async update(uid: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(uid)
        Object.assign(user, updateUserDto)
        return this.repo.save(user)
    }

    remove(uid: number) {
        return this.repo.delete(uid)
    }
}
