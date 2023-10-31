import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    uname: string

    @ApiProperty()
    unameCN: string

    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiProperty({ required: false })
    email?: string

    @ApiProperty({ required: false })
    mobile: string

    @ApiProperty({ required: false })
    tel?: string

    @ApiProperty()
    @MaxLength(1)
    status: string

    constructor(uname?: string, unameCN?: string, password?: string, email?: string, mobile?: string, tel?: string, status?: string) {
        this.uname = uname
        this.unameCN = unameCN
        this.password = password
        this.email = email
        this.mobile = mobile
        this.tel = tel
        this.status = status
    }
}
