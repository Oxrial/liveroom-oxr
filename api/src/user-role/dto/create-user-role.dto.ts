import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    uid: number

    @ApiProperty()
    @IsNotEmpty()
    rid: number

    constructor(uid?: number, rid?: number) {
        this.uid = uid
        this.rid = rid
    }
}
