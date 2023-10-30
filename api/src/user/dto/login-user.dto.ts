import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
    @ApiProperty()
    uname: string

    @ApiProperty()
    password: string
}
