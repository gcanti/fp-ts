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

export interface HKT4<URI, X, U, L, A> extends HKT3<URI, U, L, A> {
  readonly _X: X
}

// type-level dictionaries for HKTs

export interface URI2HKT<A> {}
export interface URI2HKT2<L, A> {}
export interface URI2HKT3<U, L, A> {}
export interface URI2HKT4<X, U, L, A> {}

// URI constraints with dictionary integrity constraint

export type URIS = (URI2HKT<any> & { never: HKT<never, never> })[keyof URI2HKT<any> | 'never']['_URI']
export type URIS2 = (URI2HKT2<any, any> & { never: HKT<never, never> })[keyof URI2HKT2<any, any> | 'never']['_URI']
export type URIS3 = (URI2HKT3<any, any, any> & { never: HKT<never, never> })[
  | keyof URI2HKT3<any, any, any>
  | 'never']['_URI']
export type URIS4 = (URI2HKT4<any, any, any, any> & { never: HKT<never, never> })[
  | keyof URI2HKT4<any, any, any, any>
  | 'never']['_URI']

export type Type<URI extends URIS, A> = {} & URI2HKT<A>[URI]
export type Type2<URI extends URIS2, L, A> = {} & URI2HKT2<L, A>[URI]
export type Type3<URI extends URIS3, U, L, A> = {} & URI2HKT3<U, L, A>[URI]
export type Type4<URI extends URIS4, X, U, L, A> = {} & URI2HKT4<X, U, L, A>[URI]

// Type-level integrity check

// tslint:disable:no-unused-expression
(null! as URI2HKT<any>) as { [k in keyof URI2HKT<any>]: HKT<k, any> }
(null! as URI2HKT2<any, any>) as { [k in keyof URI2HKT2<any, any>]: HKT2<k, any, any> }
(null! as URI2HKT3<any, any, any>) as { [k in keyof URI2HKT3<any, any, any>]: HKT3<k, any, any, any> }
(null! as URI2HKT4<any, any, any, any>) as { [k in keyof URI2HKT4<any, any, any, any>]: HKT4<k, any, any, any, any> }
