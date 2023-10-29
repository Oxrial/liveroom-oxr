import { ApiProperty } from '@nestjs/swagger'

export class LoginUser {
    @ApiProperty()
    uname: string

    @ApiProperty()
    password: string
}
