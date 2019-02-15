//
// Defunctionalization
//

// * -> * constructors
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

// * -> * -> * constructors
export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}

// * -> * -> * -> * constructors
export interface HKT3<URI, U, L, A> extends HKT2<URI, L, A> {
  readonly _U: U
}

// * -> * -> * -> * -> * constructors
export interface HKT4<URI, X, U, L, A> extends HKT3<URI, U, L, A> {
  readonly _X: X
}

//
// inj: type-level dictionaries for HKTs: URI -> concrete type
//

// * -> * constructors
export interface URI2HKT<A> {}
// * -> * -> * constructors
export interface URI2HKT2<L, A> {}
// * -> * -> * -> * constructors
export interface URI2HKT3<U, L, A> {}
// * -> * -> * -> * -> * constructors
export interface URI2HKT4<X, U, L, A> {}

//
// unions of URIs
//

// * -> * constructors
export type URIS = keyof URI2HKT<any>
// * -> * -> * constructors
export type URIS2 = keyof URI2HKT2<any, any>
// * -> * -> * -> * constructors
export type URIS3 = keyof URI2HKT3<any, any, any>
// * -> * -> * -> * -> * constructors
export type URIS4 = keyof URI2HKT4<any, any, any, any>

//
// prj
//

// * -> * constructors
export type Type<URI extends URIS, A> = {} & URI2HKT<A>[URI]
// * -> * -> * constructors
export type Type2<URI extends URIS2, L, A> = {} & URI2HKT2<L, A>[URI]
// * -> * -> * -> * constructors
export type Type3<URI extends URIS3, U, L, A> = {} & URI2HKT3<U, L, A>[URI]
// * -> * -> * -> * -> * constructors
export type Type4<URI extends URIS4, X, U, L, A> = {} & URI2HKT4<X, U, L, A>[URI]
