import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from '@/user/dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { White } from '@/guard/white.decorator'
import { Result } from '@/core/types'
import rsa from '@/config/rsa.config'
// authentication 认证
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    /**
     * local 检查用户密码与加密后的数据库间是否一致
     * @param user
     * @returns
     */
    @HttpCode(HttpStatus.OK)
    @White()
    @UseGuards(AuthGuard('local'))
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto, @Request() { user }) {
        return this.authService.login(user)
    }
    @HttpCode(HttpStatus.OK)
    @White()
    @Get('rsa-public')
    getPublicKey() {
        return new Result(rsa.exportKey('public'))
    }
    @Get('user')
    getUser(@Request() req) {
        return new Result(req.user)
    }
}
