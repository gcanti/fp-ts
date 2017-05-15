export interface HKT<A> {}

export interface HKT2<A, B> {}

export interface HKT3<A, B, C> {}

export type HKTS = keyof HKT<any>

export type HKT2S = keyof HKT2<any, any>

export type HKT3S = keyof HKT3<any, any, any>
