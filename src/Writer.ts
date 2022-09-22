/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import type { Apply } from './Apply'
import type * as bifunctor from './Bifunctor'
import type { Flattenable } from './Flattenable'
import type { FlattenableRec } from './FlattenableRec'
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
export type Writer<W, A> = readonly [W, A]

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const make =
  <W>(w: W) =>
  <A>(a: A): Writer<W, A> =>
    [w, a]

/**
 * Appends a value to the accumulator
 *
 * @category constructors
 * @since 3.0.0
 */
export const tell = <W>(w: W): Writer<W, void> => [w, undefined]

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const fst = <W, A>(self: Writer<W, A>): W => self[0]

/**
 * @since 3.0.0
 */
export const snd = <W, A>(self: Writer<W, A>): A => self[1]

/**
 * Alias of [`snd`](#snd).
 *
 * @since 3.0.0
 */
export const evaluate: <W, A>(self: Writer<W, A>) => A = snd

/**
 * Alias of [`fst`](#fst).
 *
 * @since 3.0.0
 */
export const execute: <W, A>(self: Writer<W, A>) => W = fst

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap = <W, A>(self: Writer<W, A>): Writer<A, W> => [snd(self), fst(self)]

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export const listen = <W, A>(self: Writer<W, A>): Writer<W, readonly [W, A]> => {
  const [w, a] = self
  return [w, [w, a]]
}

/**
 * Applies the returned function to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export const pass = <W, A>(self: Writer<W, readonly [A, (w: W) => W]>): Writer<W, A> => {
  const [w, [a, f]] = self
  return [f(w), a]
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @category combinators
 * @since 3.0.0
 */
export const listens =
  <W, B>(f: (w: W) => B) =>
  <A>(self: Writer<W, A>): Writer<W, readonly [A, B]> => {
    const [w, a] = self
    return [w, [a, f(w)]]
  }

/**
 * Modify the final accumulator value by applying a function
 *
 * @category combinators
 * @since 3.0.0
 */
export const censor =
  <W>(f: (w: W) => W) =>
  <A>(self: Writer<W, A>): Writer<W, A> => {
    const [w, a] = self
    return [f(w), a]
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
export const map =
  <A, B>(f: (a: A) => B) =>
  <W>(self: Writer<W, A>): Writer<W, B> => {
    const [w, a] = self
    return [w, f(a)]
  }

/**
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft =
  <W, X>(f: (w: W) => X) =>
  <A>(self: Writer<W, A>): Writer<X, A> => {
    const [w, a] = self
    return [f(w), a]
  }

/**
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapBoth =
  <W, X, A, B>(f: (w: W) => X, g: (a: A) => B) =>
  (self: Writer<W, A>): Writer<X, B> =>
    [f(fst(self)), g(snd(self))]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const compose =
  <B, C>(bc: Writer<B, C>) =>
  <A>(ab: Writer<A, B>): Writer<A, C> =>
    [fst(ab), snd(bc)]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extend =
  <W, A, B>(f: (self: Writer<W, A>) => B) =>
  (self: Writer<W, A>): Writer<W, B> =>
    [fst(self), f(self)]

/**
 * @category type class operations
 * @since 3.0.0
 */
export const extract: <W, A>(self: Writer<W, A>) => A = snd

/**
 * Derivable from `Extendable`.
 *
 * @category type class operations
 * @since 3.0.0
 */
export const duplicate: <W, A>(self: Writer<W, A>) => Writer<W, Writer<W, A>> = /*#__PURE__*/ extend(identity)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const reduce =
  <B, A>(b: B, f: (b: B, a: A) => B) =>
  <W>(self: Writer<W, A>): B =>
    f(b, snd(self))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const foldMap =
  <M>(_M: Monoid<M>) =>
  <A>(f: (a: A) => M) =>
  <W>(self: Writer<W, A>): M =>
    f(snd(self))

/**
 * @category type class operations
 * @since 3.0.0
 */
export const reduceRight =
  <B, A>(b: B, f: (a: A, b: B) => B) =>
  <W>(self: Writer<W, A>): B =>
    f(snd(self), b)

/**
 * @category type class operations
 * @since 3.0.0
 */
export const traverse =
  <F extends HKT>(F: Apply<F>) =>
  <A, S, R, FW, E, B>(f: (a: A) => Kind<F, S, R, FW, E, B>) =>
  <W>(self: Writer<W, A>): Kind<F, S, R, FW, E, Writer<W, B>> =>
    pipe(
      f(snd(self)),
      F.map((b) => [fst(self), b])
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
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<WriterF> = {
  map
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
  map,
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
) => <W, FS, FR, FW, FE, A>(self: Writer<W, Kind<F, FS, FR, FW, FE, A>>) => Kind<F, FS, FR, FW, FE, Writer<W, A>> = (
  F
) => traverse(F)(identity)

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <W>(M: Monoid<W>): Pointed<WriterFFixedW<W>> => ({
  of: (a) => [M.empty, a]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(S: Semigroup<W>): Apply<WriterFFixedW<W>> => ({
  map,
  ap: (fa) => (fab) => {
    const [w1, f] = fab
    const [w2, a] = fa
    return [S.combine(w2)(w1), f(a)]
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
export const getFlattenable = <W>(S: Semigroup<W>): Flattenable<WriterFFixedW<W>> => {
  return {
    map,
    flatMap: (f) => (ma) => {
      const [w1, a] = ma
      const [w2, b] = f(a)
      return [S.combine(w2)(w1), b]
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad<WriterFFixedW<W>> => {
  const P = getPointed(M)
  const C = getFlattenable(M)
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
export function getFlattenableRec<W>(M: Monoid<W>): FlattenableRec<WriterFFixedW<W>> {
  const flatMapRec =
    <A, B>(f: (a: A) => Writer<W, Either<A, B>>) =>
    (a: A): Writer<W, B> => {
      let result: Writer<W, Either<A, B>> = f(a)
      let acc: W = M.empty
      let s: Either<A, B> = snd(result)
      while (_.isLeft(s)) {
        acc = M.combine(fst(result))(acc)
        result = f(s.left)
        s = snd(result)
      }
      return [M.combine(fst(result))(acc), s.right]
    }

  return {
    flatMapRec
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
    return (as) => (_.isNonEmpty(as) ? g(as) : [M.empty, _.emptyReadonlyArray])
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
