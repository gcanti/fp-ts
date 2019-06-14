/**
 * @file Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))
 */

/**
 * `* -> *` constructors
 */
export interface HKT<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

/**
 * `* -> * -> *` constructors
 */
export interface HKT2<URI, L, A> extends HKT<URI, A> {
  readonly _L: L
}

/**
 * `* -> * -> * -> *` constructors
 */
export interface HKT3<URI, U, L, A> extends HKT2<URI, L, A> {
  readonly _U: U
}

/**
 * `* -> * -> * -> * -> *` constructors
 */
export interface HKT4<URI, X, U, L, A> extends HKT3<URI, U, L, A> {
  readonly _X: X
}

//
// inj: type-level dictionaries for HKTs: URI -> concrete type
//

// tslint:disable-next-line: deprecation
export interface URItoKind<A> extends URI2HKT<A> {}

// tslint:disable-next-line: deprecation
export interface URItoKind2<L, A> extends URI2HKT2<L, A> {}

// tslint:disable-next-line: deprecation
export interface URItoKind3<U, L, A> extends URI2HKT3<U, L, A> {}

// tslint:disable-next-line: deprecation
export interface URItoKind4<X, U, L, A> extends URI2HKT4<X, U, L, A> {}

//
// unions of URIs
//

/**
 * `* -> *` constructors
 */
export type URIS = keyof URItoKind<any>
/**
 * `* -> * -> *` constructors
 */
export type URIS2 = keyof URItoKind2<any, any>
/**
 * `* -> * -> * -> *` constructors
 */
export type URIS3 = keyof URItoKind3<any, any, any>
/**
 * `* -> * -> * -> * -> *` constructors
 */
export type URIS4 = keyof URItoKind4<any, any, any, any>

//
// prj
//

/**
 * `* -> *` constructors
 */
export type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any
/**
 * `* -> * -> *` constructors
 */
export type Kind2<URI extends URIS2, L, A> = URI extends URIS2 ? URItoKind2<L, A>[URI] : any
/**
 * `* -> * -> * -> *` constructors
 */
export type Kind3<URI extends URIS3, U, L, A> = URI extends URIS3 ? URItoKind3<U, L, A>[URI] : any
/**
 * `* -> * -> * -> * -> *` constructors
 */
export type Kind4<URI extends URIS4, X, U, L, A> = URI extends URIS4 ? URItoKind4<X, U, L, A>[URI] : any

//
// deprecations
//

/**
 * Use `URItoKind2` instead
 * `* -> * -> *` constructors
 * @deprecated
 */
export interface URI2HKT2<L, A> {}
/**
 * Use `URItoKind3` instead
 * `* -> * -> * -> *` constructors
 * @deprecated
 */
export interface URI2HKT3<U, L, A> {}
/**
 * Use `URItoKind4` instead
 * `* -> * -> * -> * -> *` constructors
 * @deprecated
 */
export interface URI2HKT4<X, U, L, A> {}
/**
 * Use `URItoKind` instead
 * `* -> *` constructors
 * @deprecated
 */
export interface URI2HKT<A> {}
/**
 * Use `Kind` instead
 * @deprecated
 */
export type Type<URI extends URIS, A> = Kind<URI, A>
/**
 * Use `Kind2` instead
 * @deprecated
 */
export type Type2<URI extends URIS2, L, A> = Kind2<URI, L, A>
/**
 * Use `Kind3` instead
 * @deprecated
 */
export type Type3<URI extends URIS3, U, L, A> = Kind3<URI, U, L, A>
/**
 * Use `Kind4` instead
 * @deprecated
 */
export type Type4<URI extends URIS4, X, U, L, A> = Kind4<URI, X, U, L, A>
