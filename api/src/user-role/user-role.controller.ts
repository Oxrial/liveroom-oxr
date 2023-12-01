import { Controller, Get } from '@nestjs/common'
import { UserRoleService } from './user-role.service'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('user-role')
@Controller('user-role')
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) {}

    @Get()
    findAll() {
        return this.userRoleService.findAll()
    }
}
