import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class CreateRoleDto {
    @ApiProperty()
    rname: string
}
