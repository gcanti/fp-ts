/**
 * A data structure providing "inclusive-or" as opposed to `Result`'s "exclusive-or".
 *
 * If you interpret `Result<E, A>` as suggesting the computation may either fail or of (exclusively), then
 * `These<E, A>` may fail, of, or do both at the same time.
 *
 * There are a few ways to interpret the both case:
 *
 * - You can think of a computation that has a non-fatal error.
 * - You can think of a computation that went as far as it could before erroring.
 * - You can think of a computation that keeps track of errors as it completes.
 *
 * Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
 * both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.
 *
 * (description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)
 *
 * Adapted from https://github.com/purescript-contrib/purescript-these
 *
 * @since 3.0.0
 */
import type * as applicative from './typeclasses/Applicative'
import type { Apply } from './typeclasses/Apply'
import * as bifunctor from './typeclasses/Bifunctor'
import type { Flattenable } from './typeclasses/Flattenable'
import type { Result, Failure, Success, ValidatedT } from './Result'
import type { Eq } from './typeclasses/Eq'
import * as eq from './typeclasses/Eq'
import type { Monoid } from './typeclasses/Monoid'
import * as fromResult_ from './typeclasses/FromResult'
import type * as fromThese_ from './typeclasses/FromThese'
import { flow, SK } from './Function'
import { identity, pipe } from './Function'
import * as functor from './typeclasses/Functor'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type { Monad } from './typeclasses/Monad'
import type { Option } from './Option'
import type * as fromIdentity from './typeclasses/FromIdentity'
import type { Predicate } from './Predicate'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './typeclasses/Semigroup'
import type { Show } from './typeclasses/Show'
import * as traversable from './typeclasses/Traversable'

/**
 * @category model
 * @since 3.0.0
 */
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly failure: E
  readonly success: A
}

/**
 * @category model
 * @since 3.0.0
 */
export type These<E, A> = Result<E, A> | Both<E, A>

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TheseTypeLambda extends TypeLambda {
  readonly type: These<this['Out2'], this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fail = <E>(failure: E): These<E, never> => ({ _tag: 'Failure', failure })

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed = <A>(success: A): These<never, A> => ({ _tag: 'Success', success })

/**
 * @category constructors
 * @since 3.0.0
 */
export const both = <E, A>(failure: E, success: A): These<E, A> => ({ _tag: 'Both', failure, success })

/**
 * @example
 * import { failureOrBoth, fail, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(failureOrBoth('a')(none), fail('a'))
 * assert.deepStrictEqual(failureOrBoth('a')(some(1)), both('a', 1))
 *
 * @category constructors
 * @since 3.0.0
 */
export const failureOrBoth =
  <E>(e: E) =>
  <A>(ma: Option<A>): These<E, A> =>
    _.isNone(ma) ? fail(e) : both(e, ma.value)

/**
 * @example
 * import { successOrBoth, succeed, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(successOrBoth(1)(none), succeed(1))
 * assert.deepStrictEqual(successOrBoth(1)(some('a')), both('a', 1))
 *
 * @category constructors
 * @since 3.0.0
 */
export const successOrBoth =
  <A>(a: A) =>
  <E>(me: Option<E>): These<E, A> =>
    _.isNone(me) ? succeed(a) : both(me.value, a)

/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, fail, succeed, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(fail('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(succeed(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromOptions = <E, A>(fe: Option<E>, fa: Option<A>): Option<These<E, A>> =>
  _.isNone(fe)
    ? _.isNone(fa)
      ? _.none
      : _.some(succeed(fa.value))
    : _.isNone(fa)
    ? _.some(fail(fe.value))
    : _.some(both(fe.value, fa.value))

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match =
  <E, B, A, C = B, D = B>(onError: (e: E) => B, onSuccess: (a: A) => C, onBoth: (e: E, a: A) => D) =>
  (fa: These<E, A>): B | C | D => {
    switch (fa._tag) {
      case 'Failure':
        return onError(fa.failure)
      case 'Success':
        return onSuccess(fa.success)
      case 'Both':
        return onBoth(fa.failure, fa.success)
    }
  }

/**
 * @since 3.0.0
 */
export const reverse: <E, A>(fa: These<E, A>) => These<A, E> = match(succeed, fail, (e, a) => both(a, e))

/**
 * Returns `true` if the these is an instance of `Failure`, `false` otherwise
 *
 * @category refinements
 * @since 3.0.0
 */
export const isFailure = <E>(fa: These<E, unknown>): fa is Failure<E> => fa._tag === 'Failure'

/**
 * Returns `true` if the these is an instance of `Success`, `false` otherwise
 *
 * @category refinements
 * @since 3.0.0
 */
export const isSuccess = <A>(fa: These<unknown, A>): fa is Success<A> => fa._tag === 'Success'

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @category refinements
 * @since 3.0.0
 */
export const isBoth = <E, A>(fa: These<E, A>): fa is Both<E, A> => fa._tag === 'Both'

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: These<E, A>) => These<G, B> =
  (f, g) => (fa) =>
    isFailure(fa) ? fail(f(fa.failure)) : isSuccess(fa) ? succeed(g(fa.success)) : both(f(fa.failure), g(fa.success))

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, FE, B>(
  f: (a: A) => Kind<F, S, R, O, FE, B>
) => <E>(ta: These<E, A>) => Kind<F, S, R, O, FE, These<E, B>> = (F) => (f) => (ta) =>
  isFailure(ta)
    ? F.of(ta)
    : isSuccess(ta)
    ? pipe(f(ta.success), F.map(succeed))
    : pipe(
        f(ta.success),
        F.map((b) => both(ta.failure, b))
      )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>> => ({
  show: match(
    (l) => `fail(${SE.show(l)})`,
    (a) => `succeed(${SA.show(a)})`,
    (l, a) => `both(${SE.show(l)}, ${SA.show(a)})`
  )
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <E, A>(EE: Eq<E>, EA: Eq<A>): Eq<These<E, A>> =>
  eq.fromEquals(
    (that) => (self) =>
      isFailure(self)
        ? isFailure(that) && EE.equals(that.failure)(self.failure)
        : isSuccess(self)
        ? isSuccess(that) && EA.equals(that.success)(self.success)
        : isBoth(that) && EE.equals(that.failure)(self.failure) && EA.equals(that.success)(self.success)
  )

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>> => ({
  combine: (that) => (self) =>
    isFailure(self)
      ? isFailure(that)
        ? fail(SE.combine(that.failure)(self.failure))
        : isSuccess(that)
        ? both(self.failure, that.success)
        : both(SE.combine(that.failure)(self.failure), that.success)
      : isSuccess(self)
      ? isFailure(that)
        ? both(that.failure, self.success)
        : isSuccess(that)
        ? succeed(SA.combine(that.success)(self.success))
        : both(that.failure, SA.combine(that.success)(self.success))
      : isFailure(that)
      ? both(SE.combine(that.failure)(self.failure), self.success)
      : isSuccess(that)
      ? both(self.failure, SA.combine(that.success)(self.success))
      : both(SE.combine(that.failure)(self.failure), SA.combine(that.success)(self.success))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<TheseTypeLambda> = {
  mapBoth
}

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @category error handling
 * @since 3.0.0
 */
export const mapError: <E, G>(f: (e: E) => G) => <A>(self: These<E, A>) => These<G, A> =
  /*#__PURE__*/ bifunctor.mapLeft(Bifunctor)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B> = /*#__PURE__*/ bifunctor.map(Bifunctor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TheseTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: These<E, (a: A) => B>) => These<E, B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <E>(self: These<E, unknown>) => These<E, B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <E>(self: These<E, unknown>) => These<E, void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<TheseTypeLambda> = {
  of: succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(Semigroup: Semigroup<E>): Apply<ValidatedT<TheseTypeLambda, E>> => ({
  map,
  ap: (fa) => (fab) =>
    isFailure(fab)
      ? isFailure(fa)
        ? fail(Semigroup.combine(fa.failure)(fab.failure))
        : isSuccess(fa)
        ? fail(fab.failure)
        : fail(Semigroup.combine(fa.failure)(fab.failure))
      : isSuccess(fab)
      ? isFailure(fa)
        ? fail(fa.failure)
        : isSuccess(fa)
        ? succeed(fab.success(fa.success))
        : both(fa.failure, fab.success(fa.success))
      : isFailure(fa)
      ? fail(Semigroup.combine(fa.failure)(fab.failure))
      : isSuccess(fa)
      ? both(fab.failure, fab.success(fa.success))
      : both(Semigroup.combine(fa.failure)(fab.failure), fab.success(fa.success))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(Semigroup: Semigroup<E>): applicative.Applicative<ValidatedT<TheseTypeLambda, E>> => {
  const A = getApply(Semigroup)
  return {
    map,
    ap: A.ap,
    of: succeed
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFlattenable = <E>(S: Semigroup<E>): Flattenable<ValidatedT<TheseTypeLambda, E>> => {
  const flatMap =
    <A, B>(f: (a: A) => These<E, B>) =>
    (ma: These<E, A>): These<E, B> => {
      if (isFailure(ma)) {
        return ma
      }
      if (isSuccess(ma)) {
        return f(ma.success)
      }
      const fb = f(ma.success)
      return isFailure(fb)
        ? fail(S.combine(fb.failure)(ma.failure))
        : isSuccess(fb)
        ? both(ma.failure, fb.success)
        : both(S.combine(fb.failure)(ma.failure), fb.success)
    }

  return {
    map,
    flatMap
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad<ValidatedT<TheseTypeLambda, E>> => {
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
export const FromResult: fromResult_.FromResult<TheseTypeLambda> = {
  fromResult: identity
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => These<E, A> =
  /*#__PURE__*/ fromResult_.fromOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => These<E, B> = /*#__PURE__*/ fromResult_.liftOption(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => These<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => These<E, B>
} = /*#__PURE__*/ fromResult_.liftPredicate(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => These<E, B> = /*#__PURE__*/ fromResult_.liftResult(FromResult)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <E>(onNullable: E) => <A>(a: A) => These<E, NonNullable<A>> =
  /*#__PURE__*/ fromResult_.fromNullable(FromResult)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => These<E, NonNullable<B>> = /*#__PURE__*/ fromResult_.liftNullable(FromResult)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: fromThese_.FromThese<TheseTypeLambda> = {
  fromThese: identity
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const toReadonlyArray = <E, A>(self: These<E, A>): ReadonlyArray<A> =>
  isFailure(self) ? _.empty : [self.success]

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce =
  <B, A>(b: B, f: (b: B, a: A) => B) =>
  <E>(self: These<E, A>): B =>
    isFailure(self) ? b : f(b, self.success)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap =
  <M>(Monoid: Monoid<M>) =>
  <A>(f: (a: A) => M) =>
  <E>(self: These<E, A>): M =>
    isFailure(self) ? Monoid.empty : f(self.success)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight =
  <B, A>(b: B, f: (a: A, b: B) => B) =>
  <E>(self: These<E, A>): B =>
    isFailure(self) ? b : f(self.success, b)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toOption = <E, A>(self: These<E, A>): Option<A> => (isFailure(self) ? _.none : _.some(self.success))

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<TheseTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FS, FR, FO, FE, A>(fa: These<E, Kind<F, FS, FR, FO, FE, A>>) => Kind<F, FS, FR, FO, FE, These<E, A>> =
  /*#__PURE__*/ traversable.sequence(Traversable)

/**
 * @since 3.0.0
 */
export const elem =
  <A>(E: Eq<A>) =>
  (a: A): (<E>(ma: These<E, A>) => boolean) =>
    exists(E.equals(a))

/**
 * @since 3.0.0
 */
export const exists =
  <A>(predicate: Predicate<A>) =>
  (ma: These<unknown, A>): boolean =>
    isFailure(ma) ? false : predicate(ma.success)

/**
 * @example
 * import { toTuple2, fail, succeed, both } from 'fp-ts/These'
 *
 * const f = toTuple2('a', 1)
 * assert.deepStrictEqual(f(fail('b')), ['b', 1])
 * assert.deepStrictEqual(f(succeed(2)), ['a', 2])
 * assert.deepStrictEqual(f(both('b', 2)), ['b', 2])
 *
 * @category conversions
 * @since 3.0.0
 */
export const toTuple2 =
  <E, A>(e: E, a: A) =>
  (fa: These<E, A>): readonly [E, A] =>
    isFailure(fa) ? [fa.failure, a] : isSuccess(fa) ? [e, fa.success] : [fa.failure, fa.success]

/**
 * Converts a `These` to an `Option` discarding the success.
 *
 * @example
 * import * as T from 'fp-ts/These'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(T.getFailure(T.succeed(1)), O.none)
 * assert.deepStrictEqual(T.getFailure(T.fail('err')), O.some('err'))
 * assert.deepStrictEqual(T.getFailure(T.both('err', 1)), O.some('err'))
 *
 * @since 3.0.0
 */
export const getFailure = <E, A>(self: These<E, A>): Option<E> => (isSuccess(self) ? _.none : _.some(self.failure))

/**
 * Converts a `These` to an `Option` discarding the error.
 *
 * @example
 * import * as T from 'fp-ts/These'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(T.getSuccess(T.succeed(1)), O.some(1))
 * assert.deepStrictEqual(T.getSuccess(T.fail('err')), O.none)
 * assert.deepStrictEqual(T.getSuccess(T.both('err', 1)), O.some(1))
 *
 * @since 3.0.0
 */
export const getSuccess = <E, A>(self: These<E, A>): Option<A> => (isFailure(self) ? _.none : _.some(self.success))

/**
 * Returns the `E` value if and only if the value is constructed with `Success`
 *
 * @example
 * import { getFailureOnly, fail, succeed, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getFailureOnly(fail('a')), some('a'))
 * assert.deepStrictEqual(getFailureOnly(succeed(1)), none)
 * assert.deepStrictEqual(getFailureOnly(both('a', 1)), none)
 *
 * @since 3.0.0
 */
export const getFailureOnly = <E, A>(fa: These<E, A>): Option<E> => (isFailure(fa) ? _.some(fa.failure) : _.none)

/**
 * Returns the `A` value if and only if the value is constructed with `Success`
 *
 * @example
 * import { getSuccessOnly, fail, succeed, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getSuccessOnly(fail('a')), none)
 * assert.deepStrictEqual(getSuccessOnly(succeed(1)), some(1))
 * assert.deepStrictEqual(getSuccessOnly(both('a', 1)), none)
 *
 * @since 3.0.0
 */
export const getSuccessOnly = <E, A>(fa: These<E, A>): Option<A> => (isSuccess(fa) ? _.some(fa.success) : _.none)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: These<never, readonly []> = /*#__PURE__*/ succeed(_.empty)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => These<E, B>) =>
  (as: NonEmptyReadonlyArray<A>): These<E, NonEmptyReadonlyArray<B>> => {
    let e: Option<E> = _.none
    const t = f(0, _.head(as))
    if (isFailure(t)) {
      return t
    }
    if (isBoth(t)) {
      e = _.some(t.failure)
    }
    const out: _.NonEmptyArray<B> = [t.success]
    for (let i = 1; i < as.length; i++) {
      const t = f(i, as[i])
      if (isFailure(t)) {
        return t
      }
      if (isBoth(t)) {
        e = _.isNone(e) ? _.some(t.failure) : _.some(S.combine(t.failure)(e.value))
      }
      out.push(t.success)
    }
    return _.isNone(e) ? succeed(out) : both(e.value, out)
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => These<E, B>): ((as: ReadonlyArray<A>) => These<E, ReadonlyArray<B>>) => {
    const g = traverseNonEmptyReadonlyArrayWithIndex(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
  }

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(getApply(S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <E>(S: Semigroup<E>) => {
  const traverseNonEmptyReadonlyArrayWithIndexS = traverseNonEmptyReadonlyArrayWithIndex(S)
  return <A, B>(f: (a: A) => These<E, B>): ((as: NonEmptyReadonlyArray<A>) => These<E, NonEmptyReadonlyArray<B>>) => {
    return traverseNonEmptyReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(S)
  return <A, B>(f: (a: A) => These<E, B>): ((as: ReadonlyArray<A>) => These<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS(flow(SK, f))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(S))`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<These<E, A>>) => These<E, ReadonlyArray<A>>) => traverseReadonlyArray(S)(identity)
