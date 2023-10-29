import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.create(createPermissionDto)
    }

    @Get()
    findAll() {
        return this.permissionService.findAll()
    }

    @Get(':pid')
    findOne(@Param('pid') pid: string) {
        return this.permissionService.findOne(+pid)
    }

    @Patch(':pid')
    update(@Param('pid') pid: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionService.update(+pid, updatePermissionDto)
    }

    @Delete(':pid')
    remove(@Param('pid') pid: string) {
        return this.permissionService.remove(+pid)
    }
}
