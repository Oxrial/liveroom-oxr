import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('role')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto)
    }

    @Get()
    findAll() {
        return this.roleService.findAll()
    }

    @Get(':rid')
    findOne(@Param('rid') rid: string) {
        return this.roleService.findOne(+rid)
    }

    @Patch(':rid')
    update(@Param('rid') rid: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(+rid, updateRoleDto)
    }

    @Delete(':rid')
    remove(@Param('rid') rid: string) {
        return this.roleService.remove(+rid)
    }
}
