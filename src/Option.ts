import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT2, HKT3S, HKT3, HKT3As } from './HKT'
import { Monoid, getDualMonoid } from './Monoid'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Plus } from './Plus'
import { Extend } from './Extend'
import { Setoid } from './Setoid'
import { Traversable } from './Traversable'
import { Alternative } from './Alternative'
import { Lazy, Predicate, toString } from './function'
import { Either } from './Either'

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
  readonly '-A': A
  readonly '-URI': URI
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
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return none
  }
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
  traverse<F extends HKT3S>(F: Applicative<F>): <U, L, B>(f: (a: A) => HKT3<F, U, L, B>) => HKT3As<F, U, L, Option<B>>
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2<F, L, B>) => HKT2As<F, L, Option<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>> {
    return f => F.of(none)
  }
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
  /** Returns the value from this `Some` or the given argument if this is a `None` */
  getOrElse(a: A): A {
    return a
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
  readonly '-A': A
  readonly '-URI': URI
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
  traverse<F extends HKT3S>(F: Applicative<F>): <U, L, B>(f: (a: A) => HKT3<F, U, L, B>) => HKT3As<F, U, L, Option<B>>
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2<F, L, B>) => HKT2As<F, L, Option<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Option<B>> {
    return f => F.map(f(this.value), some)
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
  getOrElse(a: A): A {
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

const map = <A, B>(fa: Option<A>, f: (a: A) => B): Option<B> => {
  return fa.map(f)
}

/** @function */
export const of = <A>(a: A): Option<A> => {
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

const extend = <A, B>(f: (ea: Option<A>) => B, ea: Option<A>): Option<B> => {
  return ea.extend(f)
}

const zero = <A>(): Option<A> => {
  return none
}

/**
 * Option monoid returning the left-most non-None value
 * @function
 */
export const getFirstMonoid = <A>(): Monoid<Option<A>> => {
  return {
    concat: alt,
    empty: none
  }
}

/**
 * Option monoid returning the right-most non-None value
 * @function
 */
export const getLastMonoid = <A>(): Monoid<Option<A>> => {
  return getDualMonoid(getFirstMonoid())
}

/** @function */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>> => {
  return {
    concat: (x, y) => x.fold(y, ax => y.fold(x, ay => some(S.concat(ax, ay))))
  }
}

/** @function */
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => {
  return { ...getSemigroup(S), empty: none }
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

function traverse<F>(F: Applicative<F>): <A, B>(ta: HKT<URI, A>, f: (a: A) => HKT<F, B>) => HKT<F, Option<B>>
function traverse<F>(F: Applicative<F>): <A, B>(ta: Option<A>, f: (a: A) => HKT<F, B>) => HKT<F, Option<B>> {
  return (ta, f) => ta.traverse(F)(f)
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
export const option: Monad<URI> & Foldable<URI> & Plus<URI> & Traversable<URI> & Alternative<URI> & Extend<URI> = {
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
