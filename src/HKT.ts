export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}

// type-level dictionaries for HKTs

export interface URI2HKT<A> {}
export interface URI2HKT2<L, A> {}

// URI constrains with dictionary integrity check

export type HKTS = URI2HKT<any>[keyof URI2HKT<any>]['_URI']

export type HKT2S = URI2HKT2<any, any>[keyof URI2HKT2<any, any>]['_URI']

// HKTAs<U, A> is the same as URI2HKT<A>[U], but checks for URI constraints

export type HKTAs<URI extends HKTS, A> = URI2HKT<A>[URI]

export type HKT2As<URI extends HKT2S, L, A> = URI2HKT2<L, A>[URI]
