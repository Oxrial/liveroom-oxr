import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Result } from 'src/liveroom-common-oxr/types/result'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    createToken(user: Partial<User>) {
        return this.jwtService.sign(user)
    }

    login({ uid, uname }: User) {
        const token = this.createToken({ uid, uname })
        return new Result({ token, uid }, 'Login success')
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
