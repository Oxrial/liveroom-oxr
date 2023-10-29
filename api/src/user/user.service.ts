import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
    // 注册
    async register(createUserDto: CreateUserDto) {
        // 检查库中是否已经存在该用户
        const oldUser = await this.repo.findOne({ where: { uname: createUserDto.uname } })
        if (oldUser) {
            throw new HttpException('用户名已存在', 200)
        }
        // encrypt
        // createUserDto.password = await this.repo.hashPassword(createUserDto.password)
        try {
            await this.repo.save(createUserDto)
            return 'Register success'
        } catch (error) {
            console.log(error)
            throw new HttpException('注册失败', 200)
        }
    }
    // 登录
    async login(user: User) {
        const oldUser = await this.repo.findOne({ where: { uname: user.uname } })
        if (!oldUser) {
            throw new HttpException('用户名不存在', 200)
        }
        if (!(user.password === oldUser.password)) {
            throw new HttpException('密码错误', 200)
        }
        // token
        const token = ''
        return token
    }

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
