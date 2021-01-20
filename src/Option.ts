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
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative as ApplicativeHKT, Applicative1 } from './Applicative'
import { apFirst_, Apply1, apSecond_, apS_, apT_ } from './Apply'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import { Extend1 } from './Extend'
import { Filterable1 } from './Filterable'
import { Foldable1 } from './Foldable'
import { FromEither1 } from './FromEither'
import { flow, identity, Lazy, pipe, Predicate, Refinement } from './function'
import { bindTo_, Functor1, tupled_ } from './Functor'
import { HKT } from './HKT'
import { bind_, chainFirst_, Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { fromCompare, Ord } from './Ord'
import { Pointed1 } from './Pointed'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { Witherable1 } from './Witherable'

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
// guards
// -------------------------------------------------------------------------------------

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
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === 'Some'

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
export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === 'None'

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 3.0.0
 */
export const none: Option<never> = { _tag: 'None' }

/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 3.0.0
 */
export const some = <A>(a: A): Option<A> => ({ _tag: 'Some', value: a })

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
 * @category constructors
 * @since 3.0.0
 */
export const fromNullable = <A>(a: A): Option<NonNullable<A>> => (a == null ? none : some(a as NonNullable<A>))

/**
 * Returns a *smart constructor* based on the given predicate.
 *
 * @example
 * import { none, some, fromPredicate } from 'fp-ts/Option'
 *
 * const getOption = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), none)
 * assert.deepStrictEqual(getOption(1), some(1))
 *
 * @category constructors
 * @since 3.0.0
 */
export function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A> {
  return (a) => (predicate(a) ? some(a) : none)
}

/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
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
 * @category constructors
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
export const getLeft = <E, A>(ma: Either<E, A>): Option<E> => (ma._tag === 'Right' ? none : some(ma.left))

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
export const getRight = <E, A>(ma: Either<E, A>): Option<A> => (ma._tag === 'Left' ? none : some(ma.right))

/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getRight)
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromEither: FromEither1<URI>['fromEither'] = getRight

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, fold } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const fold = <B, A>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>): B =>
  isNone(ma) ? onNone() : onSome(ma.value)

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
 * @category destructors
 * @since 3.0.0
 */
export const toNullable = <A>(ma: Option<A>): A | null => (isNone(ma) ? null : ma.value)

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
 * @category destructors
 * @since 3.0.0
 */
export const toUndefined = <A>(ma: Option<A>): A | undefined => (isNone(ma) ? undefined : ma.value)

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
// combinators
// -------------------------------------------------------------------------------------

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
 * @category combinators
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
 * @category combinators
 * @since 3.0.0
 */
export const chainNullableK = <A, B>(f: (a: A) => B | null | undefined) => (ma: Option<A>): Option<B> =>
  isNone(ma) ? none : fromNullable(f(ma.value))

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
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad1<URI>['chain'] = (f) => (ma) => (isNone(ma) ? none : f(ma.value))

/**
 * Derivable from `Monad`.
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
 * @category Alternative
 * @since 3.0.0
 */
export const zero: Alternative1<URI>['zero'] = () => none

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

const defaultSeparate = { left: none, right: none }

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: Compactable1<URI>['separate'] = (ma) => {
  const o = pipe(
    ma,
    map((e) => ({
      left: getLeft(e),
      right: getRight(e)
    }))
  )
  return isNone(o) ? defaultSeparate : o.value
}

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
export const partition: Filterable1<URI>['partition'] = <A>(predicate: Predicate<A>) => (fa: Option<A>) => {
  return {
    left: pipe(
      fa,
      filter((a) => !predicate(a))
    ),
    right: pipe(fa, filter(predicate))
  }
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: Filterable1<URI>['partitionMap'] = (f) => flow(map(f), separate)

/**
 * @category Traversable
 * @since 3.0.0
 */
export const traverse: Traversable1<URI>['traverse'] = <F>(F: ApplicativeHKT<F>) => <A, B>(f: (a: A) => HKT<F, B>) => (
  ta: Option<A>
): HKT<F, Option<B>> => (isNone(ta) ? F.of(none) : pipe(f(ta.value), F.map(some)))

/**
 * @category Traversable
 * @since 3.0.0
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(F: ApplicativeHKT<F>) => <A>(
  ta: Option<HKT<F, A>>
): HKT<F, Option<A>> => (isNone(ta) ? F.of(none) : pipe(ta.value, F.map(some)))

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wither: Witherable1<URI>['wither'] = <F>(F: ApplicativeHKT<F>) => <A, B>(
  f: (a: A) => HKT<F, Option<B>>
) => (fa: Option<A>): HKT<F, Option<B>> => (isNone(fa) ? F.of(none) : f(fa.value))

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wilt: Witherable1<URI>['wilt'] = <F>(F: ApplicativeHKT<F>) => <A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (fa: Option<A>): HKT<F, Separated<Option<B>, Option<C>>> => {
  return isNone(fa)
    ? F.of({
        left: none,
        right: none
      })
    : pipe(
        f(fa.value),
        F.map((e) => ({
          left: getLeft(e),
          right: getRight(e)
        }))
      )
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const URI = 'Option'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Option<A>
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
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * const E = getEq(eqNumber)
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
 * import { ordNumber } from 'fp-ts/Ord'
 * import { pipe } from 'fp-ts/function'
 *
 * const O = getOrd(ordNumber)
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
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(y)(x) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(pipe(none, M.concat(none)), none)
 * assert.deepStrictEqual(pipe(some(1), M.concat(none)), some(1))
 * assert.deepStrictEqual(pipe(none, M.concat(some(1))), some(1))
 * assert.deepStrictEqual(pipe(some(1), M.concat(some(2))), some(1))
 *
 * @category instances
 * @since 3.0.0
 */
export const getFirstMonoid = <A = never>(): Monoid<Option<A>> => ({
  concat: (second) => (first) => (isNone(first) ? second : first),
  empty: none
})

/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(y)(x) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(pipe(none, M.concat(none)), none)
 * assert.deepStrictEqual(pipe(some(1), M.concat(none)), some(1))
 * assert.deepStrictEqual(pipe(none, M.concat(some(1))), some(1))
 * assert.deepStrictEqual(pipe(some(1), M.concat(some(2))), some(2))
 *
 * @category instances
 * @since 3.0.0
 */
export const getLastMonoid = <A = never>(): Monoid<Option<A>> => ({
  concat: (second) => (first) => (isNone(second) ? first : second),
  empty: none
})

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
 * import { semigroupSum } from 'fp-ts/Semigroup'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = getMonoid(semigroupSum)
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
  URI,
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  map,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply1<URI> = {
  URI,
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
  URI,
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable1<URI> = {
  URI,
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt1<URI> = {
  URI,
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: Alternative1<URI> = {
  URI,
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Extend: Extend1<URI> = {
  URI,
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable1<URI> = {
  URI,
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
  URI,
  map,
  traverse,
  sequence
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Witherable: Witherable1<URI> = {
  URI,
  wither,
  wilt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither1<URI> = {
  URI,
  fromEither
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Tests whether a value is a member of a `Option`.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe(O.some(1), O.elem(eqNumber)(1)), true)
 * assert.strictEqual(pipe(O.some(1), O.elem(eqNumber)(2)), false)
 * assert.strictEqual(pipe(O.none, O.elem(eqNumber)(1)), false)
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

/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 3.0.0
 */
export const getRefinement = <A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> => (a: A): a is B =>
  isSome(getOption(a))

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Option<{}> =
  /*#__PURE__*/
  of({})

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
  bind_(Monad)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Applicative)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Option<readonly []> = of([])

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
  apT_(Applicative)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(f: (index: number, a: A) => Option<B>) => (
  as: ReadonlyArray<A>
): Option<ReadonlyArray<B>> => {
  // tslint:disable-next-line: readonly-array
  const out = []
  for (let i = 0; i < as.length; i++) {
    const o = f(i, as[i])
    if (isNone(o)) {
      return none
    }
    out.push(o.value)
  }
  return some(out)
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray: <A, B>(
  f: (a: A) => Option<B>
) => (as: ReadonlyArray<A>) => Option<ReadonlyArray<B>> = (f) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(as: ReadonlyArray<Option<A>>) => Option<ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArray(identity)
