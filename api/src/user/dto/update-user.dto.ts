import { ApiProperty, PartialType } from '@nestjs/swagger'
import { RegisterUserDto } from './register-user.dto'

export class UpdateUserDto extends PartialType(RegisterUserDto) {
    @ApiProperty()
    uid: number
}
