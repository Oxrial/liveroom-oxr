import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiTags } from '@nestjs/swagger'
import '@/config/rsa.config'
import { White } from '@/guard/white.decorator'
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    mobileCode() {
        // 手机号验证码
    }

    @HttpCode(HttpStatus.OK)
    @White()
    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto)
    }

    @HttpCode(HttpStatus.OK)
    @White()
    @Get('logout')
    logout() {
        return this.userService.logout()
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get('findByUname')
    findOneByUname(@Query('uname') name: string) {
        return this.userService.findOneByUname(name)
    }
    @Get('findRoleByUname')
    findRoleByUname(@Query('uname') uname: string) {
        return this.userService.findRoleByUname(uname)
    }

    // @ApiOperation({ summary: '获取用户信息' })
    // @ApiBearerAuth() // swagger文档设置token
    // @UseGuards(AuthGuard('jwt'))
    @Get(':uid')
    findOne(@Param('uid') uid: string, @Request() req) {
        return this.userService.findOne(+uid)
    }

    @Patch(':uid')
    update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+uid, updateUserDto)
    }

    @Delete(':uid')
    remove(@Param('uid') uid: string) {
        return this.userService.remove(+uid)
    }
}
