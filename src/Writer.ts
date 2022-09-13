/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import { Bifunctor as Bifunctor_ } from './Bifunctor'
import type { Chain } from './Chain'
import type { ChainRec } from './ChainRec'
import type { Comonad as Comonad_ } from './Comonad'
import type { Either } from './Either'
import type { Extend as Extend_ } from './Extend'
import type { Foldable as Foldable_ } from './Foldable'
import { identity, pipe } from './function'
import { flap as flap_, Functor as Functor_ } from './Functor'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type { Monad } from './Monad'
import type { Monoid } from './Monoid'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'
import type { Semigroupoid as Semigroupoid_ } from './Semigroupoid'
import type { Traversable as Traversable_ } from './Traversable'

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
export const fromIdentity = <W>(w: W) => <A>(a: A): Writer<W, A> => [a, w]

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
export const map: Functor_<WriterF>['map'] = (f) => (fa) => {
  const [a, w] = fa
  return [f(a), w]
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export const mapLeft: Bifunctor_<WriterF>['mapLeft'] = (f) => (fa) => {
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
export const mapFst = map

/**
 * Maps a function over the second component of a `Writer`.
 *
 * Alias of [`mapLeft`](#mapleft)
 *
 * @since 3.0.0
 */
export const mapSnd = mapLeft

/**
 * @category type class operations
 * @since 3.0.0
 */
export const compose: <B, C>(bc: Writer<B, C>) => <A>(ab: Writer<A, B>) => Writer<A, C> = (bc) => (ab) => [
  fst(bc),
  snd(ab)
]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extend: Extend_<WriterF>['extend'] = (f) => (wa) => [f(wa), snd(wa)]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extract: Comonad_<WriterF>['extract'] = fst

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
export const reduce: Foldable_<WriterF>['reduce'] = (b, f) => (fa) => f(b, fst(fa))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const foldMap: Foldable_<WriterF>['foldMap'] = () => (f) => (fa) => f(fst(fa))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const reduceRight: Foldable_<WriterF>['reduceRight'] = (b, f) => (fa) => f(fst(fa), b)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const traverse = <F extends HKT>(F: Applicative<F>) => <A, S, R, FW, E, B>(
  f: (a: A) => Kind<F, S, R, FW, E, B>
) => <W>(t: Writer<W, A>): Kind<F, S, R, FW, E, Writer<W, B>> =>
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
export interface WriterF extends HKT {
  readonly type: Writer<this['E'], this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface WriterFContra extends HKT {
  readonly type: Writer<this['R'], this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface WriterFE<E> extends HKT {
  readonly type: Writer<E, this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor_<WriterF> = {
  bimap,
  mapLeft: mapSnd
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<WriterF> = {
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
export const Semigroupoid: Semigroupoid_<WriterFContra> = {
  compose
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad_<WriterF> = {
  map: mapFst,
  extend,
  extract
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable_<WriterF> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable_<WriterF> = {
  map: mapFst,
  traverse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <W>(M: Monoid<W>): Pointed<WriterFE<W>> => ({
  of: (a) => [a, M.empty]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(S: Semigroup<W>): Apply<WriterFE<W>> => ({
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
export const getApplicative = <W>(M: Monoid<W>): Applicative<WriterFE<W>> => {
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
export const getChain = <W>(S: Semigroup<W>): Chain<WriterFE<W>> => {
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
export const getMonad = <W>(M: Monoid<W>): Monad<WriterFE<W>> => {
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
export function getChainRec<W>(M: Monoid<W>): ChainRec<WriterFE<W>> {
  const chainRec = <A, B>(f: (a: A) => readonly [Either<A, B>, W]) => (a: A): readonly [B, W] => {
    let result: readonly [Either<A, B>, W] = f(a)
    let acc: W = M.empty
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
