import { _ } from '@/core/utils'

const whites = [
    // '/auth/login'
]
export const getWhites = () => whites.map(w => `${_('API_PREFIX')}/v${_('API_VERSION')}${w}`)
