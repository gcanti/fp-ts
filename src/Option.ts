/**
 * @file If you have worked with JavaScript at all in the past, it is very likely that you have come across a `TypeError` at
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
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at option is: it represents the effect of a possibly failing computation.
 *
 * ```ts
 * import { Option, some, none } from 'fp-ts/lib/Option'
 *
 * const someValue: Option<string> = some('foo')
 * const emptyValue: Option<string> = none
 * ```
 *
 * Let's write a function that may or not give us a string, thus returning `Option<string>`
 *
 *
 * ```ts
 * function head(as: Array<string>): Option<string> {
 *   return as.length > 0 ? some(as[0]) : none
 * }
 * ```
 *
 * Using `getOrElse` we can provide a default value `"No value"` when the optional argument `None` does not exist:
 *
 * ```ts
 * import { getOrElse } from 'fp-ts/lib/Option'
 *
 * const value1 = head(['foo', 'bar']) // some('foo)
 * const value2 = head([]) // none
 * getOrElse(value1, 'No value') // 'foo'
 * getOrElse(value2, 'No value') // 'No value'
 * ```
 *
 * Checking whether option has value:
 *
 * ```ts
 * import { isNone } from 'fp-ts/lib/Option'
 *
 * isNone(value1) // false
 * isNone(value2) // true
 * ```
 *
 * We can pattern match using the `fold` function
 *
 * ```ts
 * import { fold } from 'fp-ts/lib/Option'
 *
 * const x: Option<number> = some(3)
 * const y: Option<number> = none
 * fold(x, 1, n => n * 3) // 9
 * fold(y, 1, n => n * 3) // 1
 * ```
 *
 * You can chain several possibly failing computations using the `chain` function
 *
 * ```ts
 * import { option } from 'fp-ts/lib/Option'
 *
 * function inverse(n: number): Option<number> {
 *   return n === 0 ? none : some(1 / n)
 * }
 *
 * option.chain(x, inverse) // 1/3
 * option.chain(y, inverse) // none
 * option.chain(some(0), inverse) // none
 * ```
 */
import { Alternative1 } from './Alternative'
import { Applicative } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import { Extend1 } from './Extend'
import { Filterable1 } from './Filterable'
import { Foldable1 } from './Foldable'
import { identity, Lazy, not, Predicate, Refinement } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { getDualMonoid, Monoid } from './Monoid'
import { fromCompare, Ord } from './Ord'
import { Plus1 } from './Plus'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { Witherable1 } from './Witherable'

declare module './HKT' {
  interface URI2HKT<A> {
    Option: Option<A>
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
 * @since 2.0.0
 */
export function isSome<A>(fa: Option<A>): fa is Some<A> {
  return fa._tag === 'Some'
}

/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isNone<A>(fa: Option<A>): fa is None {
  return fa._tag === 'None'
}

/**
 * @since 2.0.0
 */
export function fold<A, R>(ma: Option<A>, onNone: () => R, onSome: (a: A) => R): R {
  return isNone(ma) ? onNone() : onSome(ma.value)
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
export function fromNullable<A>(a: A | null | undefined): Option<A> {
  return a == null ? none : some(a)
}

/**
 * @since 2.0.0
 */
export function fromEither<L, A>(ma: Either<L, A>): Option<A> {
  return ma._tag === 'Left' ? none : some(ma.right)
}

/**
 * @since 2.0.0
 */
export function toNullable<A>(ma: Option<A>): A | null {
  return isNone(ma) ? null : ma.value
}

/**
 * @since 2.0.0
 */
export function toUndefined<A>(ma: Option<A>): A | undefined {
  return isNone(ma) ? undefined : ma.value
}

/**
 * @since 2.0.0
 */
export function getOrElse<A>(ma: Option<A>, f: () => A): A {
  return isNone(ma) ? f() : ma.value
}

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A, ma: Option<A>) => boolean {
  return (a, ma) => (isNone(ma) ? false : E.equals(a, ma.value))
}

/**
 * @since 2.0.0
 */
export function exists<A>(ma: Option<A>, predicate: Predicate<A>): boolean {
  return isNone(ma) ? false : predicate(ma.value)
}

/**
 * @example
 * import { none, some, fromPredicate } from 'fp-ts/lib/Option'
 *
 * const positive = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(positive(-1), none)
 * assert.deepStrictEqual(positive(1), some(1))
 *
 * @since 2.0.0
 */
export function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A> {
  return a => (predicate(a) ? some(a) : none)
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
 * Returns an `L` value if possible
 *
 * @since 2.0.0
 */
export function getLeft<L, A>(ma: Either<L, A>): Option<L> {
  return ma._tag === 'Right' ? none : some(ma.left)
}

/**
 * Returns an `A` value if possible
 *
 * @since 2.0.0
 */
export function getRight<L, A>(ma: Either<L, A>): Option<A> {
  return ma._tag === 'Left' ? none : some(ma.right)
}

/**
 * Returns a refinement from a prism.
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
 * @since 2.0.0
 */
export function mapNullable<A, B>(ma: Option<A>, f: (a: A) => B | null | undefined): Option<B> {
  return isNone(ma) ? none : fromNullable(f(ma.value))
}

/**
 * @since 2.0.0
 */
export function getShow<A>(S: Show<A>): Show<Option<A>> {
  return {
    show: ma => (isNone(ma) ? 'none' : `some(${S.show(ma.value)})`)
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
  return fromEquals((x, y) => (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)))
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
  return fromCompare((x, y) => (isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1))
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
  return getDualMonoid(getFirstMonoid())
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

const filter = <A>(fa: Option<A>, predicate: Predicate<A>): Option<A> => {
  return isNone(fa) ? none : predicate(fa.value) ? fa : none
}

const partition = <A>(fa: Option<A>, predicate: Predicate<A>): Separated<Option<A>, Option<A>> => {
  return {
    left: filter(fa, not(predicate)),
    right: filter(fa, predicate)
  }
}

const chain = <A, B>(fa: Option<A>, f: (a: A) => Option<B>): Option<B> => {
  return isNone(fa) ? none : f(fa.value)
}

const traverse = <F>(F: Applicative<F>) => <A, B>(ta: Option<A>, f: (a: A) => HKT<F, B>): HKT<F, Option<B>> => {
  return isNone(ta) ? F.of(none) : F.map(f(ta.value), some)
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Option<HKT<F, A>>): HKT<F, Option<A>> => {
  return isNone(ta) ? F.of(none) : F.map(ta.value, some)
}

const defaultSeparate = { left: none, right: none }

const map = <A, B>(ma: Option<A>, f: (a: A) => B): Option<B> => {
  return isNone(ma) ? none : some(f(ma.value))
}

const separate = <RL, RR>(ma: Option<Either<RL, RR>>): Separated<Option<RL>, Option<RR>> => {
  return getOrElse(
    map(ma, e => ({
      left: getLeft(e),
      right: getRight(e)
    })),
    () => defaultSeparate
  )
}

const wither = <F>(F: Applicative<F>) => <A, B>(fa: Option<A>, f: (a: A) => HKT<F, Option<B>>): HKT<F, Option<B>> =>
  isNone(fa) ? F.of(none) : f(fa.value)

const wilt = <F>(F: Applicative<F>) => <RL, RR, A>(
  fa: Option<A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
): HKT<F, Separated<Option<RL>, Option<RR>>> => {
  return getOrElse(
    map(fa, a =>
      F.map(f(a), e => ({
        left: getLeft(e),
        right: getRight(e)
      }))
    ),
    () =>
      F.of({
        left: none,
        right: none
      })
  )
}

const zero = () => none

/**
 * @since 2.0.0
 */
export const option: Monad1<URI> &
  Foldable1<URI> &
  Plus1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI> = {
  URI,
  map,
  of: some,
  ap: (mab, ma) => (isNone(mab) ? none : isNone(ma) ? none : some(mab.value(ma.value))),
  chain,
  reduce: (fa, b, f) => (isNone(fa) ? b : f(b, fa.value)),
  foldMap: M => (fa, f) => (isNone(fa) ? M.empty : f(fa.value)),
  reduceRight: (fa, b, f) => (isNone(fa) ? b : f(fa.value, b)),
  traverse,
  sequence,
  zero,
  alt: (ma, f) => (isNone(ma) ? f() : ma),
  extend: (wa, f) => (isNone(wa) ? none : some(f(wa))),
  compact: ma => chain(ma, identity),
  separate,
  filter,
  filterMap: chain,
  partition,
  partitionMap: (fa, f) => separate(map(fa, f)),
  wither,
  wilt
}
