import { HttpException, Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { RegisterUserDto } from './dto/register-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
    // 注册
    async register(registerUserDto: RegisterUserDto) {
        // 检查库中是否已经存在该用户
        const oldUser = await this.repo.findOne({ where: { uname: registerUserDto.uname } })
        if (oldUser) {
            throw new HttpException('用户名已存在', 200)
        }
        // encrypt
        const { uname, password, mobile } = registerUserDto
        const createUserDto = new CreateUserDto(uname, uname, password, mobile, null, null, '1')
        try {
            await this.repo.save(createUserDto)
            return 'Register success'
        } catch (error) {
            console.log(error)
            throw new HttpException('注册失败', 200)
        }
    }
    // 登录
    async login(user: LoginUserDto) {
        console.log('🚀 ~ file: user.service.ts:31 ~ UserService ~ login ~ user>>> :', user)
        const oldUser = await this.repo.findOne({ where: { uname: user.uname } })
        if (!oldUser) {
            throw new HttpException('用户名不存在', 200)
        }
        if (!(user.password === oldUser.password)) {
            throw new HttpException('密码错误', 200)
        }
        // token
        const token = 'AAA'
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
