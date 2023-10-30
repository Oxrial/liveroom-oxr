interface LoginUser {
    uname: string
    password: string
}
type LoginInfo = { remember: boolean } & LoginUser
export type { LoginUser, LoginInfo }
