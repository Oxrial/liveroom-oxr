import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
        return this.userService.create(createUserDto)
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get('findByUname')
    findOneByUname(@Query('uname') uname: string) {
        return this.userService.findOneByUname(uname)
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
