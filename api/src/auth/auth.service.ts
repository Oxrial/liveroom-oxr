import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { loadJWT } from '@/config/jwt.config'
import { Result } from '@/core/types'
import { User } from '@/user/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(loadJWT.KEY)
        private readonly jwtConfiguration: ConfigType<typeof loadJWT>
    ) {}

    async login({ uid, uname }: User) {
        return new Result({ token: await this.jwtService.signAsync({ uid, uname }, this.jwtConfiguration), uid }, 'Login success')
    }

    // /**
    //  * 生成 token 与 刷新 token
    //  * @param payload
    //  * @returns
    //  */
    // genToken(payload: { id: number }) {
    //     const accessToken = `Bearer ${this.jwtService.sign(payload)}`
    //     const refreshToken = this.jwtService.sign(payload, {
    //         expiresIn: this.config.get('jwt.refreshExpiresIn')
    //     })
    //     return { accessToken, refreshToken }
    // }

    // /**
    //  * 生成刷新 token
    //  */
    // refreshToken(id: number): string {
    //     return this.jwtService.sign({ id })
    // }
}
