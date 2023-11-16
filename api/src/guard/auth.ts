import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { whites } from './white'
const UNAUTHORIZED = () => {
    throw new HttpException('THE TOKEN IS INVALID', HttpStatus.UNAUTHORIZED)
}
const FORBIDDEN = () => {
    throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
}
@Injectable()
export class AuthGuard implements CanActivate {
    // 全局守卫
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 获取请求头部数据
        const request = context.switchToHttp().getRequest()
        const url = request.url.split('?')[0]
        console.log('🚀 ~ file: auth.ts:17 ~ AuthGuard ~ canActivate ~ url:', url)
        // 白名单验证
        whites.includes(url) && UNAUTHORIZED()

        // 获取请求头中的 authorization 字段
        const authorization = context.switchToRpc().getData().headers.authorization
        !authorization && FORBIDDEN()

        const token = authorization.replace('Bearer ', '')
        // 验证token的合理性以及根据token做响应的操作
        if (token) {
            try {
                // 校验 token
                const jwtService = new JwtService()
                const res = jwtService.verify(token)
                // // 管理员校验，是否是管理员，管理员才能访问主管权限的路由
                // if (res.isMaster == false && this.hasUrl(this.masterUrlList, request.url)) {
                //     return false
                // }
                // // 主管校验，是否是主管，主管才能访问主管权限的路由
                // if (res.isAdmin == false && this.hasUrl(this.adminUrlList, request.url)) {
                //     return false
                // }
                return res
            } catch (e) {
                UNAUTHORIZED()
            }
        } else FORBIDDEN()
    }
}
