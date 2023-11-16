import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { AuthenticationGuard } from './strategy/local.authentication'
import { AuthorizationGuard } from './strategy/jwt.authorization'
import { User } from '../user/entities/user.entity'
import { ConfigModule } from '@nestjs/config'
import { jwtConfig, loadJWT } from '../config/jwt.config'
import { JwtModule } from '@nestjs/jwt'
@Module({
    imports: [ConfigModule.forFeature(loadJWT), JwtModule.registerAsync(jwtConfig), TypeOrmModule.forFeature([User]), PassportModule],
    controllers: [AuthController],
    providers: [AuthService, AuthenticationGuard, AuthorizationGuard]
})
export class AuthModule {}
