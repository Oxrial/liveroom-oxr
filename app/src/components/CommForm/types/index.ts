import { Rule } from 'ant-design-vue/es/form'

export interface FormType {
    label: string
    name: string
    $fattrs?: Object
    type: string
    $attrs?: Object
    slot?: string
    form?: FormType[]
    children?: FormChildren
    rules?: Rule[]
}
export type FormChildren = Pick<FormType, 'type' | '$attrs'> & { options: Array<any> }
interface ModelProp {
    [key: string]: any
}
export interface FormProps {
    form: FormType[]
    model: ModelProp
}
export interface SlotScope {
    item: FormType
    model: ModelProp
}
