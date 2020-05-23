/**
 * If you have worked with JavaScript at all in the past, it is very likely that you have come across a `TypeError` at
 * some time (other languages will throw similarly named errors in such a case). Usually this happens because some
 * function returns `null` or `undefined` when you were not expecting it and thus not dealing with that possibility in
 * your client code.
 *
 * ```ts
 * const as: Array<string> = []
 * as[0].trim() // throws TypeError: Cannot read property 'trim' of undefined
 * ```
 *
 * `fp-ts` models the absence of values through the `Option` datatype similar to how Scala, Haskell and other FP languages
 * handle optional values. A value of `null` or `undefined` is often abused to represent an absent optional value.
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None`.
 *
 * ```ts
 * import { lookup } from 'fp-ts/lib/Array'
 *
 * const as: Array<string> = []
 * lookup(0, as) // => Option<string>
 * ```
 *
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at option is: it represents the effect of a possibly failing computation.
 *
 * @since 2.0.0
 */
import { Alternative1 } from './Alternative'
import { Applicative } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Filterable1 } from './Filterable'
import { Foldable1 } from './Foldable'
import { identity, Lazy, Predicate, Refinement } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { MonadThrow1 } from './MonadThrow'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { Witherable1 } from './Witherable'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Option: Option<A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Option'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface None {
  readonly _tag: 'None'
}

/**
 * @since 2.0.0
 */
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

/**
 * @since 2.0.0
 */
export type Option<A> = None | Some<A>

/**
 * @since 2.0.0
 */
export const none: Option<never> = { _tag: 'None' }

/**
 * @since 2.0.0
 */
export function some<A>(a: A): Option<A> {
  return { _tag: 'Some', value: a }
}

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @since 2.0.0
 */
export function isSome<A>(fa: Option<A>): fa is Some<A> {
  return fa._tag === 'Some'
}

/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/lib/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @since 2.0.0
 */
export function isNone<A>(fa: Option<A>): fa is None {
  return fa._tag === 'None'
}

/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, fold } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
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
 * @since 2.0.0
 */
export function fold<A, B>(onNone: () => B, onSome: (a: A) => B): (ma: Option<A>) => B {
  return (ma) => (isNone(ma) ? onNone() : onSome(ma.value))
}

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @since 2.0.0
 */
export function fromNullable<A>(a: A): Option<NonNullable<A>> {
  return a == null ? none : some(a as NonNullable<A>)
}

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
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
 * @since 2.0.0
 */
export function toNullable<A>(ma: Option<A>): A | null {
  return isNone(ma) ? null : ma.value
}

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
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
 * @since 2.0.0
 */
export function toUndefined<A>(ma: Option<A>): A | undefined {
  return isNone(ma) ? undefined : ma.value
}

/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
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
 * @since 2.0.0
 */
export function getOrElse<A>(onNone: () => A): (ma: Option<A>) => A {
  return (ma) => (isNone(ma) ? onNone() : ma.value)
}

/**
 * @since 2.6.0
 */
export const getOrElseW: <B>(onNone: () => B) => <A>(ma: Option<A>) => A | B = getOrElse as any

/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, some(1)), true)
 * assert.strictEqual(elem(eqNumber)(2, some(1)), false)
 * assert.strictEqual(elem(eqNumber)(1, none), false)
 *
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A, ma: Option<A>) => boolean {
  return (a, ma) => (isNone(ma) ? false : E.equals(a, ma.value))
}

/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
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
 * @since 2.0.0
 */
export function exists<A>(predicate: Predicate<A>): (ma: Option<A>) => boolean {
  return (ma) => (isNone(ma) ? false : predicate(ma.value))
}

/**
 * Returns a smart constructor based on the given predicate
 *
 * @example
 * import { none, some, fromPredicate } from 'fp-ts/lib/Option'
 *
 * const getOption = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(getOption(-1), none)
 * assert.deepStrictEqual(getOption(1), some(1))
 *
 * @since 2.0.0
 */
export function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A> {
  return (a) => (predicate(a) ? some(a) : none)
}

/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @since 2.0.0
 */
export function tryCatch<A>(f: Lazy<A>): Option<A> {
  try {
    return some(f())
  } catch (e) {
    return none
  }
}

/**
 * Returns an `E` value if possible
 *
 * @since 2.0.0
 */
export function getLeft<E, A>(ma: Either<E, A>): Option<E> {
  return ma._tag === 'Right' ? none : some(ma.left)
}

/**
 * Returns an `A` value if possible
 *
 * @since 2.0.0
 */
export function getRight<E, A>(ma: Either<E, A>): Option<A> {
  return ma._tag === 'Left' ? none : some(ma.right)
}

/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/lib/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 2.0.0
 */
export function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> {
  return (a: A): a is B => isSome(getOption(a))
}

/**
 * This is `chain` + `fromNullable`, useful when working with optional values
 *
 * @example
 * import { some, none, fromNullable, mapNullable } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
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
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     mapNullable(company => company.address),
 *     mapNullable(address => address.street),
 *     mapNullable(street => street.name)
 *   ),
 *   none
 * )
 *
 * @since 2.0.0
 */
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: Option<A>) => Option<B> {
  return (ma) => (isNone(ma) ? none : fromNullable(f(ma.value)))
}

/**
 * @since 2.0.0
 */
export function getShow<A>(S: Show<A>): Show<Option<A>> {
  return {
    show: (ma) => (isNone(ma) ? 'none' : `some(${S.show(ma.value)})`)
  }
}

/**
 * @example
 * import { none, some, getEq } from 'fp-ts/lib/Option'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @since 2.0.0
 */
export function getEq<A>(E: Eq<A>): Eq<Option<A>> {
  return {
    equals: (x, y) => x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value))
  }
}
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/lib/Option'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @since 2.0.0
 */
export function getOrd<A>(O: Ord<A>): Ord<Option<A>> {
  return {
    equals: getEq(O).equals,
    compare: (x, y) => (x === y ? 0 : isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1)
  }
}

/**
 * `Apply` semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
export function getApplySemigroup<A>(S: Semigroup<A>): Semigroup<Option<A>> {
  return {
    concat: (x, y) => (isSome(x) && isSome(y) ? some(S.concat(x.value, y.value)) : none)
  }
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<A>(M: Monoid<A>): Monoid<Option<A>> {
  return {
    ...getApplySemigroup(M),
    empty: some(M.empty)
  }
}

/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @since 2.0.0
 */
export function getFirstMonoid<A = never>(): Monoid<Option<A>> {
  return {
    concat: (x, y) => (isNone(x) ? y : x),
    empty: none
  }
}

/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @since 2.0.0
 */
export function getLastMonoid<A = never>(): Monoid<Option<A>> {
  return {
    concat: (x, y) => (isNone(y) ? x : y),
    empty: none
  }
}

/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @since 2.0.0
 */
export function getMonoid<A>(S: Semigroup<A>): Monoid<Option<A>> {
  return {
    concat: (x, y) => (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))),
    empty: none
  }
}

const defaultSeparate = { left: none, right: none }

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const map_: <A, B>(fa: Option<A>, f: (a: A) => B) => Option<B> = (ma, f) => (isNone(ma) ? none : some(f(ma.value)))

const ap_: <A, B>(fab: Option<(a: A) => B>, fa: Option<A>) => Option<B> = (mab, ma) =>
  isNone(mab) ? none : isNone(ma) ? none : some(mab.value(ma.value))

const chain_: <A, B>(fa: Option<A>, f: (a: A) => Option<B>) => Option<B> = (ma, f) => (isNone(ma) ? none : f(ma.value))

const reduce_: <A, B>(fa: Option<A>, b: B, f: (b: B, a: A) => B) => B = (fa, b, f) => (isNone(fa) ? b : f(b, fa.value))

const foldMap_: <M>(M: Monoid<M>) => <A>(fa: Option<A>, f: (a: A) => M) => M = (M) => (fa, f) =>
  isNone(fa) ? M.empty : f(fa.value)

const reduceRight_: <A, B>(fa: Option<A>, b: B, f: (a: A, b: B) => B) => B = (fa, b, f) =>
  isNone(fa) ? b : f(fa.value, b)

const traverse_ = <F>(F: Applicative<F>) => <A, B>(ta: Option<A>, f: (a: A) => HKT<F, B>): HKT<F, Option<B>> => {
  return isNone(ta) ? F.of(none) : F.map(f(ta.value), some)
}
const sequence_ = <F>(F: Applicative<F>) => <A>(ta: Option<HKT<F, A>>): HKT<F, Option<A>> => {
  return isNone(ta) ? F.of(none) : F.map(ta.value, some)
}

const alt_: <A>(fx: Option<A>, fy: () => Option<A>) => Option<A> = (ma, f) => (isNone(ma) ? f() : ma)

const filter_ = <A>(fa: Option<A>, predicate: Predicate<A>): Option<A> =>
  isNone(fa) ? none : predicate(fa.value) ? fa : none

const filterMap_: <A, B>(fa: Option<A>, f: (a: A) => Option<B>) => Option<B> = (ma, f) =>
  isNone(ma) ? none : f(ma.value)

const extend_: <A, B>(wa: Option<A>, f: (wa: Option<A>) => B) => Option<B> = (wa, f) =>
  isNone(wa) ? none : some(f(wa))

const partition_ = <A>(fa: Option<A>, predicate: Predicate<A>): Separated<Option<A>, Option<A>> => {
  return {
    left: filter_(fa, (a) => !predicate(a)),
    right: filter_(fa, predicate)
  }
}

const partitionMap_: <A, B, C>(fa: Option<A>, f: (a: A) => Either<B, C>) => Separated<Option<B>, Option<C>> = (fa, f) =>
  separate(map_(fa, f))

const wither_ = <F>(F: Applicative<F>) => <A, B>(fa: Option<A>, f: (a: A) => HKT<F, Option<B>>): HKT<F, Option<B>> =>
  isNone(fa) ? F.of(none) : f(fa.value)

const wilt_ = <F>(F: Applicative<F>) => <A, B, C>(
  fa: Option<A>,
  f: (a: A) => HKT<F, Either<B, C>>
): HKT<F, Separated<Option<B>, Option<C>>> => {
  const o = map_(fa, (a) =>
    F.map(f(a), (e) => ({
      left: getLeft(e),
      right: getRight(e)
    }))
  )
  return isNone(o)
    ? F.of({
        left: none,
        right: none
      })
    : o.value
}

/**
 * @since 2.0.0
 */
export const alt: <A>(that: () => Option<A>) => (fa: Option<A>) => Option<A> = (that) => (fa) => alt_(fa, that)

/**
 * @since 2.0.0
 */
export const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B> = (fa) => (fab) => ap_(fab, fa)

/**
 * @since 2.0.0
 */
export const apFirst: <B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * @since 2.0.0
 */
export const apSecond = <B>(fb: Option<B>) => <A>(fa: Option<A>): Option<B> =>
  ap_(
    map_(fa, () => (b: B) => b),
    fb
  )

/**
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B> = (f) => (ma) => chain_(ma, f)

/**
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<A> = (f) => (ma) =>
  chain_(ma, (a) => map_(f(a), () => a))

/**
 * @since 2.0.0
 */
export const duplicate: <A>(ma: Option<A>) => Option<Option<A>> = (wa) => extend_(wa, identity)

/**
 * @since 2.0.0
 */
export const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B> = (f) => (ma) => extend_(ma, f)

/**
 * @since 2.0.0
 */
export const flatten: <A>(mma: Option<Option<A>>) => Option<A> = (mma) => chain_(mma, identity)

/**
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M = (M) => {
  const foldMapM = foldMap_(M)
  return (f) => (fa) => foldMapM(fa, f)
}

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B> = (f) => (fa) => map_(fa, f)

/**
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B = (b, f) => (fa) => reduce_(fa, b, f)

/**
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

/**
 * @since 2.0.0
 */
export const compact: <A>(fa: Option<Option<A>>) => Option<A> = (ma) => chain_(ma, identity)

/**
 * @since 2.0.0
 */
export const separate: <A, B>(ma: Option<Either<A, B>>) => Separated<Option<A>, Option<B>> = (ma) => {
  const o = map_(ma, (e) => ({
    left: getLeft(e),
    right: getRight(e)
  }))
  return isNone(o) ? defaultSeparate : o.value
}

/**
 * @since 2.0.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Option<B>
  <A>(predicate: Predicate<A>): (fa: Option<A>) => Option<A>
} = <A>(predicate: Predicate<A>) => (fa: Option<A>) => filter_(fa, predicate)

/**
 * @since 2.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B> = (f) => (fa) =>
  filterMap_(fa, f)

/**
 * @since 2.0.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Separated<Option<A>, Option<B>>
  <A>(predicate: Predicate<A>): (fa: Option<A>) => Separated<Option<A>, Option<A>>
} = <A>(predicate: Predicate<A>) => (fa: Option<A>) => partition_(fa, predicate)

/**
 * @since 2.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Option<A>) => Separated<Option<B>, Option<C>> = (f) => (fa) => partitionMap_(fa, f)

/**
 * @since 2.0.0
 */
export const fromEither: <E, A>(ma: Either<E, A>) => Option<A> = (ma) => (ma._tag === 'Left' ? none : some(ma.right))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const option: Monad1<URI> &
  Foldable1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI> &
  MonadThrow1<URI> = {
  URI,
  map: map_,
  of: some,
  ap: ap_,
  chain: chain_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence: sequence_,
  zero: () => none,
  alt: alt_,
  extend: extend_,
  compact,
  separate,
  filter: filter_,
  filterMap: filterMap_,
  partition: partition_,
  partitionMap: partitionMap_,
  wither: wither_,
  wilt: wilt_,
  throwError: () => none
}
