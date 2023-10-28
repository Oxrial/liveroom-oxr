import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class CreateRoleDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    @MaxLength(1)
    status: string
}
