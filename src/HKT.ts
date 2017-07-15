export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}

// type-level dictionary for HKTs with one type parameter
export type HKTMap<T extends string> = { [K in T]: HKT<K, any> }

export interface URI2HKT<A> extends HKTMap<HKTS> {}

export type HKTS = keyof URI2HKT<any>

// type-level dictionary for HKTs with two type parameters
export type HKTMap2<T extends string> = { [K in T]: HKT2<K, any, any> }

export interface URI2HKT2<L, A> extends HKTMap2<HKT2S> {}

export type HKT2S = keyof URI2HKT2<any, any>
