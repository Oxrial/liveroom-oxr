export type Meta = {
    hidden?: boolean
    title?: string
    icon?: string
    svg?: string
    color?: string
}
export type Route = {
    path: string
    name: string
    meta: Meta
    redirect?: string
    children?: Route[]
}
