import { HKT } from './HKT'
import { Monoid, getDualMonoid } from './Monoid'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Monad1 } from './Monad'
import { Foldable1 } from './Foldable'
import { Plus1 } from './Plus'
import { Extend1 } from './Extend'
import { Setoid } from './Setoid'
import { Traversable1 } from './Traversable'
import { Alternative1 } from './Alternative'
import { Lazy, Predicate, toString } from './function'
import { Either } from './Either'
import { Ord } from './Ord'

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
 * The most idiomatic way to use an `Option` instance is to treat it as a collection or monad and use `map`, `flatMap` or `filter`.
 *
 * @data
 * @constructor None
 * @constructor Some
 */
export type Option<A> = None<A> | Some<A>

export class None<A> {
  static value: Option<never> = new None()
  readonly _tag: 'None' = 'None'
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_URI': URI
  private constructor() {}
  /**
   * Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors.
   * If it maps on `Some` then it will apply the
   * `f` on `Some`'s value, if it maps on `None` it will return `None`.
   */
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  /** Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None` */
  mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
    return none
  }

  /**
   * `ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
   * function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.
   *
   * For example:
   *
   * `const someFn = some(2).ap(some(x => x + 1))` will return `some(3)`.
   *
   * `const someFn = none.ap(some(x => x + 1))` will return `none`.
   */
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return none
  }
  /**
   * Similar to `ap` but instead of taking a function it takes `some` value or `none`, then applies this `Option`'s
   * wrapped function to the `some` or `none`. If the `Option` calling `ap_` is `none` it will return `none`.
   *
   * For example:
   *
   * `const someFn = some(x => x + 1).ap_(some(2))` will return `some(3)`.
   *
   * `const someFn = none.ap_(some(2))` will return `none`.
   */
  ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> {
    return fb.ap(this)
  }
  /**
   * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty.
   * Returns `None` if this `Option` is empty. Slightly different from `map` in that `f` is expected to return an
   * `Option` (which could be `None`)
   */
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return none
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  /**
   * `alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type
   * then it will be returned, if it is a `None` then it will return the next `Some` if it exist. If
   * both are `None` then it will return `none`.
   *
   * For example:
   *
   * `const someFn = (o: Option<number>) => o.alt(some(4))`
   *
   * `someFn(some(2))` will return `some(2)`.
   *
   * `someFn(none)` will return `some(4)`.
   */
  alt(fa: Option<A>): Option<A> {
    return fa
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return none
  }
  /** Applies a function to each case in the data structure */
  fold<B>(b: B, some: (a: A) => B): B {
    return b
  }
  /** Lazy verion of `fold` */
  foldL<B>(none: () => B, some: (a: A) => B): B {
    return none()
  }
  /** Returns the value from this `Some` or the given argument if this is a `None` */
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
  /** Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value */
  exists(p: (a: A) => boolean): boolean {
    return false
  }
  /** Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value. Otherwise returns `None` */
  filter(p: Predicate<A>): Option<A> {
    return none
  }
}

export const none: Option<never> = None.value

export class Some<A> {
  readonly _tag: 'Some' = 'Some'
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> {
    return fromNullable(f(this.value))
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return fab.map(f => f(this.value))
  }
  ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value)
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return this.fold(b, a => f(b, a))
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
}

/** @function */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>> => {
  return {
    equals: (x, y) => x.fold(y.isNone(), ax => y.fold(false, ay => S.equals(ax, ay)))
  }
}

/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
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
 * Option monoid returning the left-most non-None value
 * @function
 */
export const getFirstMonoid = <A = never>(): Monoid<Option<A>> => {
  return {
    concat: alt,
    empty: none
  }
}

/**
 * Option monoid returning the right-most non-None value
 * @function
 */
export const getLastMonoid = <A = never>(): Monoid<Option<A>> => {
  return getDualMonoid(getFirstMonoid())
}

/** @function */
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => {
  return {
    concat: (x, y) => x.fold(y, ax => y.fold(x, ay => some(S.concat(ax, ay)))),
    empty: none
  }
}

/**
 * Constructs a new `Option` from a nullable type.
 * If the value is `null` or `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`
 * @function
 */
export const fromNullable = <A>(a: A | null | undefined): Option<A> => {
  return a == null ? none : new Some(a)
}

/**
 * @function
 * @alias of
 */
export const some = of

/** @function */
export const fromPredicate = <A>(predicate: Predicate<A>) => (a: A): Option<A> => {
  return predicate(a) ? some(a) : none
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Option<A>, f: (a: A) => HKT<F, B>) => HKT<F, Option<B>> {
  return (ta, f) => ta.foldL(() => F.of(none), a => F.map(f(a), some))
}

/** @function */
export const tryCatch = <A>(f: Lazy<A>): Option<A> => {
  try {
    return some(f())
  } catch (e) {
    return none
  }
}

/** @function */
export const fromEither = <L, A>(fa: Either<L, A>): Option<A> => {
  return fa.fold(() => none, some)
}

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 * @function
 */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => {
  return fa.isSome()
}

/**
 * Returns `true` if the option is `None`, `false` otherwise
 * @function
 */
export const isNone = <A>(fa: Option<A>): fa is None<A> => {
  return fa.isNone()
}

/** @instance */
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
