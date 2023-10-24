import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class CreateUserDto {
    @ApiProperty()
    uname: string

    @ApiProperty()
    uname_cn: string

    @ApiProperty()
    password: string

    @ApiProperty()
    email: string

    @ApiProperty()
    mobile: string

    @ApiProperty()
    tel: string

    @ApiProperty()
    @MaxLength(1)
    status: string
}
