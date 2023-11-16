import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    mobileCode() {
        // 手机号验证码
    }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto)
    }

    // @Post('login')
    // login(@Body() loginUserDto: LoginUserDto) {
    //     return this.userService.login(loginUserDto)
    // }

    @Post('logout')
    logout(@Body() token) {
        return this.userService.logout(token)
    }

    // @Get()
    // findAll() {
    //     return this.userService.findAll()
    // }

    @Get('findByUname')
    findOneByUname(@Query('uname') name: string) {
        return this.userService.findOneByUname(name)
    }
    @Get('findRoleByUname')
    findRoleByUname(@Query('uname') uname: string) {
        return this.userService.findRoleByUname(uname)
    }

    @ApiOperation({ summary: '获取用户信息' })
    @ApiBearerAuth() // swagger文档设置token
    @UseGuards(AuthGuard('jwt'))
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
