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
import { Either, Left, Right } from './Either'
import { Foldable2 } from './Foldable'
import { phantom } from './function'
import { Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Option, some, none, isNone, fold as foldOption } from './Option'
import { Semigroup } from './Semigroup'
import { fromEquals, Eq } from './Eq'
import { Show } from './Show'
import { Traversable2 } from './Traversable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    These: These<L, A>
  }
}

export const URI = 'These'

export type URI = typeof URI

export interface Both<L, A> {
  readonly _tag: 'Both'
  readonly left: L
  readonly right: A
}

/**
 * @since 2.0.0
 */
export type These<L, A> = Either<L, A> | Both<L, A>

/**
 * @since 2.0.0
 */
export function left<L>(left: L): These<L, never> {
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
export function both<L, A>(left: L, right: A): These<L, A> {
  return { _tag: 'Both', left, right }
}

/**
 * @since 2.0.0
 */
export function fold<L, A, R>(
  fa: These<L, A>,
  onLeft: (l: L) => R,
  onRight: (a: A) => R,
  onBoth: (l: L, a: A) => R
): R {
  switch (fa._tag) {
    case 'Left':
      return onLeft(fa.left)
    case 'Right':
      return onRight(fa.right)
    case 'Both':
      return onBoth(fa.left, fa.right)
  }
}

/**
 * @since 2.0.0
 */
export function getShow<L, A>(SL: Show<L>, SA: Show<A>): Show<These<L, A>> {
  return {
    show: fa =>
      fold(fa, l => `left(${SL.show(l)})`, a => `right(${SA.show(a)})`, (l, a) => `both(${SL.show(l)}, ${SA.show(a)})`)
  }
}

/**
 * @since 2.0.0
 */
export function getEq<L, A>(SL: Eq<L>, SA: Eq<A>): Eq<These<L, A>> {
  return fromEquals(
    (x, y) =>
      isLeft(x)
        ? isLeft(y) && SL.equals(x.left, y.left)
        : isRight(x)
          ? isRight(y) && SA.equals(x.right, y.right)
          : isBoth(y) && SL.equals(x.left, y.left) && SA.equals(x.right, y.right)
  )
}

/**
 * @since 2.0.0
 */
export function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> {
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

const map = <L, A, B>(fa: These<L, A>, f: (a: A) => B): These<L, B> => {
  return isLeft(fa) ? fa : isRight(fa) ? right(f(fa.right)) : both(fa.left, f(fa.right))
}

/**
 * @since 2.0.0
 */
export function getMonad<L>(S: Semigroup<L>): Monad2C<URI, L> {
  const chain = <A, B>(ma: These<L, A>, f: (a: A) => These<L, B>): These<L, B> => {
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

const bimap = <L, M, A, B>(fa: These<L, A>, f: (l: L) => M, g: (a: A) => B): These<M, B> => {
  return isLeft(fa) ? left(f(fa.left)) : isRight(fa) ? right(g(fa.right)) : both(f(fa.left), g(fa.right))
}

const reduce = <L, A, B>(fa: These<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return isLeft(fa) ? b : isRight(fa) ? f(b, fa.right) : f(b, fa.right)
}

const foldMap = <M>(M: Monoid<M>) => <L, A>(fa: These<L, A>, f: (a: A) => M): M => {
  return isLeft(fa) ? M.empty : isRight(fa) ? f(fa.right) : f(fa.right)
}

const reduceRight = <L, A, B>(fa: These<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return isLeft(fa) ? b : isRight(fa) ? f(fa.right, b) : f(fa.right, b)
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(ta: These<L, A>, f: (a: A) => HKT<F, B>): HKT<F, These<L, B>> => {
  return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(f(ta.right), right) : F.map(f(ta.right), b => both(ta.left, b))
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ta: These<L, HKT<F, A>>): HKT<F, These<L, A>> => {
  return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(ta.right, right) : F.map(ta.right, b => both(ta.left, b))
}

/**
 *
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/lib/These'
 *
 * assert.deepStrictEqual(toTuple(left('b'), 'a', 1), ['b', 1])
 * assert.deepStrictEqual(toTuple(right(2), 'a', 1), ['a', 2])
 * assert.deepStrictEqual(toTuple(both('b', 2), 'a', 1), ['b', 2])
 *
 * @since 2.0.0
 */
export function toTuple<L, A>(fa: These<L, A>, l: L, a: A): [L, A] {
  return isLeft(fa) ? [fa.left, a] : isRight(fa) ? [l, fa.right] : [fa.left, fa.right]
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
export function getLeft<L, A>(fa: These<L, A>): Option<L> {
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
export function getRight<L, A>(fa: These<L, A>): Option<A> {
  return isLeft(fa) ? none : isRight(fa) ? some(fa.right) : some(fa.right)
}

/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isLeft<L, A>(fa: These<L, A>): fa is Left<L> {
  return fa._tag === 'Left'
}

/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isRight<L, A>(fa: These<L, A>): fa is Right<A> {
  return fa._tag === 'Right'
}

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 2.0.0
 */
export function isBoth<L, A>(fa: These<L, A>): fa is Both<L, A> {
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
export function leftOrBoth<L, A>(defaultLeft: L, ma: Option<A>): These<L, A> {
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
export function rightOrBoth<L, A>(defaultRight: A, ml: Option<L>): These<L, A> {
  return isNone(ml) ? right(defaultRight) : both(ml.value, defaultRight)
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
export function getLeftOnly<L, A>(fa: These<L, A>): Option<L> {
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
export function getRightOnly<L, A>(fa: These<L, A>): Option<A> {
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
export function fromOptions<L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>> {
  return foldOption(
    fl,
    () => foldOption(fa, () => none, a => some(right(a))),
    l => foldOption(fa, () => some(left(l)), a => some(both(l, a)))
  )
}

/**
 * @since 2.0.0
 */
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  map,
  bimap,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence
}
