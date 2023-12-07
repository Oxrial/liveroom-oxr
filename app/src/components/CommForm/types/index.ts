import { Rule } from 'ant-design-vue/es/form'

export interface FormItemProps {
    label: string
    name: string
    $fattrs?: Object
    type: string
    $attrs?: Object
    slot?: string
    items?: FormItemProps[]
    children?: ItemChildren
    rules?: Rule[]
}
export type ItemChildren = Pick<FormItemProps, 'type' | '$attrs'> & { options: Array<any> }
interface ModelProp {
    [key: string]: any
}
export interface FormProps {
    form: FormItemProps[]
    model: ModelProp
}
export interface SlotScope {
    item: FormItemProps
    model: ModelProp
}
