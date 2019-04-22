/**
 * @file If you have worked with JavaScript at all in the past, it is very likely that you have come across a `TypeError` at
 * some time (other languages will throw similarly named errors in such a case). Usually this happens because some
 * method returns `null` or `undefined` when you were not expecting it and thus not dealing with that possibility in
 * your client code.
 *
 * ```ts
 * const as: Array<string> = []
 * as[0].trim() // throws TypeError: Cannot read property 'trim' of undefined
 * ```
 *
 * fp-ts models the absence of values through the `Option` datatype similar to how Scala, Haskell and other FP languages
 * handle optional values. A value of `null` or `undefined` is often abused to represent an absent optional value.
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None<A>`.
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
 * const head = (as: Array<string>): Option<string> => {
 *   return as.length > 0 ? some(as[0]) : none
 * }
 * ```
 *
 * Using `getOrElse` we can provide a default value `"No value"` when the optional argument `None` does not exist:
 *
 * ```ts
 * const value1 = head(['foo', 'bar']) // some('foo)
 * const value2 = head([]) // none
 * value1.getOrElse('No value') // 'foo'
 * value2.getOrElse('No value') // 'No value'
 * ```
 *
 * Checking whether option has value:
 *
 * ```ts
 * value1.isNone() // false
 * value2.isNone() // true
 * ```
 *
 * We can pattern match using the `fold` method
 *
 * ```ts
 * const number: Option<number> = some(3)
 * const noNumber: Option<number> = none
 * number.fold(1, n => n * 3) // 9
 * noNumber.fold(1, n => n * 3) // 1
 * ```
 *
 * You can chain several possibly failing computations using the `chain` method
 *
 * ```ts
 * const inverse = (n: number): Option<number> => {
 *   return n === 0 ? none : some(1 / n)
 * }
 *
 * number.chain(inverse) // 1/3
 * noNumber.chain(inverse) // none
 * some(0).chain(inverse) // none
 * ```
 *
 * Computing over independent values
 *
 * ```ts
 * const sum = (a: number) => (b: number): number => a + b
 * const sumLifted = (oa: Option<number>, ob: Option<number>): Option<number> => ob.ap(oa.map(sum))
 * sumLifted(some(1), some(2)) // some(3)
 * sumLifted(some(1), none) // none
 * ```
 */
import { Alternative1 } from './Alternative'
import { Applicative } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
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
import { fromEquals, Setoid } from './Setoid'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { Witherable1 } from './Witherable'

declare module './HKT' {
  interface URI2HKT<A> {
    Option: Option<A>
  }
}

export const URI = 'Option'

export type URI = typeof URI

export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

/**
 * @since 1.0.0
 */
export type Option<A> = None | Some<A>

/**
 * @since 1.0.0
 */
export const none: Option<never> = { _tag: 'None' }

/**
 * @since 2.0.0
 */
export function fold<A, R>(ma: Option<A>, onNone: R, onSome: (a: A) => R): R {
  return isNone(ma) ? onNone : onSome(ma.value)
}

/**
 * @since 2.0.0
 */
export function foldL<A, R>(ma: Option<A>, onNone: () => R, onSome: (a: A) => R): R {
  return isNone(ma) ? onNone() : onSome(ma.value)
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
 * Returns an `L` value if possible
 *
 * @since 2.0.0
 */
export const getLeft = <L, A>(ma: Either<L, A>): Option<L> => {
  return ma._tag === 'Right' ? none : some(ma.left)
}

/**
 * Returns an `A` value if possible
 *
 * @since 2.0.0
 */
export const getRight = <L, A>(ma: Either<L, A>): Option<A> => {
  return ma._tag === 'Left' ? none : some(ma.right)
}

/**
 * @since 2.0.0
 */
export function getOrElse<A>(ma: Option<A>, a: A): A {
  return isNone(ma) ? a : ma.value
}

/**
 * @since 2.0.0
 */
export function getOrElseL<A>(ma: Option<A>, f: () => A): A {
  return isNone(ma) ? f() : ma.value
}

/**
 * @since 2.0.0
 */
export function orElse<A>(ma: Option<A>, f: () => Option<A>): Option<A> {
  return isNone(ma) ? f() : ma
}

/**
 * @since 2.0.0
 */
export function contains<A>(S: Setoid<A>): (ma: Option<A>, a: A) => boolean {
  return (ma, a) => (isNone(ma) ? false : S.equals(a, ma.value))
}

/**
 * @since 2.0.0
 */
export function exists<A>(ma: Option<A>, predicate: (a: A) => boolean): boolean {
  return isNone(ma) ? false : predicate(ma.value)
}

/**
 * @since 2.0.0
 */
export function mapNullable<A, B>(ma: Option<A>, f: (a: A) => B | null | undefined): Option<B> {
  return isNone(ma) ? ma : fromNullable(f(ma.value))
}

/**
 * @since 1.17.0
 */
export const getShow = <A>(S: Show<A>): Show<Option<A>> => {
  return {
    show: ma => (isNone(ma) ? 'none' : `some(${S.show(ma.value)})`)
  }
}

/**
 * @example
 * import { none, some, getSetoid } from 'fp-ts/lib/Option'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * const S = getSetoid(setoidNumber)
 * assert.strictEqual(S.equals(none, none), true)
 * assert.strictEqual(S.equals(none, some(1)), false)
 * assert.strictEqual(S.equals(some(1), none), false)
 * assert.strictEqual(S.equals(some(1), some(2)), false)
 * assert.strictEqual(S.equals(some(1), some(1)), true)
 *
 * @since 1.0.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>> => {
  return fromEquals((x, y) => (isNone(x) ? isNone(y) : isNone(y) ? false : S.equals(x.value, y.value)))
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
 * @since 1.2.0
 */
export const getOrd = <A>(O: Ord<A>): Ord<Option<A>> => {
  return fromCompare((x, y) => (isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1))
}

const map = <A, B>(ma: Option<A>, f: (a: A) => B): Option<B> => {
  return isNone(ma) ? ma : some(f(ma.value))
}

/**
 * @since 1.0.0
 */
export const some = <A>(a: A): Option<A> => {
  return { _tag: 'Some', value: a }
}

const of = some

const ap = <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> => {
  return isNone(fab) ? fab : isNone(fa) ? fa : some(fab.value(fa.value))
}

const chain = <A, B>(fa: Option<A>, f: (a: A) => Option<B>): Option<B> => {
  return isNone(fa) ? fa : f(fa.value)
}

const reduce = <A, B>(fa: Option<A>, b: B, f: (b: B, a: A) => B): B => {
  return isNone(fa) ? b : f(b, fa.value)
}

const foldMap = <M>(M: Monoid<M>) => <A>(fa: Option<A>, f: (a: A) => M): M => {
  return isNone(fa) ? M.empty : f(fa.value)
}

const reduceRight = <A, B>(fa: Option<A>, b: B, f: (a: A, b: B) => B): B => {
  return isNone(fa) ? b : f(fa.value, b)
}

const traverse = <F>(F: Applicative<F>) => <A, B>(ta: Option<A>, f: (a: A) => HKT<F, B>): HKT<F, Option<B>> => {
  return isNone(ta) ? F.of(none) : F.map(f(ta.value), some)
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Option<HKT<F, A>>): HKT<F, Option<A>> => {
  return isNone(ta) ? F.of(none) : F.map(ta.value, some)
}

const alt = <A>(fx: Option<A>, fy: Option<A>): Option<A> => {
  return isNone(fx) ? fy : fx
}

const extend = <A, B>(ea: Option<A>, f: (ea: Option<A>) => B): Option<B> => {
  return isNone(ea) ? ea : some(f(ea))
}

const zero = <A>(): Option<A> => {
  return none
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
 * @since 1.7.0
 */
export const getApplySemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>> => {
  return {
    concat: (x, y) => (isSome(x) && isSome(y) ? some(S.concat(x.value, y.value)) : none)
  }
}

/**
 * @since 1.7.0
 */
export const getApplyMonoid = <A>(M: Monoid<A>): Monoid<Option<A>> => {
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
 * @since 1.0.0
 */
export const getFirstMonoid = <A = never>(): Monoid<Option<A>> => {
  return {
    concat: alt,
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
 * @since 1.0.0
 */
export const getLastMonoid = <A = never>(): Monoid<Option<A>> => {
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
 * @since 1.0.0
 */
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => {
  return {
    concat: (x, y) => (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))),
    empty: none
  }
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
 * @since 1.0.0
 */
export const fromNullable = <A>(a: A | null | undefined): Option<A> => {
  return a == null ? none : some(a)
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
 * @since 1.0.0
 */
export function fromPredicate<A, B extends A>(predicate: Refinement<A, B>): (a: A) => Option<B>
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
 * @since 1.0.0
 */
export const tryCatch = <A>(f: Lazy<A>): Option<A> => {
  try {
    return some(f())
  } catch (e) {
    return none
  }
}

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => {
  return fa._tag === 'Some'
}

/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isNone = <A>(fa: Option<A>): fa is None => {
  return fa._tag === 'None'
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
 * @since 1.7.0
 */
export const getRefinement = <A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> => {
  return (a: A): a is B => isSome(getOption(a))
}

const compact = <A>(fa: Option<Option<A>>): Option<A> => chain(fa, identity)

const defaultSeparate = { left: none, right: none }

const separate = <RL, RR>(fa: Option<Either<RL, RR>>): Separated<Option<RL>, Option<RR>> => {
  return getOrElse(
    map(fa, e => ({
      left: getLeft(e),
      right: getRight(e)
    })),
    defaultSeparate
  )
}

const filter = <A>(fa: Option<A>, p: Predicate<A>): Option<A> => (isNone(fa) ? fa : p(fa.value) ? fa : none)

const filterMap = chain

const partitionMap = <RL, RR, A>(fa: Option<A>, f: (a: A) => Either<RL, RR>): Separated<Option<RL>, Option<RR>> =>
  separate(map(fa, f))

const partition = <A>(fa: Option<A>, p: Predicate<A>): Separated<Option<A>, Option<A>> => ({
  left: filter(fa, not(p)),
  right: filter(fa, p)
})

const wither = <F>(F: Applicative<F>) => <A, B>(fa: Option<A>, f: (a: A) => HKT<F, Option<B>>): HKT<F, Option<B>> =>
  isNone(fa) ? F.of(fa as any) : f(fa.value)

const wilt = <F>(F: Applicative<F>) => <RL, RR, A>(
  fa: Option<A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
): HKT<F, Separated<Option<RL>, Option<RR>>> => {
  return getOrElseL(
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

/**
 * @since 1.0.0
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
  of,
  ap,
  chain,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence,
  zero,
  alt,
  extend,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap,
  wither,
  wilt
}
