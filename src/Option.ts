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

// export class None<A> {
//   static value: Option<never> = new None()
//   readonly _tag: 'None' = 'None'
//   private constructor() {}
//   /**
//    * Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
//    * maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.
//    *
//    * @example
//    * import { some } from 'fp-ts/lib/Option'
//    *
//    * assert.deepStrictEqual(some(1).map(n => n * 2), some(2))
//    */
//   map<B>(f: (a: A) => B): Option<B> {
//     return none
//   }

//   /**
//    * Maps `f` over this `Option`'s value. If the value returned from `f` is null or undefined, returns `None`
//    *
//    * @example
//    * import { none, some } from 'fp-ts/lib/Option'
//    *
//    * interface Foo {
//    *   bar?: {
//    *     baz?: string
//    *   }
//    * }
//    *
//    * assert.deepStrictEqual(
//    *   some<Foo>({ bar: { baz: 'quux' } })
//    *     .mapNullable(foo => foo.bar)
//    *     .mapNullable(bar => bar.baz),
//    *   some('quux')
//    * )
//    * assert.deepStrictEqual(
//    *   some<Foo>({ bar: {} })
//    *     .mapNullable(foo => foo.bar)
//    *     .mapNullable(bar => bar.baz),
//    *   none
//    * )
//    * assert.deepStrictEqual(
//    *   some<Foo>({})
//    *     .mapNullable(foo => foo.bar)
//    *     .mapNullable(bar => bar.baz),
//    *   none
//    * )
//    */
//   mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
//     return none
//   }

//   /**
//    * `ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
//    * function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.
//    *
//    * @example
//    * import { some, none } from 'fp-ts/lib/Option'
//    *
//    * assert.deepStrictEqual(some(2).ap(some((x: number) => x + 1)), some(3))
//    * assert.deepStrictEqual(none.ap(some((x: number) => x + 1)), none)
//    */
//   ap<B>(fab: Option<(a: A) => B>): Option<B> {
//     return none
//   }
//   /**
//    * Flipped version of `ap`
//    *
//    * @example
//    * import { some, none } from 'fp-ts/lib/Option'
//    *
//    * assert.deepStrictEqual(some((x: number) => x + 1).ap_(some(2)), some(3))
//    * assert.deepStrictEqual(none.ap_(some(2)), none)
//    */
//   ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> {
//     return fb.ap(this)
//   }
//   /**
//    * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
//    * `Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
//    * `None`)
//    */
//   chain<B>(f: (a: A) => Option<B>): Option<B> {
//     return none
//   }
//   reduce<B>(b: B, f: (b: B, a: A) => B): B {
//     return b
//   }
//   /**
//    * `alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
//    * it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.
//    *
//    * @example
//    * import { Option, some, none } from 'fp-ts/lib/Option'
//    *
//    * assert.deepStrictEqual(some(2).alt(some(4)), some(2))
//    * const fa: Option<number> = none
//    * assert.deepStrictEqual(fa.alt(some(4)), some(4))
//    */
//   alt(fa: Option<A>): Option<A> {
//     return fa
//   }

//   /**
//    * Lazy version of `alt`
//    *
//    * @example
//    * import { some } from 'fp-ts/lib/Option'
//    *
//    * assert.deepStrictEqual(some(1).orElse(() => some(2)), some(1))
//    *
//    * @since 1.6.0
//    */
//   orElse(fa: Lazy<Option<A>>): Option<A> {
//     return fa()
//   }

//   extend<B>(f: (ea: Option<A>) => B): Option<B> {
//     return none
//   }
//   /**
//    * Applies a function to each case in the data structure
//    *
//    * @example
//    * import { none, some } from 'fp-ts/lib/Option'
//    *
//    * assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
//    * assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
//    */
//   fold<B>(b: B, onSome: (a: A) => B): B {
//     return b
//   }
//   /** Lazy version of `fold` */
//   foldL<B>(onNone: () => B, onSome: (a: A) => B): B {
//     return onNone()
//   }
//   /**
//    * Returns the value from this `Some` or the given argument if this is a `None`
//    *
//    * @example
//    * import { Option, none, some } from 'fp-ts/lib/Option'
//    *
//    * assert.strictEqual(some(1).getOrElse(0), 1)
//    * const fa: Option<number> = none
//    * assert.strictEqual(fa.getOrElse(0), 0)
//    */
//   getOrElse(a: A): A {
//     return a
//   }
//   /** Lazy version of `getOrElse` */
//   getOrElseL(f: () => A): A {
//     return f()
//   }
//   /** Returns the value from this `Some` or `null` if this is a `None` */
//   toNullable(): A | null {
//     return null
//   }
//   /** Returns the value from this `Some` or `undefined` if this is a `None` */
//   toUndefined(): A | undefined {
//     return undefined
//   }
//   /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
//   contains(S: Setoid<A>, a: A): boolean {
//     return false
//   }
//   /** Returns `true` if the option is `None`, `false` otherwise */
//   isNone(): this is None<A> {
//     return true
//   }
//   /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
//   isSome(): this is Some<A> {
//     return false
//   }
//   /**
//    * Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value
//    */
//   exists(p: (a: A) => boolean): boolean {
//     return false
//   }
//   /**
//    * Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
//    * Otherwise returns `None`
//    */
//   filter<B extends A>(p: Refinement<A, B>): Option<B>
//   filter(p: Predicate<A>): Option<A>
//   filter(p: Predicate<A>): Option<A> {
//     return none
//   }
// }

// export class Some<A> {
//   readonly _tag: 'Some' = 'Some'
//   constructor(readonly value: A) {}
//   map<B>(f: (a: A) => B): Option<B> {
//     return new Some(f(this.value))
//   }

//   mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
//     return fromNullable(f(this.value))
//   }
//   ap<B>(fab: Option<(a: A) => B>): Option<B> {
//     return fab.isNone() ? none : new Some(fab.value(this.value))
//   }
//   ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> {
//     return fb.ap(this)
//   }
//   chain<B>(f: (a: A) => Option<B>): Option<B> {
//     return f(this.value)
//   }
//   reduce<B>(b: B, f: (b: B, a: A) => B): B {
//     return f(b, this.value)
//   }
//   alt(fa: Option<A>): Option<A> {
//     return this
//   }
//   orElse(fa: Lazy<Option<A>>): Option<A> {
//     return this
//   }
//   extend<B>(f: (ea: Option<A>) => B): Option<B> {
//     return new Some(f(this))
//   }
//   fold<B>(b: B, onSome: (a: A) => B): B {
//     return onSome(this.value)
//   }
//   foldL<B>(onNone: () => B, onSome: (a: A) => B): B {
//     return onSome(this.value)
//   }
//   getOrElse(a: A): A {
//     return this.value
//   }
//   getOrElseL(f: () => A): A {
//     return this.value
//   }
//   toNullable(): A | null {
//     return this.value
//   }
//   toUndefined(): A | undefined {
//     return this.value
//   }
//   contains(S: Setoid<A>, a: A): boolean {
//     return S.equals(this.value, a)
//   }
//   isNone(): this is None<A> {
//     return false
//   }
//   isSome(): this is Some<A> {
//     return true
//   }
//   exists(p: (a: A) => boolean): boolean {
//     return p(this.value)
//   }
//   filter<B extends A>(p: Refinement<A, B>): Option<B>
//   filter(p: Predicate<A>): Option<A>
//   filter(p: Predicate<A>): Option<A> {
//     return this.exists(p) ? this : none
//   }
// }

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

const foldr = <A, B>(fa: Option<A>, b: B, f: (a: A, b: B) => B): B => {
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
 * Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
 * value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromEither } from 'fp-ts/lib/Option'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(fromEither(left(1)), none)
 * assert.deepStrictEqual(fromEither(right(1)), some(1))
 *
 * @since 1.0.0
 */
export const fromEither = <L, A>(ma: Either<L, A>): Option<A> => {
  switch (ma._tag) {
    case 'Left':
      return none
    case 'Right':
      return some(ma.value)
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

const separate = <RL, RR>(fa: Option<Either<RL, RR>>): Separated<Option<RL>, Option<RR>> => {
  if (isNone(fa)) {
    return {
      left: none,
      right: none
    }
  }
  const e = fa.value
  switch (e._tag) {
    case 'Left':
      return {
        left: some(e.value),
        right: none
      }
    case 'Right':
      return {
        left: none,
        right: some(e.value)
      }
  }
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
  if (isNone(fa)) {
    return F.of({
      left: none,
      right: none
    })
  }
  return F.map(f(fa.value), e => {
    switch (e._tag) {
      case 'Left':
        return {
          left: some(e.value),
          right: none
        }
      case 'Right':
        return {
          left: none,
          right: some(e.value)
        }
    }
  })
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
  foldr,
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
