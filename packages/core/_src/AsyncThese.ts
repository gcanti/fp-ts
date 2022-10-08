/**
 * @since 3.0.0
 */
import type { Applicative } from '@fp-ts/core/Applicative'
import type { Apply } from '@fp-ts/core/Apply'
import type { Async } from '@fp-ts/core/Async'
import * as async from '@fp-ts/core/Async'
import type * as bifunctor from '@fp-ts/core/Bifunctor'
import type { Flattenable } from '@fp-ts/core/Flattenable'
import * as fromAsync_ from '@fp-ts/core/FromAsync'
import type * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromResult_ from '@fp-ts/core/FromResult'
import * as fromSync_ from '@fp-ts/core/FromSync'
import * as fromThese_ from '@fp-ts/core/FromThese'
import { flow, identity, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type { Monad } from '@fp-ts/core/Monad'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Option } from '@fp-ts/core/Option'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result, ValidatedT } from '@fp-ts/core/Result'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Sync } from '@fp-ts/core/Sync'
import type { SyncResult } from '@fp-ts/core/SyncResult'
import type { These } from '@fp-ts/core/These'
import * as these from '@fp-ts/core/These'
import * as theseT from '@fp-ts/core/TheseT'

/**
 * @category model
 * @since 3.0.0
 */
export interface AsyncThese<E, A> extends Async<These<E, A>> {}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface AsyncTheseTypeLambda extends TypeLambda {
  readonly type: AsyncThese<this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail: <E>(e: E) => AsyncThese<E, never> = theseT.fail(async.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => AsyncThese<never, A> = theseT.succeed(async.FromIdentity)

/**
 * @category constructors
 * @since 3.0.0
 */
export const both: <E, A>(e: E, a: A) => AsyncThese<E, A> = theseT.both(async.FromIdentity)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromAsync: <A>(ma: Async<A>) => AsyncThese<never, A> = theseT.fromKind(async.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failAsync: <E>(me: Async<E>) => AsyncThese<E, never> = theseT.failKind(async.Functor)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(ma: Sync<A>) => AsyncThese<never, A> = flow(async.fromSync, fromAsync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const failSync: <E>(me: Sync<E>) => AsyncThese<E, never> = flow(async.fromSync, failAsync)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSyncResult: <E, A>(fa: SyncResult<E, A>) => AsyncThese<E, A> = async.fromSync

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <E, A>(fa: Result<E, A>) => AsyncThese<E, A> = async.of

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromThese: <E, A>(fa: these.These<E, A>) => AsyncThese<E, A> = async.of

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match: <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (self: AsyncThese<E, A>) => Async<B | C | D> = theseT.match(async.Functor)

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const matchAsync: <E, B, A, C = B, D = B>(
  onError: (e: E) => Async<B>,
  onSuccess: (a: A) => Async<C>,
  onBoth: (e: E, a: A) => Async<D>
) => (self: AsyncThese<E, A>) => Async<B | C | D> = theseT.matchKind(async.Monad)

/**
 * @since 3.0.0
 */
export const swap: <E, A>(self: Async<these.These<E, A>>) => Async<these.These<A, E>> = theseT.swap(
  async.Functor
)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: AsyncThese<E, A>) => AsyncThese<E, B> = theseT.map(
  async.Functor
)

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: AsyncThese<E, A>) => AsyncThese<G, B> =
  theseT.mapBoth(async.Functor)

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: AsyncThese<E, A>) => AsyncThese<G, A> = theseT
  .mapError(async.Functor)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(
  Apply: Apply<async.AsyncTypeLambda>,
  Semigroup: Semigroup<E>
): Apply<ValidatedT<AsyncTheseTypeLambda, E>> => ({
  map,
  ap: theseT.ap(Apply, Semigroup)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(
  Apply: Apply<async.AsyncTypeLambda>,
  Semigroup: Semigroup<E>
): Applicative<ValidatedT<AsyncTheseTypeLambda, E>> => {
  const AS = getApply(Apply, Semigroup)
  return {
    map,
    ap: AS.ap,
    of: succeed
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFlattenable = <E>(S: Semigroup<E>): Flattenable<ValidatedT<AsyncTheseTypeLambda, E>> => ({
  map,
  flatMap: theseT.flatMap(async.Monad, S)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad<ValidatedT<AsyncTheseTypeLambda, E>> => {
  const C = getFlattenable(S)
  return {
    map,
    of: succeed,
    flatMap: C.flatMap
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<AsyncTheseTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: AsyncThese<E, (a: A) => B>) => AsyncThese<E, B> = functor
  .flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <E>(self: AsyncThese<E, unknown>) => AsyncThese<E, B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <E>(self: AsyncThese<E, unknown>) => AsyncThese<E, void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<AsyncTheseTypeLambda> = {
  of: succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<AsyncTheseTypeLambda> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<AsyncTheseTypeLambda> = {
  fromResult
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => AsyncThese<E, A> = fromResult_
  .fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => AsyncThese<E, B> = fromResult_.liftOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => AsyncThese<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => AsyncThese<E, B>
} = fromResult_.liftPredicate(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => AsyncThese<E, B> = fromResult_.liftResult(FromResult)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => AsyncThese<E, NonNullable<A>> = fromResult_
  .fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => AsyncThese<E, NonNullable<B>> = fromResult_.liftNullable(FromResult)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: fromThese_.FromThese<AsyncTheseTypeLambda> = {
  fromThese
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftThese: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => these.These<E, B>
) => (...a: A) => AsyncThese<E, B> = fromThese_.liftThese(FromThese)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<AsyncTheseTypeLambda> = {
  fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => AsyncThese<never, void> = fromSync_.log(
  FromSync
)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <A extends ReadonlyArray<unknown>>(...x: A) => AsyncThese<never, void> = fromSync_
  .logError(FromSync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Sync<B>
) => <E>(...a: A) => AsyncThese<E, B> = fromSync_.liftSync(FromSync)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<AsyncTheseTypeLambda> = {
  fromSync,
  fromAsync
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep: (duration: number) => AsyncThese<never, void> = fromAsync_.sleep(FromAsync)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftAsync: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Async<B>
) => (...a: A) => AsyncThese<never, B> = fromAsync_.liftAsync(FromAsync)

/**
 * @since 3.0.0
 */
export const toTuple2: <E, A>(e: E, a: A) => (fa: AsyncThese<E, A>) => Async<readonly [E, A]> = theseT
  .toTuple2(async.Functor)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: AsyncThese<never, readonly []> = succeed(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(T.ApplyPar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndexPar = <E>(
  S: Semigroup<E>
): (<A, B>(
  f: (index: number, a: A) => AsyncThese<E, B>
) => (as: NonEmptyReadonlyArray<A>) => AsyncThese<E, NonEmptyReadonlyArray<B>>) => {
  const g = these.traverseNonEmptyReadonlyArrayWithIndex(S)
  return (f) => flow(async.traverseNonEmptyReadonlyArrayWithIndexPar(f), async.map(g(SK)))
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.ApplicativePar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => AsyncThese<E, B>): ((as: ReadonlyArray<A>) => AsyncThese<E, ReadonlyArray<B>>) => {
    const g = traverseNonEmptyReadonlyArrayWithIndexPar(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
  }

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(getApply(T.ApplyPar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayPar = <E>(S: Semigroup<E>) => {
  const traverseNonEmptyReadonlyArrayWithIndexS = traverseNonEmptyReadonlyArrayWithIndexPar(S)
  return <A, B>(
    f: (a: A) => AsyncThese<E, B>
  ): ((as: NonEmptyReadonlyArray<A>) => AsyncThese<E, NonEmptyReadonlyArray<B>>) => {
    return traverseNonEmptyReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(T.ApplicativePar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndexPar(S)
  return <A, B>(f: (a: A) => AsyncThese<E, B>): ((as: ReadonlyArray<A>) => AsyncThese<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(T.ApplicativePar, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<AsyncThese<E, A>>) => AsyncThese<E, ReadonlyArray<A>>) =>
  traverseReadonlyArrayPar(S)(identity)

// --- Seq ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(T.Apply, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => AsyncThese<E, B>) =>
    (as: NonEmptyReadonlyArray<A>): AsyncThese<E, NonEmptyReadonlyArray<B>> =>
      () =>
        _.tail(as).reduce<Promise<These<E, _.NonEmptyArray<B>>>>(
          (acc, a, i) =>
            acc.then((ebs) =>
              these.isFailure(ebs)
                ? acc
                : f(i + 1, a)().then((eb) => {
                  if (these.isFailure(eb)) {
                    return eb
                  }
                  if (these.isBoth(eb)) {
                    const success = ebs.success
                    success.push(eb.success)
                    return these.isBoth(ebs)
                      ? these.both(S.combine(eb.failure)(ebs.failure), success)
                      : these.both(eb.failure, success)
                  }
                  ebs.success.push(eb.success)
                  return ebs
                })
            ),
          f(0, _.head(as))().then(these.map(_.singleton))
        )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(T.Applicative, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => AsyncThese<E, B>): ((as: ReadonlyArray<A>) => AsyncThese<E, ReadonlyArray<B>>) => {
    const g = traverseNonEmptyReadonlyArrayWithIndex(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
  }

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(getApply(T.Apply, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <E>(S: Semigroup<E>) => {
  const traverseNonEmptyReadonlyArrayWithIndexS = traverseNonEmptyReadonlyArrayWithIndex(S)
  return <A, B>(
    f: (a: A) => AsyncThese<E, B>
  ): ((as: NonEmptyReadonlyArray<A>) => AsyncThese<E, NonEmptyReadonlyArray<B>>) => {
    return traverseNonEmptyReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(T.Applicative, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(S)
  return <A, B>(f: (a: A) => AsyncThese<E, B>): ((as: ReadonlyArray<A>) => AsyncThese<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(T.Applicative, S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<AsyncThese<E, A>>) => AsyncThese<E, ReadonlyArray<A>>) => traverseReadonlyArray(S)(identity)
