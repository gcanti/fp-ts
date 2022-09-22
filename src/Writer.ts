/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import type { Apply } from './Apply'
import type * as bifunctor from './Bifunctor'
import type { Flat } from './Flat'
import type { FlatRec } from './FlatRec'
import type * as comonad from './Comonad'
import type { Either } from './Either'
import type * as foldable from './Foldable'
import { identity, pipe } from './function'
import * as functor from './Functor'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type { Monad } from './Monad'
import type { Monoid } from './Monoid'
import type { Pointed } from './Pointed'
import * as readonlyNonEmptyArrayModule from './ReadonlyNonEmptyArray'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Semigroup } from './Semigroup'
import type * as composable from './Composable'
import type * as traversable from './Traversable'

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
export const fromIdentity =
  <W>(w: W) =>
  <A>(a: A): Writer<W, A> =>
    [a, w] // TODO name?

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
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <W>(fa: Writer<W, A>) => Writer<W, B> = (f) => (fa) => {
  const [a, w] = fa
  return [f(a), w]
}

/**
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <W, X>(f: (w: W) => X) => <A>(self: Writer<W, A>) => Writer<X, A> = (f) => (fa) => {
  const [a, w] = fa
  return [a, f(w)]
}

/**
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapBoth =
  <W, X, A, B>(f: (w: W) => X, g: (a: A) => B) =>
  (self: Writer<W, A>): Writer<X, B> =>
    [g(fst(self)), f(snd(self))]

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
export const compose: <B, C>(bc: Writer<B, C>) => <A>(ab: Writer<A, B>) => Writer<A, C> = (bc) => (ab) =>
  [fst(bc), snd(ab)]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extend: <W, A, B>(f: (wa: Writer<W, A>) => B) => (wa: Writer<W, A>) => Writer<W, B> = (f) => (wa) =>
  [f(wa), snd(wa)]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extract: <W, A>(wa: Writer<W, A>) => A = fst

/**
 * Derivable from `Extendable`.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const duplicate: <W, A>(t: Writer<W, A>) => Writer<W, Writer<W, A>> = /*#__PURE__*/ extend(identity)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <W>(fa: Writer<W, A>) => B = (b, f) => (fa) => f(b, fst(fa))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <W>(fa: Writer<W, A>) => M = () => (f) => (fa) =>
  f(fst(fa))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <W>(fa: Writer<W, A>) => B = (b, f) => (fa) =>
  f(fst(fa), b)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const traverse =
  <F extends HKT>(F: Apply<F>) =>
  <A, S, R, FW, E, B>(f: (a: A) => Kind<F, S, R, FW, E, B>) =>
  <W>(t: Writer<W, A>): Kind<F, S, R, FW, E, Writer<W, B>> =>
    pipe(
      f(fst(t)),
      F.map((b) => [b, snd(t)])
    )

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface WriterF extends HKT {
  readonly type: Writer<this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface WriterFContravariant extends HKT {
  readonly type: Writer<this['Contravariant1'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface WriterFFixedW<W> extends HKT {
  readonly type: Writer<W, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<WriterF> = {
  mapBoth,
  mapLeft: mapSnd
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<WriterF> = {
  map: mapFst
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <W, B>(fab: Writer<W, (a: A) => B>) => Writer<W, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Composable: composable.Composable<WriterFContravariant> = {
  compose
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: comonad.Comonad<WriterF> = {
  map: mapFst,
  extend,
  extract
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<WriterF> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<WriterF> = {
  traverse
}

/**
 * @since 3.0.0
 */
export const sequence: <F extends HKT>(
  F: Apply<F>
) => <W, FS, FR, FW, FE, A>(fa: Writer<W, Kind<F, FS, FR, FW, FE, A>>) => Kind<F, FS, FR, FW, FE, Writer<W, A>> = (F) =>
  traverse(F)(identity)

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <W>(M: Monoid<W>): Pointed<WriterFFixedW<W>> => ({
  of: (a) => [a, M.empty]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(S: Semigroup<W>): Apply<WriterFFixedW<W>> => ({
  map,
  ap: (fa) => (fab) => {
    const [f, w1] = fab
    const [a, w2] = fa
    return [f(a), S.combine(w2)(w1)]
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <W>(M: Monoid<W>): applicative.Applicative<WriterFFixedW<W>> => {
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
export const getFlat = <W>(S: Semigroup<W>): Flat<WriterFFixedW<W>> => {
  return {
    map,
    flatMap: (f) => (ma) => {
      const [a, w1] = ma
      const [b, w2] = f(a)
      return [b, S.combine(w2)(w1)]
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad<WriterFFixedW<W>> => {
  const P = getPointed(M)
  const C = getFlat(M)
  return {
    map,
    of: P.of,
    flatMap: C.flatMap
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getFlatRec<W>(M: Monoid<W>): FlatRec<WriterFFixedW<W>> {
  const flatMapRec =
    <A, B>(f: (a: A) => readonly [Either<A, B>, W]) =>
    (a: A): readonly [B, W] => {
      let result: readonly [Either<A, B>, W] = f(a)
      let acc: W = M.empty
      let s: Either<A, B> = fst(result)
      while (_.isLeft(s)) {
        acc = M.combine(snd(result))(acc)
        result = f(s.left)
        s = fst(result)
      }
      return [s.right, M.combine(snd(result))(acc)]
    }

  return {
    flatMapRec: flatMapRec
  }
}

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(M))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <W>(S: Semigroup<W>) =>
  <A, B>(f: (index: number, a: A) => Writer<W, B>) =>
  (as: ReadonlyNonEmptyArray<A>): Writer<W, ReadonlyNonEmptyArray<B>> => {
    // TODO
    return readonlyNonEmptyArrayModule.traverseWithIndex(getApply(S))(f)(as)
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(M))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex =
  <W>(M: Monoid<W>) =>
  <A, B>(f: (index: number, a: A) => Writer<W, B>): ((as: ReadonlyArray<A>) => Writer<W, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndex(M)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : [_.emptyReadonlyArray, M.empty])
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <W>(S: Semigroup<W>) => {
  const traverseReadonlyNonEmptyArrayWithIndexS = traverseReadonlyNonEmptyArrayWithIndex(S)
  return <A, B>(f: (a: A) => Writer<W, B>): ((as: ReadonlyNonEmptyArray<A>) => Writer<W, ReadonlyNonEmptyArray<B>>) => {
    return traverseReadonlyNonEmptyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(M))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <W>(M: Monoid<W>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(M)
  return <A, B>(f: (a: A) => Writer<W, B>): ((as: ReadonlyArray<A>) => Writer<W, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(M))`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <W>(
  M: Monoid<W>
): (<A>(arr: ReadonlyArray<Writer<W, A>>) => Writer<W, ReadonlyArray<A>>) => traverseReadonlyArray(M)(identity)
