import { Alternative1 } from './Alternative'
import { Applicative } from './Applicative'
import { Either } from './Either'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid, getDualMonoid } from './Monoid'
import { Ord } from './Ord'
import { Plus1 } from './Plus'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { Traversable1 } from './Traversable'
import { Lazy, Predicate, Refinement, toString } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    Option: Option<A>
  }
}

export const URI = 'Option'

export type URI = typeof URI

/**
 * Represents optional values. Instances of `Option` are either an instance of `Some` or `None`
 *
 * The most idiomatic way to use an `Option` instance is to treat it as a collection or monad and use `map`, `flatMap`
 * or `filter`.
 *
 * @data
 * @constructor None
 * @constructor Some
 * @since 1.0.0
 */
export type Option<A> = None<A> | Some<A>

export class None<A> {
  static value: Option<never> = new None()
  readonly _tag: 'None' = 'None'
  readonly _A!: A
  readonly _URI!: URI
  private constructor() {}
  /**
   * Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
   * maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.
   *
   * Example
   *
   * ```ts
   * assert.deepEqual(some(1).map(n => n * 2), some(2))
   * ```
   */
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  /**
   * Maps `f` over this `Option`'s value. If the value returned from `f` is null or undefined, returns `None`
   *
   * Example
   *
   * ```ts
   * import { none, some } from 'fp-ts/lib/Option'
   *
   * interface Foo {
   *   bar?: {
   *     baz?: string
   *   }
   * }
   *
   * assert.deepEqual(
   *   some<Foo>({ bar: { baz: 'quux' } })
   *     .mapNullable(foo => foo.bar)
   *     .mapNullable(bar => bar.baz),
   *   some('quux')
   * )
   * assert.deepEqual(
   *   some<Foo>({ bar: {} })
   *     .mapNullable(foo => foo.bar)
   *     .mapNullable(bar => bar.baz),
   *   none
   * )
   * assert.deepEqual(
   *   some<Foo>({})
   *     .mapNullable(foo => foo.bar)
   *     .mapNullable(bar => bar.baz),
   *   none
   * )
   * ```
   */
  mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
    return none
  }

  /**
   * `ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
   * function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.
   *
   * Example
   *
   * ```ts
   * assert.deepEqual(some(2).ap(some(x => x + 1)), some(3))
   * assert.deepEqual(none.ap(some(x => x + 1)), none)
   * ```
   */
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return none
  }
  /**
   * Similar to `ap` but instead of taking a function it takes `some` value or `none`, then applies this `Option`'s
   * wrapped function to the `some` or `none`. If the `Option` calling `ap_` is `none` it will return `none`.
   *
   * Example
   *
   * ```ts
   * assert.deepEqual(some(x => x + 1).ap_(some(2)), some(3))
   * assert.deepEqual(none.ap_(some(2)), none)
   * ```
   */
  ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> {
    return fb.ap(this)
  }
  /**
   * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
   * `Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
   * `None`)
   */
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return none
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  /**
   * `alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
   * it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.
   *
   * For example:
   *
   * ```ts
   * const someFn = (o: Option<number>) => o.alt(some(4))
   * assert.deepEqual(someFn(some(2)), some(2))
   * assert.deepEqual(someFn(none), none)
   * ```
   */
  alt(fa: Option<A>): Option<A> {
    return fa
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return none
  }
  /**
   * Applies a function to each case in the data structure
   *
   * Example
   *
   * ```ts
   * import { none, some } from 'fp-ts/lib/Option'
   *
   * assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
   * assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
   * ```
   */
  fold<B>(b: B, some: (a: A) => B): B {
    return b
  }
  /** Lazy verion of `fold` */
  foldL<B>(none: () => B, some: (a: A) => B): B {
    return none()
  }
  /**
   * Returns the value from this `Some` or the given argument if this is a `None`
   *
   * Example
   *
   * ```ts
   * import { Option, none, some } from 'fp-ts/lib/Option'
   *
   * assert.strictEqual(some(1).getOrElse(0), 1)
   * assert.strictEqual((none as Option<number>).getOrElse(0), 0)
   * ```
   */
  getOrElse(a: A): A {
    return a
  }
  /** Lazy version of `getOrElse` */
  getOrElseL(f: () => A): A {
    return f()
  }
  /** Returns the value from this `Some` or `null` if this is a `None` */
  toNullable(): A | null {
    return null
  }
  /** Returns the value from this `Some` or `undefined` if this is a `None` */
  toUndefined(): A | undefined {
    return undefined
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return 'none'
  }
  /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
  contains(S: Setoid<A>, a: A): boolean {
    return false
  }
  /** Returns `true` if the option is `None`, `false` otherwise */
  isNone(): this is None<A> {
    return true
  }
  /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
  isSome(): this is Some<A> {
    return false
  }
  /**
   * Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value
   */
  exists(p: (a: A) => boolean): boolean {
    return false
  }
  /**
   * Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
   * Otherwise returns `None`
   */
  filter(p: Predicate<A>): Option<A> {
    return none
  }
  /**
   * Returns this option refined as `Option<B>` if it is non empty and the `refinement` returns `true` when applied to
   * this Option's value. Otherwise returns `None`
   * @since 1.3.0
   */
  refine<B extends A>(refinement: Refinement<A, B>): Option<B> {
    return none
  }
}

export const none: Option<never> = None.value

export class Some<A> {
  readonly _tag: 'Some' = 'Some'
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
    return fromNullable(f(this.value))
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return fab.isNone() ? none : new Some(fab.value(this.value))
  }
  ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value)
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  alt(fa: Option<A>): Option<A> {
    return this
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return new Some(f(this))
  }
  fold<B>(b: B, some: (a: A) => B): B {
    return some(this.value)
  }
  foldL<B>(none: () => B, some: (a: A) => B): B {
    return some(this.value)
  }
  getOrElse(a: A): A {
    return this.value
  }
  getOrElseL(f: () => A): A {
    return this.value
  }
  toNullable(): A | null {
    return this.value
  }
  toUndefined(): A | undefined {
    return this.value
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `some(${toString(this.value)})`
  }
  contains(S: Setoid<A>, a: A): boolean {
    return S.equals(this.value, a)
  }
  isNone(): this is None<A> {
    return false
  }
  isSome(): this is Some<A> {
    return true
  }
  exists(p: (a: A) => boolean): boolean {
    return p(this.value)
  }
  filter(p: Predicate<A>): Option<A> {
    return this.exists(p) ? this : none
  }
  refine<B extends A>(refinement: Refinement<A, B>): Option<B> {
    return this.filter(refinement) as Option<B>
  }
}

/**
 *
 * Example
 *
 * ```ts
 * import { none, some, getSetoid } from 'fp-ts/lib/Option'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * const S = getSetoid(setoidNumber)
 * assert.strictEqual(S.equals(none, none), true)
 * assert.strictEqual(S.equals(none, some(1)), false)
 * assert.strictEqual(S.equals(some(1), none), false)
 * assert.strictEqual(S.equals(some(1), some(2)), false)
 * assert.strictEqual(S.equals(some(1), some(1)), true)
 * ```
 * * @function
 * @since 1.0.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>> => {
  return {
    equals: (x, y) => (x.isNone() ? y.isNone() : y.isNone() ? false : S.equals(x.value, y.value))
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
 * Example
 *
 * ```ts
 * import { none, some, getOrd } from 'fp-ts/lib/Option'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 * ```
 *
 * * @function
 * @since 1.2.0
 */
export const getOrd = <A>(O: Ord<A>): Ord<Option<A>> => {
  return {
    ...getSetoid(O),
    compare: (x, y) => (x.isSome() ? (y.isSome() ? O.compare(x.value, y.value) : 1) : y.isSome() ? -1 : 0)
  }
}

const map = <A, B>(fa: Option<A>, f: (a: A) => B): Option<B> => {
  return fa.map(f)
}

const of = <A>(a: A): Option<A> => {
  return new Some(a)
}

const ap = <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: Option<A>, f: (a: A) => Option<B>): Option<B> => {
  return fa.chain(f)
}

const reduce = <A, B>(fa: Option<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const alt = <A>(fx: Option<A>, fy: Option<A>): Option<A> => {
  return fx.alt(fy)
}

const extend = <A, B>(ea: Option<A>, f: (ea: Option<A>) => B): Option<B> => {
  return ea.extend(f)
}

const zero = <A>(): Option<A> => {
  return none
}

/**
 * `Option` monoid returning the left-most non-`None` value
 * @function
 * @since 1.0.0
 */
export const getFirstMonoid = <A = never>(): Monoid<Option<A>> => {
  return {
    concat: alt,
    empty: none
  }
}

/**
 * `Option` monoid returning the right-most non-`None` value
 * @function
 * @since 1.0.0
 */
export const getLastMonoid = <A = never>(): Monoid<Option<A>> => {
  return getDualMonoid(getFirstMonoid())
}

/**
 * `Option` monoid returning the left-most non-None value. If both operands are `Some`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * Example
 *
 * ```ts
 * import { none, some, getMonoid } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepEqual(M.concat(none, none), none)
 * assert.deepEqual(M.concat(none, some(1)), some(1))
 * assert.deepEqual(M.concat(some(1), none), some(1))
 * assert.deepEqual(M.concat(some(1), some(2)), some(3))
 * ```
 *
 * @function
 * @since 1.0.0
 */
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => {
  return {
    concat: (x, y) => (x.isNone() ? y : y.isNone() ? x : some(S.concat(x.value, y.value))),
    empty: none
  }
}

/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 *
 * Example
 *
 * ```ts
 * import { none, some, fromNullable } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(fromNullable(undefined), none)
 * assert.deepEqual(fromNullable(null), none)
 * assert.deepEqual(fromNullable(1), some(1))
 * ```
 *
 * @function
 * @since 1.0.0
 */
export const fromNullable = <A>(a: A | null | undefined): Option<A> => {
  return a == null ? none : new Some(a)
}

/**
 * @function
 * @since 1.0.0
 * @alias of
 */
export const some = of

/**
 * Example
 *
 * ```ts
 * import { none, some, fromPredicate } from 'fp-ts/lib/Option'
 *
 * const positive = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepEqual(positive(-1), none)
 * assert.deepEqual(positive(1), some(1))
 * ```
 *
 * @function
 * @since 1.0.0
 */
export const fromPredicate = <A>(predicate: Predicate<A>) => (a: A): Option<A> => {
  return predicate(a) ? some(a) : none
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Option<A>, f: (a: A) => HKT<F, B>) => HKT<F, Option<B>> {
  return (ta, f) => (ta.isNone() ? F.of(none) : F.map(f(ta.value), some))
}

/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 *
 * Example
 *
 * ```ts
 * import { none, some, tryCatch } from 'fp-ts/lib/Option'
 *
 * assert.deepEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepEqual(tryCatch(() => 1), some(1))
 *
 * ```
 *
 * @function
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
 * Example
 *
 * ```ts
 * import { none, some, fromEither } from 'fp-ts/lib/Option'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepEqual(fromEither(left(1)), none)
 * assert.deepEqual(fromEither(right(1)), some(1))
 * ```
 *
 * @function
 * @since 1.0.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): Option<A> => {
  return fa.isLeft() ? none : some(fa.value)
}

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => {
  return fa.isSome()
}

/**
 * Returns `true` if the option is `None`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isNone = <A>(fa: Option<A>): fa is None<A> => {
  return fa.isNone()
}

/**
 * Refinement version of `fromPredicate`
 * @function
 * @since 1.3.0
 */
export const fromRefinement = <A, B extends A>(refinement: Refinement<A, B>) => (a: A): Option<B> => {
  return refinement(a) ? some(a) : none
}

/**
 * @instance
 * @since 1.0.0
 */
export const option: Monad1<URI> &
  Foldable1<URI> &
  Plus1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse,
  zero,
  alt,
  extend
}
