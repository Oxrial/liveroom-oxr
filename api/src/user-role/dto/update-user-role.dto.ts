import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserRoleDto {
    @ApiProperty()
    id: number
}
