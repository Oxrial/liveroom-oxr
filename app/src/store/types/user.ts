interface LoginUser {
    uname: string
    password: string
    mobile?: string
}
export type { LoginUser }
export type LoginUserInfo = Omit<LoginUser, 'mobile'>
