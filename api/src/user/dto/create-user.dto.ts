import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    uname: string

    @ApiProperty()
    unameCN: string

    @ApiProperty()
    password: string

    @ApiProperty({ required: false })
    email?: string

    @ApiProperty()
    mobile: string

    @ApiProperty({ required: false })
    tel?: string

    @ApiProperty()
    @MaxLength(1)
    status: string
}
