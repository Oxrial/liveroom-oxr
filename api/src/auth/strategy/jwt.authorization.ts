import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { User } from '@/user/entities/user.entity'
// authorization 授权 守卫
export class AuthorizationGuard extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
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
