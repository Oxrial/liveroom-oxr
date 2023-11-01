export class Result {
    code: number
    msg: string
    data: any
    constructor(data = null, msg = 'success', code = 1) {
        this.code = code
        this.msg = msg
        this.data = data
    }
}
