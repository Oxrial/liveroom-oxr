import * as user from './apis/user'
import * as rsa from './apis/rsa'
import { Result } from './types'

const api = { ...user, ...rsa }

export const checkOk = (res: any) => (res as Result).code === 1
export type * from './types'

export * from './http'
export default api
