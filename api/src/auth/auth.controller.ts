import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
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
    @UseGuards(AuthGuard('local'))
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto, @Request() { user }) {
        return this.authService.login(user)
    }
}
