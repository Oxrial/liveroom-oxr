import { InjectRepository } from '@nestjs/typeorm'
import { PassportStrategy } from '@nestjs/passport'
import { IStrategyOptions, Strategy } from 'passport-local'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { Repository } from 'typeorm'
import { BadRequestException, HttpException } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'

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

    async validate(username: string, password: string) {
        const user = await this.repo.createQueryBuilder('user').addSelect('user.password').where('user.uname=:username', { username }).getOne()
        console.log('🚀 ~ file: local.authentication.strategy.ts:23 ~ AuthenticationGuard ~ validate ~ user:', user)

        // if (!user) {
        //     throw new BadRequestException('用户名不正确！')
        // }
        // pwd vali
        // if (!compareSync(password, user.password)) {
        //     throw new BadRequestException('密码错误！')
        // }
        if (!user) {
            throw new HttpException('用户名不存在', 200)
        }
        if (!(password === user.password)) {
            throw new HttpException('密码错误', 200)
        }

        return user
    }
}
