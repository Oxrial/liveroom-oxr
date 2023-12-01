import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { AuthenticationGuard } from './strategy/local.authentication'
import { User } from '../user/entities/user.entity'
import { ConfigModule } from '@nestjs/config'
import { loadJWT } from '../config/jwt.config'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@/guard/auth'
@Module({
    imports: [ConfigModule.forFeature(loadJWT), JwtModule.registerAsync(loadJWT.asProvider()), TypeOrmModule.forFeature([User]), PassportModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthenticationGuard,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AuthModule {}
