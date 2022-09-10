/**
 * @since 3.0.0
 */
import type { Applicative, Applicative2C } from './Applicative'
import type { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import type { Chain2C } from './Chain'
import type { ChainRec2C } from './ChainRec'
import type { Comonad2 } from './Comonad'
import type { Either } from './Either'
import type { Extend2 } from './Extend'
import type { Foldable2 } from './Foldable'
import { identity, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { Monad2C } from './Monad'
import type { Monoid } from './Monoid'
import type { Pointed2C } from './Pointed'
import type { Semigroup } from './Semigroup'
import type { Semigroupoid2 } from './Semigroupoid'
import type { Traversable2 } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type Writer<W, A> = readonly [A, W]

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const writer = <W>(w: W) => <A>(a: A): Writer<W, A> => [a, w]

/**
 * Appends a value to the accumulator
 *
 * @category constructors
 * @since 3.0.0
 */
export const tell: <W>(w: W) => Writer<W, void> = (w) => [undefined, w]

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const fst = <W, A>(t: Writer<W, A>): A => t[0]

/**
 * @since 3.0.0
 */
export const snd = <W, A>(t: Writer<W, A>): W => t[1]

/**
 * Alias of [`fst`](#fst).
 *
 * @since 3.0.0
 */
export const evaluate: <W, A>(fa: Writer<W, A>) => A = fst

/**
 * Alias of [`snd`](#snd).
 *
 * @since 3.0.0
 */
export const execute: <W, A>(fa: Writer<W, A>) => W = snd

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap = <W, A>(t: Writer<W, A>): Writer<A, W> => [snd(t), fst(t)]

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, readonly [A, W]> = (fa) => {
  const [a, w] = fa
  return [[a, w], w]
}

/**
 * Applies the returned function to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export const pass: <W, A>(fa: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A> = (fa) => {
  const [[a, f], w] = fa
  return [a, f(w)]
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @category combinators
 * @since 3.0.0
 */
export const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, readonly [A, B]> = (f) => (fa) => {
  const [a, w] = fa
  return [[a, f(w)], w]
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @category combinators
 * @since 3.0.0
 */
export const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A> = (f) => (fa) => {
  const [a, w] = fa
  return [a, f(w)]
}

// -------------------------------------------------------------------------------------
// type class operations
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] = (f) => (fa) => {
  const [a, w] = fa
  return [f(a), w]
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export const mapLeft: Bifunctor2<URI>['mapLeft'] = (f) => (fa) => {
  const [a, w] = fa
  return [a, f(w)]
}

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const bimap = <W, G, A, B>(mapSnd: (e: W) => G, mapFst: (a: A) => B) => (t: Writer<W, A>): Writer<G, B> => [
  mapFst(fst(t)),
  mapSnd(snd(t))
]

/**
 * Maps a function over the first component of a `Writer`.
 *
 * Alias of [`map`](#map)
 *
 * @since 3.0.0
 */
export const mapFst: Functor2<URI>['map'] = map

/**
 * Maps a function over the second component of a `Writer`.
 *
 * Alias of [`mapLeft`](#mapleft)
 *
 * @since 3.0.0
 */
export const mapSnd: Bifunctor2<URI>['mapLeft'] = mapLeft

/**
 * @category type class operations
 * @since 3.0.0
 */
export const compose: Semigroupoid2<URI>['compose'] = (bc) => (ab) => [fst(bc), snd(ab)]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extend: Extend2<URI>['extend'] = (f) => (wa) => [f(wa), snd(wa)]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extract: Comonad2<URI>['extract'] = fst

/**
 * Derivable from `Extend`.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const duplicate: <W, A>(t: Writer<W, A>) => Writer<W, Writer<W, A>> = /*#__PURE__*/ extend(identity)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const reduce: Foldable2<URI>['reduce'] = (b, f) => (fa) => f(b, fst(fa))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const foldMap: Foldable2<URI>['foldMap'] = () => (f) => (fa) => f(fst(fa))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const reduceRight: Foldable2<URI>['reduceRight'] = (b, f) => (fa) => f(fst(fa), b)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const traverse: Traversable2<URI>['traverse'] = <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>) => <W>(
  t: Writer<W, A>
): HKT<F, Writer<W, B>> =>
  pipe(
    f(fst(t)),
    F.map((b) => [b, snd(t)])
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Writer'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Writer: Writer<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  bimap,
  mapLeft: mapSnd
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map: mapFst
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Semigroupoid: Semigroupoid2<URI> = {
  compose
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad2<URI> = {
  map: mapFst,
  extend,
  extract
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable2<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable2<URI> = {
  map: mapFst,
  traverse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <W>(M: Monoid<W>): Pointed2C<URI, W> => ({
  of: (a) => [a, M.empty]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(S: Semigroup<W>): Apply2C<URI, W> => ({
  map,
  ap: (fa) => (fab) => {
    const [f, w1] = fab
    const [a, w2] = fa
    return [f(a), S.concat(w2)(w1)]
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <W>(M: Monoid<W>): Applicative2C<URI, W> => {
  const A = getApply(M)
  const P = getPointed(M)
  return {
    map,
    ap: A.ap,
    of: P.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getChain = <W>(S: Semigroup<W>): Chain2C<URI, W> => {
  return {
    map,
    chain: (f) => (ma) => {
      const [a, w1] = ma
      const [b, w2] = f(a)
      return [b, S.concat(w2)(w1)]
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => {
  const P = getPointed(M)
  const C = getChain(M)
  return {
    map,
    of: P.of,
    chain: C.chain
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getChainRec<M>(M: Monoid<M>): ChainRec2C<URI, M> {
  const chainRec = <A, B>(f: (a: A) => readonly [Either<A, B>, M]) => (a: A): readonly [B, M] => {
    let result: readonly [Either<A, B>, M] = f(a)
    let acc: M = M.empty
    let s: Either<A, B> = fst(result)
    while (_.isLeft(s)) {
      acc = M.concat(snd(result))(acc)
      result = f(s.left)
      s = fst(result)
    }
    return [s.right, M.concat(snd(result))(acc)]
  }

  return {
    chainRec
  }
}
