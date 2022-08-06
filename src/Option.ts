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
import type { Alt1 } from './Alt'
import type { Alternative1 } from './Alternative'
import type { Applicative as Applicative_, Applicative1 } from './Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import type { Compactable1 } from './Compactable'
import type { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import type { Extend1 } from './Extend'
import type { Filterable1 } from './Filterable'
import type { Foldable1 } from './Foldable'
import {
  chainEitherK as chainEitherK_,
  FromEither1,
  fromEitherK as fromEitherK_,
  fromPredicate as fromPredicate_,
  chainFirstEitherK as chainFirstEitherK_
} from './FromEither'
import { constNull, constUndefined, flow, identity, Lazy, pipe } from './function'
import { bindTo as bindTo_, flap as flap_, Functor1, tupled as tupled_ } from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { Monad1 } from './Monad'
import type { Monoid } from './Monoid'
import type { NonEmptyArray } from './NonEmptyArray'
import { fromCompare, Ord } from './Ord'
import type { Pointed1 } from './Pointed'
import type { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Semigroup } from './Semigroup'
import { Separated, separated } from './Separated'
import type { Show } from './Show'
import type { Traversable1 } from './Traversable'
import { wiltDefault, Witherable1, witherDefault } from './Witherable'
import { guard as guard_, Zero1 } from './Zero'

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
export const getLeft = <E, A>(ma: Either<E, A>): Option<E> => (_.isRight(ma) ? none : some(ma.left))

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
export const getRight = <E, A>(ma: Either<E, A>): Option<A> => (_.isLeft(ma) ? none : some(ma.right))

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
export const fromEither: FromEither1<URI>['fromEither'] = getRight

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW = <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Option<A>): B | C =>
  isNone(ma) ? onNone() : onSome(ma.value)

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
export const match: <B, A>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>) => B = matchW

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW = <B>(onNone: Lazy<B>) => <A>(ma: Option<A>): A | B => (isNone(ma) ? onNone() : ma.value)

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
export const getOrElse: <A>(onNone: Lazy<A>) => (ma: Option<A>) => A = getOrElseW

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
export const tryCatch = <A>(f: Lazy<A>): Option<A> => {
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
export const tryCatchK = <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): ((...a: A) => Option<B>) => (...a) =>
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
export const fromNullable = <A>(a: A): Option<NonNullable<A>> => (a == null ? none : some(a as NonNullable<A>))

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
export const fromNullableK = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
): ((...a: A) => Option<NonNullable<B>>) => (...a) => fromNullable(f(...a))

/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
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
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category interop
 * @since 3.0.0
 */
export const chainNullableK = <A, B>(f: (a: A) => B | null | undefined) => (ma: Option<A>): Option<NonNullable<B>> =>
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
export const toNullable: <A>(ma: Option<A>) => A | null =
  /*#__PURE__*/
  match(constNull, identity)

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
export const toUndefined: <A>(ma: Option<A>) => A | undefined =
  /*#__PURE__*/
  match(constUndefined, identity)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor1<URI>['map'] = (f) => (fa) => (isNone(fa) ? none : some(f(fa.value)))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply1<URI>['ap'] = (fa) => (fab) =>
  isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value))

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed1<URI>['of'] = some

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain1<URI>['chain'] = (f) => (ma) => (isNone(ma) ? none : f(ma.value))

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Option<Option<A>>) => Option<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW = <B>(second: Lazy<Option<B>>) => <A>(first: Option<A>): Option<A | B> =>
  isNone(first) ? second() : first

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt1<URI>['alt'] = altW

/**
 * @category Zero
 * @since 3.0.0
 */
export const zero: Zero1<URI>['zero'] = () => none

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: Extend1<URI>['extend'] = (f) => (wa) => (isNone(wa) ? none : some(f(wa)))

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <A>(ma: Option<A>) => Option<Option<A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: Foldable1<URI>['reduce'] = (b, f) => (fa) => (isNone(fa) ? b : f(b, fa.value))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: Foldable1<URI>['foldMap'] = (M) => (f) => (fa) => (isNone(fa) ? M.empty : f(fa.value))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: Foldable1<URI>['reduceRight'] = (b, f) => (fa) => (isNone(fa) ? b : f(fa.value, b))

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: Compactable1<URI>['compact'] = flatten

const defaultSeparated =
  /*#__PURE__*/
  separated(none, none)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: Compactable1<URI>['separate'] = (ma) =>
  isNone(ma) ? defaultSeparated : separated(getLeft(ma.value), getRight(ma.value))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: Filterable1<URI>['filter'] = <A>(predicate: Predicate<A>) => (fa: Option<A>) =>
  isNone(fa) ? none : predicate(fa.value) ? fa : none

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: Filterable1<URI>['filterMap'] = (f) => (fa) => (isNone(fa) ? none : f(fa.value))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partition: Filterable1<URI>['partition'] = <A>(predicate: Predicate<A>) => (fa: Option<A>) =>
  separated(
    pipe(
      fa,
      filter((a) => !predicate(a))
    ),
    pipe(fa, filter(predicate))
  ) as Separated<Option<never>, Option<A>>

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: Filterable1<URI>['partitionMap'] = (f) => flow(map(f), separate)

/**
 * @category Traversable
 * @since 3.0.0
 */
export const traverse: Traversable1<URI>['traverse'] = <F>(F: Applicative_<F>) => <A, B>(f: (a: A) => HKT<F, B>) => (
  ta: Option<A>
): HKT<F, Option<B>> => (isNone(ta) ? F.of(none) : pipe(f(ta.value), F.map(some)))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Option'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Option: Option<A>
  }
}

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
  fromEquals((second) => (first) =>
    isNone(first) ? isNone(second) : isNone(second) ? false : E.equals(second.value)(first.value)
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
  fromCompare((second) => (first) => (isSome(first) ? (isSome(second) ? O.compare(second.value)(first.value) : 1) : -1))

/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(y)(x)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(b)(a)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = getMonoid(N.SemigroupSum)
 * assert.deepStrictEqual(pipe(none, M.concat(none)), none)
 * assert.deepStrictEqual(pipe(some(1), M.concat(none)), some(1))
 * assert.deepStrictEqual(pipe(none, M.concat(some(1))), some(1))
 * assert.deepStrictEqual(pipe(some(1), M.concat(some(2))), some(3))
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => ({
  concat: (second) => (first) =>
    isNone(first) ? second : isNone(second) ? first : some(S.concat(second.value)(first.value)),
  empty: none
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor1<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply1<URI> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative1<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain1<URI> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad1<URI> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable1<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt1<URI> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Zero: Zero1<URI> = {
  zero
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard =
  /*#__PURE__*/
  guard_(Zero, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: Alternative1<URI> = {
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Extend: Extend1<URI> = {
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable1<URI> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable1<URI> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable1<URI> = {
  map,
  traverse
}

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wither: Witherable1<URI>['wither'] =
  /*#__PURE__*/
  witherDefault(Traversable, Compactable)

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wilt: Witherable1<URI>['wilt'] =
  /*#__PURE__*/
  wiltDefault(Traversable, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Witherable: Witherable1<URI> = {
  wither,
  wilt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither1<URI> = {
  fromEither
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
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK =
  /*#__PURE__*/
  chainFirstEitherK_(FromEither, Chain)

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
export const elem = <A>(E: Eq<A>) => (a: A) => (ma: Option<A>): boolean => (isNone(ma) ? false : E.equals(ma.value)(a))

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
export const exists = <A>(predicate: Predicate<A>) => (ma: Option<A>): boolean =>
  isNone(ma) ? false : predicate(ma.value)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Option<{}> =
  /*#__PURE__*/
  of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Option<readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(f: (index: number, a: A) => Option<B>) => (
  as: ReadonlyNonEmptyArray<A>
): Option<ReadonlyNonEmptyArray<B>> => {
  const o = f(0, _.head(as))
  if (isNone(o)) {
    return none
  }
  const out: NonEmptyArray<B> = [o.value]
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
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
