import { ConfigModule, ConfigType, registerAs } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
type JWT = {
    secret: string
    expiresIn: number
}
export const loadJWT = registerAs<JWT>('jwt', () => ({
    secret: process.env.JWT_SECRET,
    // 令牌接收者 通常是客户端应用程序的 URL 或主机名
    // audience: process.env.JWT_TOKEN_AUDIENCE,
    // jwt的令牌发行者 通常是用于生成令牌的服务器的 URL 或主机名
    // issuer: process.env.JWT_TOKEN_ISSUER,
    // 过期时间
    expiresIn: parseInt(process.env.JWT_EXPIRESIN, 10)
}))
