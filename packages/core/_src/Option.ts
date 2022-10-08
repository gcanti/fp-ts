/**
 * ```ts
 * type Option<A> = None | Some<A>
 * ```
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None`.
 *
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at `Option` is: it represents the effect of a possibly failing computation.
 *
 * @since 3.0.0
 */
import type * as alt from '@fp-ts/core/Alt'
import * as alternative from '@fp-ts/core/Alternative'
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import type * as compactable from '@fp-ts/core/Compactable'
import type { Eq } from '@fp-ts/core/Eq'
import * as eq from '@fp-ts/core/Eq'
import type * as extendable from '@fp-ts/core/Extendable'
import * as filterable from '@fp-ts/core/Filterable'
import * as flattenable from '@fp-ts/core/Flattenable'
import * as foldable from '@fp-ts/core/Foldable'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromOption_ from '@fp-ts/core/FromOption'
import * as fromResult_ from '@fp-ts/core/FromResult'
import type { LazyArg } from '@fp-ts/core/Function'
import { flow, identity, pipe, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import * as iterable from '@fp-ts/core/Iterable'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Ord } from '@fp-ts/core/Ord'
import * as ord from '@fp-ts/core/Ord'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result } from '@fp-ts/core/Result'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Show } from '@fp-ts/core/Show'
import * as traversable from '@fp-ts/core/Traversable'
import * as traversableFilterable from '@fp-ts/core/TraversableFilterable'

/**
 * @category model
 * @since 3.0.0
 */
export interface None {
  readonly _tag: 'None'
}

/**
 * @category model
 * @since 3.0.0
 */
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

/**
 * @category model
 * @since 3.0.0
 */
export type Option<A> = None | Some<A>

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this['Out1']>
}

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from '@fp-ts/core/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category refinements
 * @since 3.0.0
 */
export const isNone: (fa: Option<unknown>) => fa is None = _.isNone

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from '@fp-ts/core/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category refinements
 * @since 3.0.0
 */
export const isSome: <A>(fa: Option<A>) => fa is Some<A> = _.isSome

/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 3.0.0
 */
export const none: Option<never> = _.none

/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => Option<A> = _.some

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIterable = <A>(iterable: Iterable<A>): Option<A> => {
  for (const a of iterable) {
    return some(a)
  }
  return none
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromEntries = <I, A>(iterable: Iterable<readonly [I, A]>): Option<A> => {
  for (const [_, a] of iterable) {
    return some(a)
  }
  return none
}

/**
 * Returns the `Failure` value of a `Result` if possible.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(O.getFailure(E.succeed(1)), O.none)
 * assert.deepStrictEqual(O.getFailure(E.fail('a')), O.some('a'))
 *
 * @category constructors
 * @since 3.0.0
 */
export const getFailure: <E>(ma: Result<E, unknown>) => Option<E> = _.getFailure

/**
 * Returns the `Success` value of an `Result` if possible.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as E from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(O.getSuccess(E.succeed(1)), O.some(1))
 * assert.deepStrictEqual(O.getSuccess(E.fail('a')), O.none)
 *
 * @category constructors
 * @since 3.0.0
 */
export const getSuccess: <A>(ma: Result<unknown, A>) => Option<A> = _.getSuccess

/**
 * Converts an `Result` to an `Option` discarding the error.
 *
 * Alias of [getSuccess](#getsuccess)
 *
 * @category conversions
 * @since 3.0.0
 */
export const fromResult = getSuccess

/**
 * @category conversions
 * @since 3.0.0
 */
export const toResult: <E>(onNone: E) => <A>(fa: Option<A>) => Result<E, A> = _.fromOption

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const match = <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) =>
  (ma: Option<A>): B | C => isNone(ma) ? onNone() : onSome(ma.value)

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(0)
 *   ),
 *   0
 * )
 *
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse = <B>(onNone: B) => <A>(ma: Option<A>): A | B => isNone(ma) ? onNone : ma.value

/**
 * Converts an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * @example
 * import { none, some, fromThrowable } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(
 *   fromThrowable(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(fromThrowable(() => 1), some(1))
 *
 * @category interop
 * @see {@link liftThrowable}
 * @since 3.0.0
 */
export const fromThrowable = <A>(f: () => A): Option<A> => {
  try {
    return some(f())
  } catch (e) {
    return none
  }
}

/**
 * Lifts a function that may throw to one returning a `Option`.
 *
 * @category interop
 * @since 3.0.0
 */
export const liftThrowable = <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): ((...a: A) => Option<B>) =>
  (...a) => fromThrowable(() => f(...a))

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => Option<NonNullable<A>> = _.optionFromNullable

/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { liftNullable, none, some } from '@fp-ts/core/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = liftNullable(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none)
 *
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
): ((...a: A) => Option<NonNullable<B>>) => (...a) => fromNullable(f(...a))

/**
 * This is `flatMap` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, flatMapNullable } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     flatMapNullable(company => company.address),
 *     flatMapNullable(address => address.street),
 *     flatMapNullable(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     flatMapNullable(company => company.address),
 *     flatMapNullable(address => address.street),
 *     flatMapNullable(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable = <A, B>(f: (a: A) => B | null | undefined) =>
  (ma: Option<A>): Option<NonNullable<B>> => isNone(ma) ? none : fromNullable(f(ma.value))

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNull } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNull
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNull
 *   ),
 *   null
 * )
 *
 * @category conversions
 * @since 3.0.0
 */
export const toNull: <A>(self: Option<A>) => A | null = getOrElse(null)

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category conversions
 * @since 3.0.0
 */
export const toUndefined: <A>(self: Option<A>) => A | undefined = getOrElse(undefined)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B> = (f) =>
  (fa) => isNone(fa) ? none : some(f(fa.value))

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<OptionTypeLambda> = {
  of: some
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Option<B>) => (self: Option<A>) => Option<B> = (f) =>
  (self) => isNone(self) ? none : f(self.value)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<OptionTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(bfc: (b: B) => Option<C>) => <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C> =
  flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<OptionTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => Option<A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<OptionTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: (that: Option<unknown>) => <A>(self: Option<A>) => Option<A> = flattenable.zipLeft(
  Flattenable
)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: Option<A>) => (self: Option<unknown>) => Option<A> = flattenable
  .zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B> = flattenable.ap(
  Flattenable
)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: Option<Option<A>>) => Option<A> = flatMap(identity)

/**
 * Lazy version of `orElse`.
 *
 * @category error handling
 * @since 3.0.0
 */
export const catchAll = <B>(that: LazyArg<Option<B>>) =>
  <A>(self: Option<A>): Option<A | B> => isNone(self) ? that() : self

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * | x       | y       | pipe(x, orElse(y) |
 * | ------- | ------- | ------------------|
 * | none    | none    | none              |
 * | some(a) | none    | some(a)           |
 * | none    | some(b) | some(b)           |
 * | some(a) | some(b) | some(a)           |
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.orElse(O.none)
 *   ),
 *   O.none
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse<string>(O.none)
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.orElse(O.some('b'))
 *   ),
 *   O.some('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.orElse(O.some('b'))
 *   ),
 *   O.some('a')
 * )
 *
 * @category instance operations
 * @since 3.0.0
 */
export const orElse = <B>(that: Option<B>): (<A>(self: Option<A>) => Option<A | B>) => catchAll(() => that)

/**
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B> = (f) =>
  (wa) => isNone(wa) ? none : some(f(wa))

/**
 * @since 3.0.0
 */
export const duplicate: <A>(ma: Option<A>) => Option<Option<A>> = extend(identity)

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <A>(foa: Option<Option<A>>) => Option<A> = flatten

const defaultSeparated = [none, none] as const

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <A, B>(fe: Option<Result<A, B>>) => readonly [Option<A>, Option<B>] = (ma) =>
  isNone(ma) ? defaultSeparated : [getFailure(ma.value), getSuccess(ma.value)]

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B> = (f) =>
  (fa) => isNone(fa) ? none : f(fa.value)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: Option<A>) => readonly [Option<B>, Option<C>] = (f) => flow(map(f), separate)

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Option<A>) => Kind<F, S, R, O, E, Option<B>> = (
  F
) => (f) => (ta) => isNone(ta) ? F.of(none) : pipe(f(ta.value), F.map(some))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<Option<A>> => ({
  show: (ma) => (isNone(ma) ? 'none' : `some(${S.show(ma.value)})`)
})

/**
 * @example
 * import { none, some, getEq } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals(none)(none), true)
 * assert.strictEqual(E.equals(none)(some(1)), false)
 * assert.strictEqual(E.equals(some(1))(none), false)
 * assert.strictEqual(E.equals(some(1))(some(2)), false)
 * assert.strictEqual(E.equals(some(1))(some(1)), true)
 *
 * @category instances
 * @since 3.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<Option<A>> =>
  eq.fromEquals(
    (that) => (self) => isNone(self) ? isNone(that) : isNone(that) ? false : E.equals(that.value)(self.value)
  )

/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 * @example
 * import { none, some, getOrd } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const O = getOrd(N.Ord)
 * assert.strictEqual(pipe(none, O.compare(none)), 0)
 * assert.strictEqual(pipe(none, O.compare(some(1))), -1)
 * assert.strictEqual(pipe(some(1), O.compare(none)), 1)
 * assert.strictEqual(pipe(some(1), O.compare(some(2))), -1)
 * assert.strictEqual(pipe(some(1), O.compare(some(1))), 0)
 *
 * @category instances
 * @since 3.0.0
 */
export const getOrd = <A>(O: Ord<A>): Ord<Option<A>> =>
  ord.fromCompare((that) => (self) => isSome(self) ? (isSome(that) ? O.compare(that.value)(self.value) : 1) : -1)

/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * combined using the provided `Semigroup`
 *
 * | x       | y       | combine(y)(x)       |
 * | ------- | ------- | ------------------- |
 * | none    | none    | none                |
 * | some(a) | none    | some(a)             |
 * | none    | some(a) | some(a)             |
 * | some(a) | some(b) | some(combine(b)(a)) |
 *
 * @example
 * import { getMonoid, some, none } from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const M = getMonoid(N.SemigroupSum)
 * assert.deepStrictEqual(pipe(none, M.combine(none)), none)
 * assert.deepStrictEqual(pipe(some(1), M.combine(none)), some(1))
 * assert.deepStrictEqual(pipe(none, M.combine(some(1))), some(1))
 * assert.deepStrictEqual(pipe(some(1), M.combine(some(2))), some(3))
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => ({
  combine: (that) => (self) => isNone(self) ? that : isNone(that) ? self : some(S.combine(that.value)(self.value)),
  empty: none
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<OptionTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B> = functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: Option<unknown>) => Option<B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: Option<unknown>) => Option<void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<OptionTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Option`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Option<A>, fb: Option<B>) => Option<C> = apply
  .lift2(Apply)

/**
 * Lifts a ternary function into `Option`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D> = apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<OptionTypeLambda> = {
  map,
  ap,
  of: some
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<OptionTypeLambda> = {
  map,
  of: some,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => Option<unknown>) => (self: Option<A>) => Option<A> = flattenable.tap(
  Flattenable
)

/**
 * @category conversions
 * @since 3.0.0
 */
export const toIterable: <A>(self: Option<A>) => Iterable<A> = match(() => iterable.empty, iterable.of)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<OptionTypeLambda> = {
  toIterable
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (self: Option<A>) => B = foldable.reduce(
  Foldable
)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => (self: Option<A>) => M = foldable
  .foldMap(Foldable)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (self: Option<A>) => B = foldable
  .reduceRight(Foldable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<OptionTypeLambda> = {
  orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: alternative.Alternative<OptionTypeLambda> = {
  orElse,
  none: () => none
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard: (b: boolean) => Option<void> = alternative.guard(Alternative, FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const Extendable: extendable.Extendable<OptionTypeLambda> = {
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<OptionTypeLambda> = {
  compact
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<OptionTypeLambda> = {
  filterMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: Option<C>) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => Option<B>
} = filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: Option<C>) => readonly [Option<C>, Option<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => readonly [Option<B>, Option<B>]
} = filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<OptionTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, O, E, A>(fas: Option<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Option<A>> = traversable
  .sequence(Traversable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const traverseFilterMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, Option<B>>
) => (ta: Option<A>) => Kind<F, S, R, O, E, Option<B>> = traversableFilterable.traverseFilterMap(
  Traversable,
  Compactable
)

/**
 * @category filtering
 * @since 3.0.0
 */
export const traversePartitionMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
) => (wa: Option<A>) => Kind<F, S, R, O, E, readonly [Option<B>, Option<C>]> = traversableFilterable
  .traversePartitionMap(Traversable, Functor, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<OptionTypeLambda> = {
  traverseFilterMap,
  traversePartitionMap
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, S, R, O, E, Option<B>> = traversableFilterable.traverseFilter(
  TraversableFilterable
)

/**
 * @category filtering
 * @since 3.0.0
 */
export const traversePartition: <F extends TypeLambda>(
  ApplicativeF: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, S, R, O, E, readonly [Option<B>, Option<B>]> = traversableFilterable
  .traversePartition(TraversableFilterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<OptionTypeLambda> = {
  fromOption: identity
}

/**
 * Returns a *smart constructor* based on the given predicate.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 *
 * const getOption = O.liftPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), O.none)
 * assert.deepStrictEqual(getOption(1), O.some(1))
 *
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Option<B>
} = fromOption_.liftPredicate(FromOption)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<OptionTypeLambda> = {
  fromResult
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => Option<B> = fromResult_.liftResult(FromResult)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: Option<A>) => Option<B> = fromResult_
  .flatMapResult(FromResult, Flattenable)

/**
 * Tests whether a value is a member of a `Option`.
 *
 * @example
 * import * as O from '@fp-ts/core/Option'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(1)), true)
 * assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(2)), false)
 * assert.strictEqual(pipe(O.none, O.elem(N.Eq)(1)), false)
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) => (a: A) => (ma: Option<A>): boolean => isNone(ma) ? false : E.equals(ma.value)(a)

/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 3.0.0
 */
export const exists = <A>(predicate: Predicate<A>) =>
  (ma: Option<A>): boolean => isNone(ma) ? false : predicate(ma.value)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Option<{}> = some(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Option<A>) => Option<{ readonly [K in N]: A }> = functor
  .bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor
  .let(Functor)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = flattenable.bind(
  Flattenable
)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Option<readonly []> = some(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Option<A>) => Option<readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: Option<B>
) => <A extends ReadonlyArray<unknown>>(self: Option<A>) => Option<readonly [...A, B]> = apply.zipFlatten(
  Apply
)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: Option<B>, f: (a: A, b: B) => C) => (self: Option<A>) => Option<C> = apply
  .zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, B>(f: (index: number, a: A) => Option<B>) =>
  (as: NonEmptyReadonlyArray<A>): Option<NonEmptyReadonlyArray<B>> => {
    const o = f(0, _.head(as))
    if (isNone(o)) {
      return none
    }
    const out: _.NonEmptyArray<B> = [o.value]
    for (let i = 1; i < as.length; i++) {
      const o = f(i, as[i])
      if (isNone(o)) {
        return none
      }
      out.push(o.value)
    }
    return some(out)
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => Option<B>
): ((as: ReadonlyArray<A>) => Option<ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, B>(
  f: (a: A) => Option<B>
): ((as: NonEmptyReadonlyArray<A>) => Option<NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => Option<B>
): ((as: ReadonlyArray<A>) => Option<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<Option<A>>) => Option<ReadonlyArray<A>> =
  traverseReadonlyArray(identity)
