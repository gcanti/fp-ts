import { Option } from '../../src/Option'

export interface Module {
  type: 'module'
  module: string
  datas: Array<Data>
}

export interface Data {
  type: 'data'
  name: string
  signature: string
  description: Option<string>
  methods: Array<Method>
  instances: Array<Instance>
}

export interface Method {
  type: 'method'
  name: string
  signature: string
  description: Option<string>
}

export interface Instance {
  type: 'instance'
  name: string
  signature: Option<string>
  description: Option<string>
}

// export interface Module {
//   type: 'module'
//   module: string
//   types: Array<Type>
//   datas: Array<Data>
//   functions: Array<Function>
//   consts: Array<Const>
// }

// export interface Type {
//   type: 'type'
//   name: string
//   signature: string
//   description: string | null
// }

// export interface Data {
//   type: 'data'
//   name: string
//   signature: string
//   description: string | null
//   instances: Array<Instance>
//   methods: Array<Method>
// }

// export interface Method {
//   type: 'method'
//   name: string
//   signature: string
//   description: string | null
// }

// export interface Function {
//   type: 'function'
//   name: string
//   signature: string
//   description: string | null
// }

// export interface Const {
//   type: 'const'
//   name: string
//   signature: string
//   description: string | null
// }
