/**
 * @file Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 */

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT3<URI, U, L, A> extends HKT2<URI, L, A> {
  readonly _U: U
}

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface HKT4<URI, X, U, L, A> extends HKT3<URI, U, L, A> {
  readonly _X: X
}

//
// inj: type-level dictionaries for HKTs: URI -> concrete type
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind<A> {}

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind2<L, A> {}

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind3<U, L, A> {}

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export interface URItoKind4<X, U, L, A> {}

//
// unions of URIs
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export type URIS = keyof URItoKind<any>

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS2 = keyof URItoKind2<any, any>

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS3 = keyof URItoKind3<any, any, any>

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type URIS4 = keyof URItoKind4<any, any, any, any>

//
// prj
//

/**
 * `* -> *` constructors
 * @since 2.0.0
 */
export type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any

/**
 * `* -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind2<URI extends URIS2, L, A> = URI extends URIS2 ? URItoKind2<L, A>[URI] : any

/**
 * `* -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind3<URI extends URIS3, U, L, A> = URI extends URIS3 ? URItoKind3<U, L, A>[URI] : any

/**
 * `* -> * -> * -> * -> *` constructors
 * @since 2.0.0
 */
export type Kind4<URI extends URIS4, X, U, L, A> = URI extends URIS4 ? URItoKind4<X, U, L, A>[URI] : any
