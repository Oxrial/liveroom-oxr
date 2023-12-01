import { InjectRepository } from '@nestjs/typeorm'
import { PassportStrategy } from '@nestjs/passport'
import { IStrategyOptions, Strategy } from 'passport-local'
import { Repository } from 'typeorm'
import { HttpException } from '@nestjs/common'
import { User } from '@/user/entities/user.entity'
import rsa from '@/config/rsa.config'

// pwd guard
export class AuthenticationGuard extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ) {
        super({
            usernameField: 'uname',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    dencrypt(pwd: string) {
        rsa.decrypt(pwd, 'utf8')
    }

    async validate(username: string, password: string) {
        const user = await this.repo.createQueryBuilder('user').addSelect('user.password').where('user.uname=:username', { username }).getOne()

        if (!user) {
            throw new HttpException('用户名不存在', 200)
        }
        if (!(this.dencrypt(password) === this.dencrypt(user.password))) {
            throw new HttpException('密码错误', 200)
        }

        return user
    }
}
