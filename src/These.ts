/**
 * @file A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".
 *
 * If you interpret `Either<E, A>` as suggesting the computation may either fail or succeed (exclusively), then
 * `These<E, A>` may fail, succeed, or do both at the same time.
 *
 * There are a few ways to interpret the both case:
 *
 * - You can think of a computation that has a non-fatal error.
 * - You can think of a computation that went as far as it could before erroring.
 * - You can think of a computation that keeps track of errors as it completes.
 *
 * Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
 * both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.
 *
 * (description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)
 *
 * Adapted from https://github.com/purescript-contrib/purescript-these
 */
import { Applicative } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { Either, Left, Right } from './Either'
import { Foldable2 } from './Foldable'
import { phantom, identity } from './function'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Option, some, none, isNone } from './Option'
import { Semigroup } from './Semigroup'
import { fromEquals, Eq } from './Eq'
import { Show } from './Show'
import { Traversable2 } from './Traversable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    These: These<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'These'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}

/**
 * @since 2.0.0
 */
export type These<E, A> = Either<E, A> | Both<E, A>

/**
 * @since 2.0.0
 */
export function left<E>(left: E): These<E, never> {
  return { _tag: 'Left', left }
}

/**
 * @since 2.0.0
 */
export function right<A>(right: A): These<never, A> {
  return { _tag: 'Right', right }
}

/**
 * @since 2.0.0
 */
export function both<E, A>(left: E, right: A): These<E, A> {
  return { _tag: 'Both', left, right }
}

/**
 * @since 2.0.0
 */
export function fold<E, A, R>(
  onLeft: (e: E) => R,
  onRight: (a: A) => R,
  onBoth: (e: E, a: A) => R
): (fa: These<E, A>) => R {
  return fa => {
    switch (fa._tag) {
      case 'Left':
        return onLeft(fa.left)
      case 'Right':
        return onRight(fa.right)
      case 'Both':
        return onBoth(fa.left, fa.right)
    }
  }
}

/**
 * @since 2.0.0
 */
export function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>> {
  return {
    show: fold(l => `left(${SE.show(l)})`, a => `right(${SA.show(a)})`, (l, a) => `both(${SE.show(l)}, ${SA.show(a)})`)
  }
}

/**
 * @since 2.0.0
 */
export function getEq<E, A>(EE: Eq<E>, EA: Eq<A>): Eq<These<E, A>> {
  return fromEquals((x, y) =>
    isLeft(x)
      ? isLeft(y) && EE.equals(x.left, y.left)
      : isRight(x)
      ? isRight(y) && EA.equals(x.right, y.right)
      : isBoth(y) && EE.equals(x.left, y.left) && EA.equals(x.right, y.right)
  )
}

/**
 * @since 2.0.0
 */
export function getSemigroup<E, A>(SL: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>> {
  return {
    concat: (x, y) =>
      isLeft(x)
        ? isLeft(y)
          ? left(SL.concat(x.left, y.left))
          : isRight(y)
          ? both(x.left, y.right)
          : both(SL.concat(x.left, y.left), y.right)
        : isRight(x)
        ? isLeft(y)
          ? both(y.left, x.right)
          : isRight(y)
          ? right(SA.concat(x.right, y.right))
          : both(y.left, SA.concat(x.right, y.right))
        : isLeft(y)
        ? both(SL.concat(x.left, y.left), x.right)
        : isRight(y)
        ? both(x.left, SA.concat(x.right, y.right))
        : both(SL.concat(x.left, y.left), SA.concat(x.right, y.right))
  }
}

const map = <E, A, B>(fa: These<E, A>, f: (a: A) => B): These<E, B> => {
  return isLeft(fa) ? fa : isRight(fa) ? right(f(fa.right)) : both(fa.left, f(fa.right))
}

/**
 * @since 2.0.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> {
  const chain = <A, B>(ma: These<E, A>, f: (a: A) => These<E, B>): These<E, B> => {
    if (isLeft(ma)) {
      return ma
    }
    if (isRight(ma)) {
      return f(ma.right)
    }
    const fb = f(ma.right)
    return isLeft(fb)
      ? left(S.concat(ma.left, fb.left))
      : isRight(fb)
      ? both(ma.left, fb.right)
      : both(S.concat(ma.left, fb.left), fb.right)
  }

  return {
    URI,
    _L: phantom,
    map,
    of: right,
    ap: (mab, ma) => chain(mab, f => map(ma, f)),
    chain
  }
}

const bimap = <E, M, A, B>(fa: These<E, A>, f: (e: E) => M, g: (a: A) => B): These<M, B> => {
  return isLeft(fa) ? left(f(fa.left)) : isRight(fa) ? right(g(fa.right)) : both(f(fa.left), g(fa.right))
}

const reduce = <E, A, B>(fa: These<E, A>, b: B, f: (b: B, a: A) => B): B => {
  return isLeft(fa) ? b : isRight(fa) ? f(b, fa.right) : f(b, fa.right)
}

const foldMap = <M>(M: Monoid<M>) => <E, A>(fa: These<E, A>, f: (a: A) => M): M => {
  return isLeft(fa) ? M.empty : isRight(fa) ? f(fa.right) : f(fa.right)
}

const reduceRight = <E, A, B>(fa: These<E, A>, b: B, f: (a: A, b: B) => B): B => {
  return isLeft(fa) ? b : isRight(fa) ? f(fa.right, b) : f(fa.right, b)
}

const traverse = <F>(F: Applicative<F>) => <E, A, B>(ta: These<E, A>, f: (a: A) => HKT<F, B>): HKT<F, These<E, B>> => {
  return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(f(ta.right), right) : F.map(f(ta.right), b => both(ta.left, b))
}

const sequence = <F>(F: Applicative<F>) => <E, A>(ta: These<E, HKT<F, A>>): HKT<F, These<E, A>> => {
  return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(ta.right, right) : F.map(ta.right, b => both(ta.left, b))
}

/**
 *
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/lib/These'
 *
 * assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
 *
 * @since 2.0.0
 */
export function toTuple<E, A>(e: E, a: A): (fa: These<E, A>) => [E, A] {
  return fa => (isLeft(fa) ? [fa.left, a] : isRight(fa) ? [e, fa.right] : [fa.left, fa.right])
}

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
 * @since 2.0.0
 */
export function getLeft<E, A>(fa: These<E, A>): Option<E> {
  return isLeft(fa) ? some(fa.left) : isRight(fa) ? none : some(fa.left)
}

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
 * @since 2.0.0
 */
export function getRight<E, A>(fa: These<E, A>): Option<A> {
  return isLeft(fa) ? none : isRight(fa) ? some(fa.right) : some(fa.right)
}

/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isLeft<E, A>(fa: These<E, A>): fa is Left<E> {
  return fa._tag === 'Left'
}

/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isRight<E, A>(fa: These<E, A>): fa is Right<A> {
  return fa._tag === 'Right'
}

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isBoth<E, A>(fa: These<E, A>): fa is Both<E, A> {
  return fa._tag === 'Both'
}

/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(leftOrBoth('a', none), left('a'))
 * assert.deepStrictEqual(leftOrBoth('a', some(1)), both('a', 1))
 *
 * @since 2.0.0
 */
export function leftOrBoth<E, A>(defaultLeft: E, ma: Option<A>): These<E, A> {
  return isNone(ma) ? left(defaultLeft) : both(defaultLeft, ma.value)
}

/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(1, none), right(1))
 * assert.deepStrictEqual(rightOrBoth(1, some('a')), both('a', 1))
 *
 * @since 2.0.0
 */
export function rightOrBoth<E, A>(defaultRight: A, me: Option<E>): These<E, A> {
  return isNone(me) ? right(defaultRight) : both(me.value, defaultRight)
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
 * @since 2.0.0
 */
export function getLeftOnly<E, A>(fa: These<E, A>): Option<E> {
  return isLeft(fa) ? some(fa.left) : none
}

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
 * @since 2.0.0
 */
export function getRightOnly<E, A>(fa: These<E, A>): Option<A> {
  return isRight(fa) ? some(fa.right) : none
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
 * @since 2.0.0
 */
export function fromOptions<E, A>(fe: Option<E>, fa: Option<A>): Option<These<E, A>> {
  return isNone(fe)
    ? isNone(fa)
      ? none
      : some(right(fa.value))
    : isNone(fa)
    ? some(left(fe.value))
    : some(both(fe.value, fa.value))
}

/**
 * @since 2.0.0
 */
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  map,
  bimap,
  mapLeft: (fla, f) => bimap(fla, f, identity),
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence
}
