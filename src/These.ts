import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { Either } from './Either_'
import { Foldable2v2 } from './Foldable2v'
import { phantom, toString } from './function'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { none, Option, some } from './Option_'
import { Semigroup } from './Semigroup_'
import { Setoid, fromEquals } from './Setoid'
import { Traversable2v2 } from './Traversable2v'

// Adapted from https://github.com/purescript-contrib/purescript-these

declare module './HKT' {
  interface URI2HKT2<L, A> {
    These: These<L, A>
  }
}

export const URI = 'These'

export type URI = typeof URI

/**
 * A data structure providing "inclusive-or" as opposed to {@link Either}'s "exclusive-or".
 *
 * If you interpret `Either<L, A>` as suggesting the computation may either fail or succeed (exclusively), then
 * `These<L, A>` may fail, succeed, or do both at the same time.
 *
 * There are a few ways to interpret the both case:
 *
 * - You can think of a computation that has a non-fatal error.
 * - You can think of a computation that went as far as it could before erroring.
 * - You can think of a computation that keeps track of errors as it completes.
 *
 * Another way you can think of `These<L, A>` is saying that we want to handle `L` kind of data, `A` kind of data, or
 * both `L` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.
 *
 * (description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)
 *
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
    return this as any
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return new This(f(this.value))
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
    return new That(g(this.value))
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
    return new Both(f(this.l), g(this.a))
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
 *
 * @since 1.0.0
 */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> => {
  return fromEquals(
    (x, y) =>
      x.isThis()
        ? y.isThis() && SL.equals(x.value, y.value)
        : x.isThat()
          ? y.isThat() && SA.equals(x.value, y.value)
          : y.isBoth() && SL.equals(x.l, y.l) && SA.equals(x.a, y.a)
  )
}

/**
 *
 * @since 1.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => {
  return {
    concat: (x, y) =>
      x.isThis()
        ? y.isThis()
          ? this_(SL.concat(x.value, y.value))
          : y.isThat()
            ? both(x.value, y.value)
            : both(SL.concat(x.value, y.l), y.a)
        : x.isThat()
          ? y.isThis()
            ? both(y.value, x.value)
            : y.isThat()
              ? that(SA.concat(x.value, y.value))
              : both(y.l, SA.concat(x.value, y.a))
          : y.isThis()
            ? both(SL.concat(x.l, y.value), x.a)
            : y.isThat()
              ? both(x.l, SA.concat(x.a, y.value))
              : both(SL.concat(x.l, y.l), SA.concat(x.a, y.a))
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
      : fb.isThat()
        ? both(fa.l, fb.value)
        : both(S.concat(fa.l, fb.l), fb.a)
  }
}

/**
 *
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

const foldMap = <M>(M: Monoid<M>) => <L, A>(fa: These<L, A>, f: (a: A) => M): M => {
  return fa.isThis() ? M.empty : fa.isThat() ? f(fa.value) : f(fa.a)
}

const foldr = <L, A, B>(fa: These<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return fa.isThis() ? b : fa.isThat() ? f(fa.value, b) : f(fa.a, b)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(ta: These<L, A>, f: (a: A) => HKT<F, B>): HKT<F, These<L, B>> => {
  return ta.isThis()
    ? F.of(this_(ta.value))
    : ta.isThat()
      ? F.map(f(ta.value), that as (b: B) => These<L, B>)
      : F.map(f(ta.a), b => both(ta.l, b))
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ta: These<L, HKT<F, A>>): HKT<F, These<L, A>> => {
  return ta.isThis()
    ? F.of(this_(ta.value))
    : ta.isThat()
      ? F.map(ta.value, that as (a: A) => These<L, A>)
      : F.map(ta.a, b => both(ta.l, b))
}

/**
 *
 * @since 1.0.0
 */
export const this_ = <L, A>(l: L): These<L, A> => {
  return new This(l)
}

/**
 *
 * @since 1.0.0
 * @alias of
 */
export const that = of

/**
 *
 * @since 1.0.0
 */
export const both = <L, A>(l: L, a: A): These<L, A> => {
  return new Both(l, a)
}

/**
 *
 * @example
 * import { fromThese, this_, that, both } from 'fp-ts/lib/These'
 *
 * const from = fromThese('a', 1)
 * assert.deepStrictEqual(from(this_('b')), ['b', 1])
 * assert.deepStrictEqual(from(that(2)), ['a', 2])
 * assert.deepStrictEqual(from(both('b', 2)), ['b', 2])
 *
 * @since 1.0.0
 */
export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] => {
  return fa.isThis() ? [fa.value, defaultThat] : fa.isThat() ? [defaultThis, fa.value] : [fa.l, fa.a]
}

/**
 * Returns an `L` value if possible
 *
 * @example
 * import { theseLeft, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseLeft(this_('a')), some('a'))
 * assert.deepStrictEqual(theseLeft(that(1)), none)
 * assert.deepStrictEqual(theseLeft(both('a', 1)), some('a'))
 *
 * @since 1.0.0
 */
export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => {
  return fa.isThis() ? some(fa.value) : fa.isThat() ? none : some(fa.l)
}

/**
 * Returns an `A` value if possible
 *
 * @example
 * import { theseRight, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseRight(this_('a')), none)
 * assert.deepStrictEqual(theseRight(that(1)), some(1))
 * assert.deepStrictEqual(theseRight(both('a', 1)), some(1))
 *
 * @since 1.0.0
 */
export const theseRight = <L, A>(fa: These<L, A>): Option<A> => {
  return fa.isThis() ? none : fa.isThat() ? some(fa.value) : some(fa.a)
}

/**
 * Returns `true` if the these is an instance of `This`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => {
  return fa.isThis()
}

/**
 * Returns `true` if the these is an instance of `That`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isThat = <L, A>(fa: These<L, A>): fa is That<L, A> => {
  return fa.isThat()
}

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 1.0.0
 */
export const isBoth = <L, A>(fa: These<L, A>): fa is Both<L, A> => {
  return fa.isBoth()
}

/**
 * @example
 * import { thisOrBoth, this_, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(thisOrBoth('a', none), this_('a'))
 * assert.deepStrictEqual(thisOrBoth('a', some(1)), both('a', 1))
 *
 * @since 1.13.0
 */
export const thisOrBoth = <L, A>(defaultThis: L, ma: Option<A>): These<L, A> => {
  return ma.isNone() ? this_(defaultThis) : both(defaultThis, ma.value)
}

/**
 * @example
 * import { thatOrBoth, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(thatOrBoth(1, none), that(1))
 * assert.deepStrictEqual(thatOrBoth(1, some('a')), both('a', 1))
 *
 * @since 1.13.0
 */
export const thatOrBoth = <L, A>(defaultThat: A, ml: Option<L>): These<L, A> => {
  return ml.isNone() ? that(defaultThat) : both(ml.value, defaultThat)
}

/**
 * Returns the `L` value if and only if the value is constructed with `This`
 *
 * @example
 * import { theseThis, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseThis(this_('a')), some('a'))
 * assert.deepStrictEqual(theseThis(that(1)), none)
 * assert.deepStrictEqual(theseThis(both('a', 1)), none)
 *
 * @since 1.13.0
 */
export const theseThis = <L, A>(fa: These<L, A>): Option<L> => {
  return fa.isThis() ? some(fa.value) : none
}

/**
 * Returns the `A` value if and only if the value is constructed with `That`
 *
 * @example
 * import { theseThat, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(theseThat(this_('a')), none)
 * assert.deepStrictEqual(theseThat(that(1)), some(1))
 * assert.deepStrictEqual(theseThat(both('a', 1)), none)
 *
 *
 * @since 1.13.0
 */
export const theseThat = <L, A>(fa: These<L, A>): Option<A> => {
  return fa.isThat() ? some(fa.value) : none
}

/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, this_, that, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(this_('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(that(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @since 1.13.0
 */
export const fromOptions = <L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>> => {
  return fl.foldL(
    () => fa.fold(none, a => some(that<L, A>(a))),
    l => fa.foldL(() => some(this_(l)), a => some(both(l, a)))
  )
}

/**
 * @example
 * import { fromEither, this_, that } from 'fp-ts/lib/These'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(fromEither(left('a')), this_('a'))
 * assert.deepStrictEqual(fromEither(right(1)), that(1))
 *
 * @since 1.13.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): These<L, A> => {
  return fa.isLeft() ? this_(fa.value) : that(fa.value)
}

/**
 * @since 1.0.0
 */
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = {
  URI,
  map,
  bimap,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence
}
