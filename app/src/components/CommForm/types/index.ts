import { Rule } from 'ant-design-vue/es/form'
export interface FormType {
    rules?: Rule[]
    label: string
    name: string
    type: string
    stype?: string
    stypeOptions?: Array<any>
    slot?: string
    forms?: FormType[]
    $fattrs?: Object
    $attrs?: Object
    $sattrs?: Object
}

export interface FormProps {
    form: FormType[]
    model: Object
}
export interface SlotScope {
    item: FormType
    model: Object
}
// export interface Slots {
//     [key: string]: SlotScope
// }
