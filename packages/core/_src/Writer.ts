/**
 * @since 3.0.0
 */
import type * as applicative from '@fp-ts/core/Applicative'
import type { Apply } from '@fp-ts/core/Apply'
import type * as bifunctor from '@fp-ts/core/Bifunctor'
import type * as comonad from '@fp-ts/core/Comonad'
import type * as composable from '@fp-ts/core/Composable'
import type { Flattenable } from '@fp-ts/core/Flattenable'
import type { FlattenableRec } from '@fp-ts/core/FlattenableRec'
import * as foldable from '@fp-ts/core/Foldable'
import type { FromIdentity } from '@fp-ts/core/FromIdentity'
import { flow, identity, pipe, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import * as iterable from '@fp-ts/core/Iterable'
import type { Monad } from '@fp-ts/core/Monad'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import * as nonEmptyReadonlyArrayModule from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Result } from '@fp-ts/core/Result'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type * as traversable from '@fp-ts/core/Traversable'

/**
 * @category model
 * @since 3.0.0
 */
export type Writer<W, A> = readonly [W, A]

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface WriterTypeLambda extends TypeLambda {
  readonly type: Writer<this['Out2'], this['Out1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface WriterFComposable extends TypeLambda {
  readonly type: Writer<this['In1'], this['Out1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface WriterFFix<W> extends TypeLambda {
  readonly type: Writer<W, this['Out1']>
}

/**
 * Appends a value to the accumulator
 *
 * @category constructors
 * @since 3.0.0
 */
export const tell = <W>(w: W): Writer<W, void> => [w, undefined]

/**
 * @since 3.0.0
 */
export const fst = <W>(self: Writer<W, unknown>): W => self[0]

/**
 * @since 3.0.0
 */
export const snd = <A>(self: Writer<unknown, A>): A => self[1]

/**
 * @since 3.0.0
 */
export const swap = <W, A>(self: Writer<W, A>): Writer<A, W> => [snd(self), fst(self)]

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 3.0.0
 */
export const listen = <W, A>(self: Writer<W, A>): Writer<W, readonly [W, A]> => {
  const [w, a] = self
  return [w, [w, a]]
}

/**
 * Applies the returned function to the accumulator
 *
 * @since 3.0.0
 */
export const pass = <W, A>(self: Writer<W, readonly [A, (w: W) => W]>): Writer<W, A> => {
  const [w, [a, f]] = self
  return [f(w), a]
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 3.0.0
 */
export const listens = <W, B>(f: (w: W) => B) =>
  <A>(self: Writer<W, A>): Writer<W, readonly [A, B]> => {
    const [w, a] = self
    return [w, [a, f(w)]]
  }

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 3.0.0
 */
export const censor = <W>(f: (w: W) => W) =>
  <A>(self: Writer<W, A>): Writer<W, A> => {
    const [w, a] = self
    return [f(w), a]
  }

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map = <A, B>(f: (a: A) => B) =>
  <W>(self: Writer<W, A>): Writer<W, B> => {
    const [w, a] = self
    return [w, f(a)]
  }

/**
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft = <W, X>(f: (w: W) => X) =>
  <A>(self: Writer<W, A>): Writer<X, A> => {
    const [w, a] = self
    return [f(w), a]
  }

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth = <W, X, A, B>(f: (w: W) => X, g: (a: A) => B) =>
  (self: Writer<W, A>): Writer<X, B> => [f(fst(self)), g(snd(self))]

/**
 * @since 3.0.0
 */
export const compose = <B, C>(bc: Writer<B, C>) => <A>(ab: Writer<A, B>): Writer<A, C> => [fst(ab), snd(bc)]

/**
 * @since 3.0.0
 */
export const extend = <W, A, B>(f: (self: Writer<W, A>) => B) =>
  (self: Writer<W, A>): Writer<W, B> => [fst(self), f(self)]

/**
 * @since 3.0.0
 */
export const extract: <W, A>(self: Writer<W, A>) => A = snd

/**
 * @since 3.0.0
 */
export const duplicate: <W, A>(self: Writer<W, A>) => Writer<W, Writer<W, A>> = extend(identity)

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse = <F extends TypeLambda>(F: Apply<F>) =>
  <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) =>
    <W>(self: Writer<W, A>): Kind<F, S, R, O, E, Writer<W, B>> =>
      pipe(
        f(snd(self)),
        F.map((b) => [fst(self), b])
      )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<WriterTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<WriterTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <W, B>(fab: Writer<W, (a: A) => B>) => Writer<W, B> = functor.flap(
  Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Composable: composable.Composable<WriterFComposable> = {
  compose
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: comonad.Comonad<WriterTypeLambda> = {
  map,
  extend,
  extract
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const toIterable: <W, A>(self: Writer<W, A>) => Iterable<A> = flow(snd, iterable.of)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<WriterTypeLambda> = {
  toIterable
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <W>(self: Writer<W, A>) => B = foldable.reduce(
  Foldable
)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => <W>(self: Writer<W, A>) => M = foldable.foldMap(
  Foldable
)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <W>(self: Writer<W, A>) => B = foldable
  .reduceRight(Foldable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<WriterTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: Apply<F>
) => <W, S, R, O, E, A>(self: Writer<W, Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Writer<W, A>> = (F) =>
  traverse(F)(identity)

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromIdentity = <W>(M: Monoid<W>): FromIdentity<WriterFFix<W>> => ({
  of: (a) => [M.empty, a]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(Semigroup: Semigroup<W>): Apply<WriterFFix<W>> => ({
  map,
  ap: (fa) =>
    (fab) => {
      const [w1, f] = fab
      const [w2, a] = fa
      return [Semigroup.combine(w2)(w1), f(a)]
    }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <W>(Monoid: Monoid<W>): applicative.Applicative<WriterFFix<W>> => {
  const Apply = getApply(Monoid)
  const FromIdentity = getFromIdentity(Monoid)
  return {
    map,
    ap: Apply.ap,
    of: FromIdentity.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFlattenable = <W>(S: Semigroup<W>): Flattenable<WriterFFix<W>> => {
  return {
    map,
    flatMap: (f) =>
      (ma) => {
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
export const getMonad = <W>(M: Monoid<W>): Monad<WriterFFix<W>> => {
  const P = getFromIdentity(M)
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
export function getFlattenableRec<W>(M: Monoid<W>): FlattenableRec<WriterFFix<W>> {
  const flatMapRec = <A, B>(f: (a: A) => Writer<W, Result<A, B>>) =>
    (a: A): Writer<W, B> => {
      let result: Writer<W, Result<A, B>> = f(a)
      let acc: W = M.empty
      let s: Result<A, B> = snd(result)
      while (_.isFailure(s)) {
        acc = M.combine(fst(result))(acc)
        result = f(s.failure)
        s = snd(result)
      }
      return [M.combine(fst(result))(acc), s.success]
    }

  return {
    flatMapRec
  }
}

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <W>(S: Semigroup<W>) =>
  <A, B>(f: (index: number, a: A) => Writer<W, B>) =>
    (as: NonEmptyReadonlyArray<A>): Writer<W, NonEmptyReadonlyArray<B>> => {
      // TODO
      return nonEmptyReadonlyArrayModule.traverseWithIndex(getApply(S))(f)(as)
    }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <W>(M: Monoid<W>) =>
  <A, B>(f: (index: number, a: A) => Writer<W, B>): ((as: ReadonlyArray<A>) => Writer<W, ReadonlyArray<B>>) => {
    const g = traverseNonEmptyReadonlyArrayWithIndex(M)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : [M.empty, _.emptyReadonlyArray])
  }

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(getApply(S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <W>(S: Semigroup<W>) => {
  const traverseNonEmptyReadonlyArrayWithIndexS = traverseNonEmptyReadonlyArrayWithIndex(S)
  return <A, B>(f: (a: A) => Writer<W, B>): ((as: NonEmptyReadonlyArray<A>) => Writer<W, NonEmptyReadonlyArray<B>>) => {
    return traverseNonEmptyReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <W>(M: Monoid<W>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(M)
  return <A, B>(f: (a: A) => Writer<W, B>): ((as: ReadonlyArray<A>) => Writer<W, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(M))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <W>(
  M: Monoid<W>
): (<A>(arr: ReadonlyArray<Writer<W, A>>) => Writer<W, ReadonlyArray<A>>) => traverseReadonlyArray(M)(identity)
