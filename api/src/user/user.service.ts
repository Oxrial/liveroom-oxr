import { HttpException, Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { RegisterUserDto } from './dto/register-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UserRole } from 'src/user-role/entities/user-role.entity'
import { CreateUserRoleDto } from 'src/user-role/dto/create-user-role.dto'
import { Result } from 'src/liveroom-common-oxr/types/result'
import { Role } from 'src/role/entities/role.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
        @InjectRepository(UserRole) private readonly urrepo: Repository<UserRole>
    ) {}
    // 注册
    async register(registerUserDto: RegisterUserDto) {
        // 检查库中是否已经存在该用户
        const oldUser = await this.repo.findOne({ where: { uname: registerUserDto.uname } })
        if (oldUser) {
            throw new HttpException('用户名已存在', 200)
        }
        // encrypt
        const { uname, password, mobile } = registerUserDto
        const createUserDto = new CreateUserDto(uname, uname, password, null, mobile, null, '1')
        try {
            await this.repo.save(createUserDto)
            const newUser = await this.repo.findOne({ where: { uname: createUserDto.uname } })
            await this.urrepo.save(new CreateUserRoleDto(newUser.uid, 3))
            return new Result('Register success')
        } catch (error) {
            console.log(error)
            throw new HttpException('注册失败', 200)
        }
    }
    // 登录
    async login(user: LoginUserDto) {
        const oldUser = await this.repo.findOne({ where: { uname: user.uname, status: '1' } })
        if (!oldUser) {
            throw new HttpException('用户名不存在', 200)
        }
        if (!(user.password === oldUser.password)) {
            throw new HttpException('密码错误', 200)
        }
        // token
        const token = 'AAA'
        return new Result({ token, uid: oldUser.uid }, 'Login success')
    }

    logout(token) {
        return new Result('logout')
    }

    create(createUserDto: CreateUserDto) {
        return this.repo.save(createUserDto)
    }

    async findAll() {
        return await this.repo.find()
    }

    async findOneByUname(uname: string) {
        return await this.repo.findOne({ where: { uname, status: '1' } })
    }
    async findRoleByUname(uname: string) {
        const conn = this.urrepo.manager.connection
        const user = await this.findOneByUname(uname)
        const userRole = conn
            .createQueryBuilder(UserRole, 'userRole')
            .select('userRole', 'userRole.*')
            .leftJoinAndSelect('userRole.role', 'role')
            .where('userRole.uid = :uid', { uid: user.uid })
            .andWhere('role.status = :status', { status: '1' })
            .getOne()
        return userRole
    }
    async findOne(uid: number) {
        return new Result(await this.repo.findOne({ where: { uid } }))
    }

    async update(uid: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(uid)
        Object.assign(user.data, updateUserDto)
        this.repo.save(user.data)
        return new Result()
    }

    remove(uid: number) {
        return this.repo.delete(uid)
    }
}
