import { ApiProperty } from '@nestjs/swagger'
import { isNotEmpty } from 'class-validator'

export class CreateUserRoleDto {
    @ApiProperty()
    uid: number

    @ApiProperty()
    rid: number
}
