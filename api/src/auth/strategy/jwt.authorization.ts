import { SetMetadata, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { AuthService } from 'src/auth/auth.service'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
// authorization 授权 守卫
export class AuthorizationGuard extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        } as StrategyOptions)
    }

    /** 校验 token */
    async validate({ uid, uname }: any) {
        return { uid, uname }
    }
}
