import { ApiProperty } from '@nestjs/swagger'

export class CreateUserRoleDto {
    @ApiProperty()
    uid: number
    @ApiProperty()
    rid: number
}
