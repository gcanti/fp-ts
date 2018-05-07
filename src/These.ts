import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { Foldable2 } from './Foldable'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Option, none, some } from './Option'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { Traversable2 } from './Traversable'
import { phantom, toString } from './function'

// Data type isomorphic to `α ∨ β ∨ (α ∧ β)`
// adapted from https://github.com/purescript-contrib/purescript-these

declare module './HKT' {
  interface URI2HKT2<L, A> {
    These: These<L, A>
  }
}

export const URI = 'These'

export type URI = typeof URI

/**
 * @data
 * @constructor This
 * @constructor That
 * @constructor Both
 * @since 1.0.0
 */
export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>

export class This<L, A> {
  readonly _tag: 'This' = 'This'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return this_(this.value)
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return this_(f(this.value))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  /** Applies a function to each case in the data structure */
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return this_(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `this_(${toString(this.value)})`
  }
  /** Returns `true` if the these is `This`, `false` otherwise */
  isThis(): this is This<L, A> {
    return true
  }
  /** Returns `true` if the these is `That`, `false` otherwise */
  isThat(): this is That<L, A> {
    return false
  }
  /** Returns `true` if the these is `Both`, `false` otherwise */
  isBoth(): this is Both<L, A> {
    return false
  }
}

export class That<L, A> {
  readonly _tag: 'That' = 'That'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new That(f(this.value))
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return that(g(this.value))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return that(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `that(${toString(this.value)})`
  }
  isThis(): this is This<L, A> {
    return false
  }
  isThat(): this is That<L, A> {
    return true
  }
  isBoth(): this is Both<L, A> {
    return false
  }
}

export class Both<L, A> {
  readonly _tag: 'Both' = 'Both'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly l: L, readonly a: A) {}
  map<B>(f: (a: A) => B): These<L, B> {
    return new Both(this.l, f(this.a))
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return both(f(this.l), g(this.a))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.a)
  }
  fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B {
    return both(this.l, this.a)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `both(${toString(this.l)}, ${toString(this.a)})`
  }
  isThis(): this is This<L, A> {
    return false
  }
  isThat(): this is That<L, A> {
    return false
  }
  isBoth(): this is Both<L, A> {
    return true
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> => {
  return {
    equals: (x, y) =>
      x.isThis()
        ? y.isThis() && SL.equals(x.value, y.value)
        : x.isThat()
          ? y.isThat() && SA.equals(x.value, y.value)
          : y.isBoth() && SL.equals(x.l, y.l) && SA.equals(x.a, y.a)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => {
  return {
    concat: (x, y) =>
      x.isThis()
        ? y.isThis()
          ? this_(SL.concat(x.value, y.value))
          : y.isThat() ? both(x.value, y.value) : both(SL.concat(x.value, y.l), y.a)
        : x.isThat()
          ? y.isThis()
            ? both(y.value, x.value)
            : y.isThat() ? that(SA.concat(x.value, y.value)) : both(y.l, SA.concat(x.value, y.a))
          : y.isThis()
            ? both(SL.concat(x.l, y.value), x.a)
            : y.isThat() ? both(x.l, SA.concat(x.a, y.value)) : both(SL.concat(x.l, y.l), SA.concat(x.a, y.a))
  }
}

const map = <L, A, B>(fa: These<L, A>, f: (a: A) => B): These<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): These<L, A> => {
  return new That<L, A>(a)
}

const ap = <L>(S: Semigroup<L>) => <A, B>(fab: These<L, (a: A) => B>, fa: These<L, A>) => {
  return chain(S)(fab, f => map(fa, f))
}

const chain = <L>(S: Semigroup<L>) => <A, B>(fa: These<L, A>, f: (a: A) => These<L, B>): These<L, B> => {
  if (fa.isThis()) {
    return this_(fa.value)
  } else if (fa.isThat()) {
    return f(fa.value)
  } else {
    const fb = f(fa.a)
    return fb.isThis()
      ? this_(S.concat(fa.l, fb.value))
      : fb.isThat() ? both(fa.l, fb.value) : both(S.concat(fa.l, fb.l), fb.a)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => {
  return {
    URI,
    _L: phantom,
    map,
    of,
    ap: ap(S),
    chain: chain(S)
  }
}

const bimap = <L, M, A, B>(fla: These<L, A>, f: (l: L) => M, g: (a: A) => B): These<M, B> => {
  return fla.bimap(f, g)
}

const reduce = <L, A, B>(fa: These<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(ta: These<L, A>, f: (a: A) => HKT<F, B>): HKT<F, These<L, B>> => {
  return ta.isThis()
    ? F.of(this_(ta.value))
    : ta.isThat() ? F.map(f(ta.value), that as (a: B) => These<L, B>) : F.map(f(ta.a), b => both(ta.l, b))
}

/**
 * @function
 * @since 1.0.0
 */
export const this_ = <L, A>(l: L): These<L, A> => {
  return new This(l)
}

/**
 * @function
 * @since 1.0.0
 * @alias of
 */
export const that = of

/**
 * @function
 * @since 1.0.0
 */
export const both = <L, A>(l: L, a: A): These<L, A> => {
  return new Both(l, a)
}

/**
 * @function
 * @since 1.0.0
 */
export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] => {
  return fa.isThis() ? [fa.value, defaultThat] : fa.isThat() ? [defaultThis, fa.value] : [fa.l, fa.a]
}

/**
 * @function
 * @since 1.0.0
 */
export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => {
  return fa.isThis() ? some(fa.value) : fa.isThat() ? none : some(fa.l)
}

/**
 * @function
 * @since 1.0.0
 */
export const theseRight = <L, A>(fa: These<L, A>): Option<A> => {
  return fa.isThis() ? none : fa.isThat() ? some(fa.value) : some(fa.a)
}

/**
 * Returns `true` if the these is an instance of `This`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => {
  return fa.isThis()
}

/**
 * Returns `true` if the these is an instance of `That`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isThat = <L, A>(fa: These<L, A>): fa is That<L, A> => {
  return fa.isThat()
}

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 * @function
 * @since 1.0.0
 */
export const isBoth = <L, A>(fa: These<L, A>): fa is Both<L, A> => {
  return fa.isBoth()
}

/**
 * @instance
 * @since 1.0.0
 */
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  map,
  bimap,
  reduce,
  traverse
}
