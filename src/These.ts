/**
 * @file A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".
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
 * Adapted from https://github.com/purescript-contrib/purescript-these
 */
import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { Either } from './Either'
import { Foldable2v2 } from './Foldable2v'
import { toString } from './function'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { none, Option, some } from './Option'
import { Semigroup } from './Semigroup'
import { fromEquals, Eq } from './Eq'
import { Show } from './Show'
import { Traversable2v2 } from './Traversable2v'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    These: These<L, A>
  }
}

export const URI = 'These'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>

export class This<L, A> {
  readonly _tag: 'This' = 'This'
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: L) {}
  /** @obsolete */
  map<B>(f: (a: A) => B): These<L, B> {
    return this as any
  }
  /** @obsolete */
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> {
    return new This(f(this.value))
  }
  /** @obsolete */
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  /**
   * Applies a function to each case in the data structure
   * @obsolete
   */
  fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B, onBoth: (l: L, a: A) => B): B {
    return onLeft(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `left(${toString(this.value)})`
  }
  /**
   * Returns `true` if the these is `This`, `false` otherwise
   * @obsolete
   */
  isThis(): this is This<L, A> {
    return true
  }
  /**
   * Returns `true` if the these is `That`, `false` otherwise
   * @obsolete
   */
  isThat(): this is That<L, A> {
    return false
  }
  /**
   * Returns `true` if the these is `Both`, `false` otherwise
   * @obsolete
   */
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
  fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B, onBoth: (l: L, a: A) => B): B {
    return onRight(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `right(${toString(this.value)})`
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
  fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B, onBoth: (l: L, a: A) => B): B {
    return onBoth(this.l, this.a)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
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
 * @since 1.17.0
 */
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<These<L, A>> => {
  return {
    show: t =>
      t.fold(l => `left(${SL.show(l)})`, a => `right(${SA.show(a)})`, (l, a) => `both(${SL.show(l)}, ${SA.show(a)})`)
  }
}

/**
 * Use `getEq`
 *
 * @since 1.0.0
 * @deprecated
 */
export const getSetoid: <L, A>(EL: Eq<L>, EA: Eq<A>) => Eq<These<L, A>> = getEq

/**
 * @since 1.19.0
 */
export function getEq<L, A>(EL: Eq<L>, EA: Eq<A>): Eq<These<L, A>> {
  return fromEquals((x, y) =>
    x.isThis()
      ? y.isThis() && EL.equals(x.value, y.value)
      : x.isThat()
      ? y.isThat() && EA.equals(x.value, y.value)
      : y.isBoth() && EL.equals(x.l, y.l) && EA.equals(x.a, y.a)
  )
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => {
  return {
    concat: (x, y) =>
      x.isThis()
        ? y.isThis()
          ? left(SL.concat(x.value, y.value))
          : y.isThat()
          ? both(x.value, y.value)
          : both(SL.concat(x.value, y.l), y.a)
        : x.isThat()
        ? y.isThis()
          ? both(y.value, x.value)
          : y.isThat()
          ? right(SA.concat(x.value, y.value))
          : both(y.l, SA.concat(x.value, y.a))
        : y.isThis()
        ? both(SL.concat(x.l, y.value), x.a)
        : y.isThat()
        ? both(x.l, SA.concat(x.a, y.value))
        : both(SL.concat(x.l, y.l), SA.concat(x.a, y.a))
  }
}

/**
 * Use `right`
 *
 * @since 1.0.0
 * @deprecated
 */
export const that = <L, A>(a: A): These<L, A> => {
  return new That<L, A>(a)
}

/**
 * @since 1.0.0
 */
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => {
  const chain = <A, B>(fa: These<L, A>, f: (a: A) => These<L, B>): These<L, B> => {
    if (fa.isThis()) {
      return left(fa.value)
    } else if (fa.isThat()) {
      return f(fa.value)
    } else {
      const fb = f(fa.a)
      return fb.isThis()
        ? left(S.concat(fa.l, fb.value))
        : fb.isThat()
        ? both(fa.l, fb.value)
        : both(S.concat(fa.l, fb.l), fb.a)
    }
  }

  return {
    URI,
    _L: undefined as any,
    map: these.map,
    of: right,
    ap: (fab, fa) => chain(fab, f => these.map(fa, f)),
    chain
  }
}

/**
 * Use `left`
 *
 * @since 1.0.0
 * @deprecated
 */
export const this_ = <L, A>(l: L): These<L, A> => {
  return new This(l)
}

/**
 * @since 1.0.0
 */
export const both = <L, A>(l: L, a: A): These<L, A> => {
  return new Both(l, a)
}

/**
 * Use `toTuple`
 *
 * @since 1.0.0
 * @deprecated
 */
export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] => {
  return fa.isThis() ? [fa.value, defaultThat] : fa.isThat() ? [defaultThis, fa.value] : [fa.l, fa.a]
}

/**
 * Use `getLeft`
 *
 * @since 1.0.0
 * @deprecated
 */
export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => {
  return fa.isThis() ? some(fa.value) : fa.isThat() ? none : some(fa.l)
}

/**
 * Use `getRight`
 *
 * @since 1.0.0
 * @deprecated
 */
export const theseRight = <L, A>(fa: These<L, A>): Option<A> => {
  return fa.isThis() ? none : fa.isThat() ? some(fa.value) : some(fa.a)
}

/**
 * Use `isLeft`
 *
 * @since 1.0.0
 * @deprecated
 */
export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => {
  return fa.isThis()
}

/**
 * Use `isRight`
 *
 * @since 1.0.0
 * @deprecated
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
 * Use `leftOrBoth`
 *
 * @since 1.13.0
 * @deprecated
 */
export const thisOrBoth = <L, A>(defaultThis: L, ma: Option<A>): These<L, A> => {
  return ma.isNone() ? left(defaultThis) : both(defaultThis, ma.value)
}

/**
 * Use `rightOrBoth`
 *
 * @since 1.13.0
 * @deprecated
 */
export const thatOrBoth = <L, A>(defaultThat: A, ml: Option<L>): These<L, A> => {
  return ml.isNone() ? right(defaultThat) : both(ml.value, defaultThat)
}

/**
 * Use `getLeftOnly`
 *
 * @since 1.13.0
 * @deprecated
 */
export const theseThis = <L, A>(fa: These<L, A>): Option<L> => {
  return fa.isThis() ? some(fa.value) : none
}

/**
 * Use `getRightOnly`
 *
 * @since 1.13.0
 * @deprecated
 */
export const theseThat = <L, A>(fa: These<L, A>): Option<A> => {
  return fa.isThat() ? some(fa.value) : none
}

/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @since 1.13.0
 */
export const fromOptions = <L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>> => {
  return fl.foldL(() => fa.fold(none, a => some(right(a))), l => fa.foldL(() => some(left(l)), a => some(both(l, a))))
}

/**
 * @example
 * import { fromEither, left, right } from 'fp-ts/lib/These'
 * import * as E from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(fromEither(E.left('a')), left('a'))
 * assert.deepStrictEqual(fromEither(E.right(1)), right(1))
 *
 * @since 1.13.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): These<L, A> => {
  return fa.isLeft() ? left(fa.value) : right(fa.value)
}

/**
 * @since 1.0.0
 */
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  bimap: (fla, f, g) => fla.bimap(f, g),
  reduce: (fa, b, f) => fa.reduce(b, f),
  foldMap: M => (fa, f) => (fa.isThis() ? M.empty : fa.isThat() ? f(fa.value) : f(fa.a)),
  foldr: (fa, b, f) => (fa.isThis() ? b : fa.isThat() ? f(fa.value, b) : f(fa.a, b)),
  traverse: <F>(F: Applicative<F>) => <L, A, B>(ta: These<L, A>, f: (a: A) => HKT<F, B>): HKT<F, These<L, B>> => {
    return ta.isThis()
      ? F.of(left(ta.value))
      : ta.isThat()
      ? F.map(f(ta.value), right as (b: B) => These<L, B>)
      : F.map(f(ta.a), b => both(ta.l, b))
  },
  sequence: <F>(F: Applicative<F>) => <L, A>(ta: These<L, HKT<F, A>>): HKT<F, These<L, A>> => {
    return ta.isThis()
      ? F.of(left(ta.value))
      : ta.isThat()
      ? F.map(ta.value, right as (a: A) => These<L, A>)
      : F.map(ta.a, b => both(ta.l, b))
  }
}

//
// backporting
//

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const left: <E>(left: E) => These<E, never> = this_

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const right: <A>(right: A) => These<never, A> = that

/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const isLeft: <E, A>(fa: These<E, A>) => fa is This<E, A> = isThis

/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const isRight: <E, A>(fa: These<E, A>) => fa is That<E, A> = isThat

/**
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/lib/These'
 *
 * assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
 *
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const toTuple: <E, A>(e: E, a: A) => (fa: These<E, A>) => [E, A] = fromThese

/**
 * Returns an `L` value if possible
 *
 * @example
 * import { getLeft, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
 *
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const getLeft: <E, A>(fa: These<E, A>) => Option<E> = theseLeft

/**
 * Returns an `A` value if possible
 *
 * @example
 * import { getRight, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRight(left('a')), none)
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(both('a', 1)), some(1))
 *
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const getRight: <E, A>(fa: These<E, A>) => Option<A> = theseRight

/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
 * assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
 *
 * @since 1.19.0
 */
export function leftOrBoth<E>(defaultLeft: E): <A>(ma: Option<A>) => These<E, A> {
  // tslint:disable-next-line: deprecation
  return ma => thisOrBoth(defaultLeft, ma)
}

/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
 * assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
 *
 * @since 1.19.0
 */
export function rightOrBoth<A>(defaultRight: A): <E>(me: Option<E>) => These<E, A> {
  // tslint:disable-next-line: deprecation
  return me => thatOrBoth(defaultRight, me)
}

/**
 * Returns the `L` value if and only if the value is constructed with `Left`
 *
 * @example
 * import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
 * assert.deepStrictEqual(getLeftOnly(right(1)), none)
 * assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
 *
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const getLeftOnly: <E, A>(fa: These<E, A>) => Option<E> = theseThis

/**
 * Returns the `A` value if and only if the value is constructed with `Right`
 *
 * @example
 * import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRightOnly(left('a')), none)
 * assert.deepStrictEqual(getRightOnly(right(1)), some(1))
 * assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
 *
 *
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const getRightOnly: <E, A>(fa: These<E, A>) => Option<A> = theseThat

/**
 * @since 1.19.0
 */
export function fold<E, A, R>(
  onLeft: (e: E) => R,
  onRight: (a: A) => R,
  onBoth: (e: E, a: A) => R
): (fa: These<E, A>) => R {
  return fa => fa.fold(onLeft, onRight, onBoth)
}

const { bimap, foldMap, map, mapLeft, reduce, reduceRight } = pipeable(these)

export { bimap, foldMap, map, mapLeft, reduce, reduceRight }
