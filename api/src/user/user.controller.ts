import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    mobileCode() {
        // 手机号验证码
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto)
    }

    @Post()
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto)
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get('findByUname')
    findOneByUname(@Query('uname') name: string) {
        return this.userService.findOneByUname(name)
    }
    @Get(':uid')
    findOne(@Param('uid') uid: string) {
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
