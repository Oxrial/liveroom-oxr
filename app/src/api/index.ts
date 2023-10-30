import * as user from './apis/user'
import { Result } from './types'

const api = { ...user }

export const checkOk = (res: Result) => res.code === 1
export type * from './types'
export default api
