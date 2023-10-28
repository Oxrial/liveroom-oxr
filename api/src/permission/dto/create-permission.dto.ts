import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class CreatePermissionDto {
    @ApiProperty({
        description: '权限名称'
    })
    name: string
    @ApiProperty({
        description: '权限描述'
    })
    description: string
    @ApiProperty({
        description: '权限类型'
    })
    @MaxLength(1)
    permissionType: string
}
