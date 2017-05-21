export interface HKT<A, U = any, V = any> {
}

export type HKTS = keyof HKT<any>

export interface HKT2<A, B> {}

export interface HKT3<A, B, C> {}

export type HKT2S = keyof HKT2<any, any>

export type HKT3S = keyof HKT3<any, any, any>
