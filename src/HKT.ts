export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}

export interface HKT3<URI, U, L, A> extends HKT2<URI, L, A> {
  readonly _U: U
}

// type-level dictionaries for HKTs

export interface URI2HKT<A> {}
export interface URI2HKT2<L, A> {}
export interface URI2HKT3<U, L, A> {}

// URI constraints with dictionary integrity constraint

export type HKTS = (URI2HKT<any> & { never: HKT<never, never> })[keyof URI2HKT<any> | 'never']['_URI']
export type HKT2S = (URI2HKT2<any, any> & { never: HKT<never, never> })[keyof URI2HKT2<any, any> | 'never']['_URI']
export type HKT3S = (URI2HKT3<any, any, any> & { never: HKT<never, never> })[
  | keyof URI2HKT3<any, any, any>
  | 'never']['_URI']

// HKTAs<U, A> is the same as URI2HKT<A>[U], but checks for URI constraints

export type HKTAs<URI extends HKTS, A> = URI2HKT<A>[URI]
export type HKT2As<URI extends HKT2S, L, A> = URI2HKT2<L, A>[URI]
export type HKT3As<URI extends HKT3S, U, L, A> = URI2HKT3<U, L, A>[URI]

// Type-level integrity check

/* tslint:disable */
(null! as URI2HKT<any>) as { [k in keyof URI2HKT<any>]: HKT<k, any> }
(null! as URI2HKT2<any, any>) as { [k in keyof URI2HKT2<any, any>]: HKT2<k, any, any> }
(null! as URI2HKT3<any, any, any>) as { [k in keyof URI2HKT3<any, any, any>]: HKT3<k, any, any, any> }
/* tslint:enable */
