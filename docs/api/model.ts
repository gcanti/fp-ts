export interface Module {
  type: 'module'
  module: string
  types: Array<Type>
  datas: Array<Data>
  functions: Array<Function>
  consts: Array<Const>
}

export interface Type {
  type: 'type'
  name: string
  signature: string
  description: string | null
}

export interface Data {
  type: 'data'
  name: string
  signature: string
  description: string | null
  instances: Array<Instance>
  methods: Array<Method>
}

export interface Instance {
  type: 'instance'
  name: string
  signature: string | null
  description: string | null
}

export interface Method {
  type: 'method'
  name: string
  signature: string
  description: string | null
}

export interface Function {
  type: 'function'
  name: string
  signature: string
  description: string | null
}

export interface Const {
  type: 'const'
  name: string
  signature: string
  description: string | null
}
