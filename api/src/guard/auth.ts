import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { getWhites } from './white'
// import { AuthGuard as CanActivate } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { loadJWT } from '@/config/jwt.config'
import { ConfigType } from '@nestjs/config'
const UNAUTHORIZED = () => {
    throw new HttpException('THE TOKEN IS INVALID', HttpStatus.UNAUTHORIZED)
}
const FORBIDDEN = () => {
    throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
}
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService,
        @Inject(loadJWT.KEY)
        private readonly jwtConfiguration: ConfigType<typeof loadJWT>
    ) {}
    // 全局守卫
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isWhite = this.reflector.getAllAndOverride('isWhite', [context.getHandler(), context.getClass()])
        const whites = getWhites()

        // 获取请求头部数据
        const request = context.switchToHttp().getRequest()
        const url = request.url.split('?')[0]
        if (isWhite || whites.includes(url)) return true

        // 获取请求头中的 authorization 字段
        const authorization = context.switchToRpc().getData().headers.authorization
        !authorization && FORBIDDEN()

        const token = authorization.replace('Bearer ', '')
        // 验证token的合理性以及根据token做响应的操作
        !token && FORBIDDEN()
        try {
            // 校验 token
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.jwtConfiguration.secret,
                maxAge: this.jwtConfiguration.expiresIn
            })
            // // 管理员校验，是否是管理员，管理员才能访问主管权限的路由
            // if (res.isMaster == false && this.hasUrl(this.masterUrlList, request.url)) {
            //     return false
            // }
            // // 主管校验，是否是主管，主管才能访问主管权限的路由
            // if (res.isAdmin == false && this.hasUrl(this.adminUrlList, request.url)) {
            //     return false
            // }
            request['user'] = payload
        } catch (e) {
            UNAUTHORIZED()
        }
        return true
    }
}
