import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class RegisterUserDto {
    @ApiProperty()
    @IsNotEmpty()
    uname: string

    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiProperty()
    mobile: string
}
