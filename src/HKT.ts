export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}

// type-level dictionary for HKTs with one type parameter
// export type HKTMap<T extends string> = { [K in T]: HKT<K, any> }

export interface URI2HKT<A> {}

export type HKTS = keyof URI2HKT<any>

(null! as URI2HKT<any>) as { [k in keyof URI2HKT<any>]: HKT<k, any> }

// type-level dictionary for HKTs with two type parameters
// export type HKTMap2<T extends string> = { [K in T]: HKT2<K, any, any> }

export interface URI2HKT2<L, A> {}

export type HKT2S = keyof URI2HKT2<any, any>

(null! as URI2HKT2<any, any>) as { [k in keyof URI2HKT2<any, any>]: HKT<k, any> }
