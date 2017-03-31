export interface HKT<A> {}

export interface HKT2<A, B> {}

export type HKTS = keyof HKT<any>

export type HKT2S = keyof HKT2<any, any>
