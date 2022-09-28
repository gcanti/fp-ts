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
import type * as semigroupK from './SemigroupK'
import * as monoidK from './MonoidK'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import type * as compactable from './Compactable'
import type { Either } from './Either'
import * as eq from './Eq'
import type * as extendable from './Extendable'
import * as filterable from './Filterable'
import type * as foldable from './Foldable'
import * as fromOption_ from './FromOption'
import * as fromEither_ from './FromEither'
import type { LazyArg } from './function'
import { SK } from './function'
import { constNull, constUndefined, flow, identity, pipe } from './function'
import * as functor from './Functor'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import * as ord from './Ord'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type { Show } from './Show'
import * as traversable from './Traversable'
import * as filterableWithEffect from './FilterableWithEffect'
import type { Eq } from './Eq'
import type { Ord } from './Ord'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

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
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category guards
 * @since 3.0.0
 */
export const isNone: (fa: Option<unknown>) => fa is None = _.isNone

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category guards
 * @since 3.0.0
 */
export const isSome: <A>(fa: Option<A>) => fa is Some<A> = _.isSome

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

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
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 3.0.0
 */
export const getLeft: <E>(ma: Either<E, unknown>) => Option<E> = _.getLeft

/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 3.0.0
 */
export const getRight: <A>(ma: Either<unknown, A>) => Option<A> = _.getRight

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getRight)
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <A>(fa: Either<unknown, A>) => Option<A> = getRight

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
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
 * @category destructors
 * @since 3.0.0
 */
export const match =
  <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) =>
  (ma: Option<A>): B | C =>
    isNone(ma) ? onNone() : onSome(ma.value)

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse =
  <B>(onNone: LazyArg<B>) =>
  <A>(ma: Option<A>): A | B =>
    isNone(ma) ? onNone() : ma.value

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * See also [`tryCatchK`](#tryCatchK).
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch = <A>(f: LazyArg<A>): Option<A> => {
  try {
    return some(f())
  } catch (e) {
    return none
  }
}

/**
 * Converts a function that may throw to one returning a `Option`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): ((...a: A) => Option<B>) =>
  (...a) =>
    tryCatch(() => f(...a))

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => Option<NonNullable<A>> = _.fromNullable

/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { fromNullableK, none, some } from 'fp-ts/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = fromNullableK(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none)
 *
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK =
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B | null | undefined): ((...a: A) => Option<NonNullable<B>>) =>
  (...a) =>
    fromNullable(f(...a))

/**
 * This is `flatMap` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, flatMapNullableK } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
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
 *     flatMapNullableK(company => company.address),
 *     flatMapNullableK(address => address.street),
 *     flatMapNullableK(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     flatMapNullableK(company => company.address),
 *     flatMapNullableK(address => address.street),
 *     flatMapNullableK(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK =
  <A, B>(f: (a: A) => B | null | undefined) =>
  (ma: Option<A>): Option<NonNullable<B>> =>
    isNone(ma) ? none : fromNullable(f(ma.value))

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @category interop
 * @since 3.0.0
 */
export const toNullable: <A>(ma: Option<A>) => A | null = /*#__PURE__*/ match(constNull, identity)

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
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
 * @category interop
 * @since 3.0.0
 */
export const toUndefined: <A>(ma: Option<A>) => A | undefined = /*#__PURE__*/ match(constUndefined, identity)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B> = (f) => (fa) =>
  isNone(fa) ? none : some(f(fa.value))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Option<B>) => (self: Option<A>) => Option<B> = (f) => (self) =>
  isNone(self) ? none : f(self.value)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<OptionTypeLambda> = {
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft: <_>(that: Option<_>) => <A>(self: Option<A>) => Option<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <A>(that: Option<A>) => <_>(self: Option<_>) => Option<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => Option<A> = some

/**
 * @since 3.0.0
 */
export const unit: Option<void> = of(undefined)

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Option<Option<A>>) => Option<A> = /*#__PURE__*/ flatMap(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * | x       | y       | pipe(x, combineK(() => y) |
 * | ------- | ------- | ------------------------- |
 * | none    | none    | none                      |
 * | some(a) | none    | some(a)                   |
 * | none    | some(b) | some(b)                   |
 * | some(a) | some(b) | some(a)                   |
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.combineK(() => O.none)
 *   ),
 *   O.none
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.combineK<string>(() => O.none)
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.combineK(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.combineK(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 *
 * @category instance operations
 * @since 3.0.0
 */
export const combineK =
  <B>(second: LazyArg<Option<B>>) =>
  <A>(self: Option<A>): Option<A | B> =>
    isNone(self) ? second() : self

/**
 * @category MonoidK
 * @since 3.0.0
 */
export const emptyK: <A>() => Option<A> = () => none

/**
 * @category Extendable
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B> = (f) => (wa) =>
  isNone(wa) ? none : some(f(wa))

/**
 * Derivable from `Extendable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const duplicate: <A>(ma: Option<A>) => Option<Option<A>> = /*#__PURE__*/ extend(identity)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B = (b, f) => (fa) =>
  isNone(fa) ? b : f(b, fa.value)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M = (M) => (f) => (fa) =>
  isNone(fa) ? M.empty : f(fa.value)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B = (b, f) => (fa) =>
  isNone(fa) ? b : f(fa.value, b)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: <A>(foa: Option<Option<A>>) => Option<A> = flatten

const defaultSeparated = /*#__PURE__*/ [none, none] as const

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(fe: Option<Either<A, B>>) => readonly [Option<A>, Option<B>] = (ma) =>
  isNone(ma) ? defaultSeparated : [getLeft(ma.value), getRight(ma.value)]

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B> = (f) => (fa) =>
  isNone(fa) ? none : f(fa.value)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Option<A>) => readonly [Option<B>, Option<C>] = (f) => flow(map(f), separate)

/**
 * @category Traversable
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Option<A>) => Kind<F, S, R, O, E, Option<B>> =
  (F) => (f) => (ta) =>
    isNone(ta) ? F.of(none) : pipe(f(ta.value), F.map(some))

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
 * import { none, some, getEq } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
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
    (second) => (first) => isNone(first) ? isNone(second) : isNone(second) ? false : E.equals(second.value)(first.value)
  )

/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
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
  ord.fromCompare(
    (second) => (first) => isSome(first) ? (isSome(second) ? O.compare(second.value)(first.value) : 1) : -1
  )

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
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
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
  combine: (second) => (first) =>
    isNone(first) ? second : isNone(second) ? first : some(S.combine(second.value)(first.value)),
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
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<OptionTypeLambda> = {
  of
}

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
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Option<A>, fb: Option<B>) => Option<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `Option`.
 *
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D> = /*#__PURE__*/ apply.lift3(Apply)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <B>(second: Option<B>) => <A>(self: Option<A>) => Option<A> =
  /*#__PURE__*/ apply.zipLeftPar(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <B>(second: Option<B>) => <A>(self: Option<A>) => Option<B> =
  /*#__PURE__*/ apply.zipRightPar(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<OptionTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<OptionTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, _>(f: (a: A) => Option<_>) => (self: Option<A>) => Option<A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<OptionTypeLambda> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const SemigroupK: semigroupK.SemigroupK<OptionTypeLambda> = {
  combineK
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MonoidK: monoidK.MonoidK<OptionTypeLambda> = {
  combineK,
  emptyK
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard: (b: boolean) => Option<void> = /*#__PURE__*/ monoidK.guard(MonoidK, Pointed)

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
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<OptionTypeLambda> = {
  filterMap,
  partitionMap
}

/**
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: Option<C>) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => Option<B>
} = /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: Option<C>) => readonly [Option<C>, Option<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => readonly [Option<B>, Option<B>]
} = /*#__PURE__*/ filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<OptionTypeLambda> = {
  traverse
}

/**
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, O, E, A>(fas: Option<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Option<A>> =
  /*#__PURE__*/ traversable.getDefaultSequence<OptionTypeLambda>(traverse)

/**
 * @category FilterableWithEffect
 * @since 3.0.0
 */
export const filterMapWithEffect: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, Option<B>>
) => (ta: Option<A>) => Kind<F, S, R, O, E, Option<B>> =
  /*#__PURE__*/ filterableWithEffect.getDefaultFilterMapWithEffect(Traversable, Compactable)

/**
 * @category FilterableWithEffect
 * @since 3.0.0
 */
export const partitionMapWithEffect: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Either<B, C>>
) => (wa: Option<A>) => Kind<F, S, R, O, E, readonly [Option<B>, Option<C>]> =
  /*#__PURE__*/ filterableWithEffect.getDefaultPartitionMapWithEffect(Traversable, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithEffect: filterableWithEffect.FilterableWithEffect<OptionTypeLambda> = {
  filterMapWithEffect,
  partitionMapWithEffect
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterWithEffect: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicateK: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, S, R, O, E, Option<B>> =
  /*#__PURE__*/ filterableWithEffect.filterWithEffect(FilterableWithEffect)

/**
 * @category combinators
 * @since 3.0.0
 */
export const partitionWithEffect: <F extends TypeLambda>(
  ApplicativeF: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicateK: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, S, R, O, E, readonly [Option<B>, Option<B>]> =
  /*#__PURE__*/ filterableWithEffect.partitionWithEffect(FilterableWithEffect)

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
 * import * as O from 'fp-ts/Option'
 *
 * const getOption = O.fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), O.none)
 * assert.deepStrictEqual(getOption(1), O.some(1))
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => Option<B> =
  /*#__PURE__*/ fromOption_.fromPredicate(FromOption)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement: <C extends A, B extends A, A = C>(refinement: Refinement<A, B>) => (c: C) => Option<B> =
  /*#__PURE__*/ fromOption_.fromRefinement(FromOption)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<OptionTypeLambda> = {
  fromEither
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => Option<B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Option<A>) => Option<B> =
  /*#__PURE__*/ fromEither_.flatMapEitherK(FromEither, Flattenable)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Tests whether a value is a member of a `Option`.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(1)), true)
 * assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(2)), false)
 * assert.strictEqual(pipe(O.none, O.elem(N.Eq)(1)), false)
 *
 * @since 3.0.0
 */
export const elem =
  <A>(E: Eq<A>) =>
  (a: A) =>
  (ma: Option<A>): boolean =>
    isNone(ma) ? false : E.equals(ma.value)(a)

/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
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
export const exists =
  <A>(predicate: Predicate<A>) =>
  (ma: Option<A>): boolean =>
    isNone(ma) ? false : predicate(ma.value)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Option<{}> = /*#__PURE__*/ of(_.Do)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Option<A>) => Option<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const DoT: Option<readonly []> = /*#__PURE__*/ of(_.DoT)

/**
 * @since 3.0.0
 */
export const tupled: <A>(self: Option<A>) => Option<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const bindTPar: <B>(
  fb: Option<B>
) => <A extends ReadonlyArray<unknown>>(self: Option<A>) => Option<readonly [...A, B]> =
  /*#__PURE__*/ apply.bindTPar(Apply)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindT: <A extends ReadonlyArray<unknown>, B>(
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<readonly [...A, B]> = /*#__PURE__*/ flattenable.bindT(Flattenable)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, B>(f: (index: number, a: A) => Option<B>) =>
  (as: ReadonlyNonEmptyArray<A>): Option<ReadonlyNonEmptyArray<B>> => {
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
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => Option<B>
): ((as: ReadonlyArray<A>) => Option<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : DoT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => Option<B>
): ((as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
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
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<Option<A>>) => Option<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
