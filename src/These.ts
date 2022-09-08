/**
 * A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".
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
 *
 * @since 3.0.0
 */
import type { Applicative, Applicative2C } from './Applicative'
import type { Apply2C } from './Apply'
import { Bifunctor2, mapDefault, mapLeftDefault } from './Bifunctor'
import type { Chain2C } from './Chain'
import { Either, Left, Right } from './Either'
import { Eq, fromEquals } from './Eq'
import type { Foldable2 } from './Foldable'
import {
  FromEither2,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import type { FromThese2 } from './FromThese'
import { identity, Lazy, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type { Monad2C } from './Monad'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Option } from './Option'
import type { Pointed2 } from './Pointed'
import { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Semigroup } from './Semigroup'
import type { Show } from './Show'
import type { Traversable2 } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}

/**
 * @category model
 * @since 3.0.0
 */
export type These<E, A> = Either<E, A> | Both<E, A>

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left = <E, A = never>(left: E): These<E, A> => ({ _tag: 'Left', left })

/**
 * @category constructors
 * @since 3.0.0
 */
export const right = <A, E = never>(right: A): These<E, A> => ({ _tag: 'Right', right })

/**
 * @category constructors
 * @since 3.0.0
 */
export const both = <E, A>(left: E, right: A): These<E, A> => ({ _tag: 'Both', left, right })

/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(leftOrBoth(() => 'a')(none), left('a'))
 * assert.deepStrictEqual(leftOrBoth(() => 'a')(some(1)), both('a', 1))
 *
 * @category constructors
 * @since 3.0.0
 */
export const leftOrBoth = <E>(e: Lazy<E>) => <A>(ma: Option<A>): These<E, A> =>
  _.isNone(ma) ? left(e()) : both(e(), ma.value)

/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(() => 1)(none), right(1))
 * assert.deepStrictEqual(rightOrBoth(() => 1)(some('a')), both('a', 1))
 *
 * @category constructors
 * @since 3.0.0
 */
export const rightOrBoth = <A>(a: Lazy<A>) => <E>(me: Option<E>): These<E, A> =>
  _.isNone(me) ? right(a()) : both(me.value, a())

/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromOptions = <E, A>(fe: Option<E>, fa: Option<A>): Option<These<E, A>> =>
  _.isNone(fe)
    ? _.isNone(fa)
      ? _.none
      : _.some(right(fa.value))
    : _.isNone(fa)
    ? _.some(left(fe.value))
    : _.some(both(fe.value, fa.value))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW = <E, B, A, C, D>(onLeft: (e: E) => B, onRight: (a: A) => C, onBoth: (e: E, a: A) => D) => (
  fa: These<E, A>
): B | C | D => {
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
 * @category destructors
 * @since 3.0.0
 */
export const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (fa: These<E, A>) => B = matchW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(fa: These<E, A>) => These<A, E> = match(right, left, (e, a) => both(a, e))

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 3.0.0
 */
export const isLeft = <E>(fa: These<E, unknown>): fa is Left<E> => fa._tag === 'Left'

/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 3.0.0
 */
export const isRight = <A>(fa: These<unknown, A>): fa is Right<A> => fa._tag === 'Right'

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @category guards
 * @since 3.0.0
 */
export const isBoth = <E, A>(fa: These<E, A>): fa is Both<E, A> => fa._tag === 'Both'

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor2<URI>['bimap'] = (f, g) => (fa) =>
  isLeft(fa) ? left(f(fa.left)) : isRight(fa) ? right(g(fa.right)) : both(f(fa.left), g(fa.right))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor2<URI>['mapLeft'] =
  /*#__PURE__*/
  mapLeftDefault<URI>(bimap)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: Foldable2<URI>['reduce'] = (b, f) => (fa) => (isLeft(fa) ? b : f(b, fa.right))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: Foldable2<URI>['foldMap'] = (M) => (f) => (fa) => (isLeft(fa) ? M.empty : f(fa.right))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: Foldable2<URI>['reduceRight'] = (b, f) => (fa) => (isLeft(fa) ? b : f(fa.right, b))

/**
 * @since 3.0.0
 */
export const traverse: Traversable2<URI>['traverse'] = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => <E>(ta: These<E, A>) => HKT<F, These<E, B>>) => (f) => (ta) =>
  isLeft(ta)
    ? F.of(ta)
    : isRight(ta)
    ? pipe(f(ta.right), F.map(right))
    : pipe(
        f(ta.right),
        F.map((b) => both(ta.left, b))
      )

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, E = never>(right: A) => These<E, A> = right

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'These'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly These: These<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>> => ({
  show: match(
    (l) => `left(${SE.show(l)})`,
    (a) => `right(${SA.show(a)})`,
    (l, a) => `both(${SE.show(l)}, ${SA.show(a)})`
  )
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <E, A>(EE: Eq<E>, EA: Eq<A>): Eq<These<E, A>> =>
  fromEquals((second) => (first) =>
    isLeft(first)
      ? isLeft(second) && EE.equals(second.left)(first.left)
      : isRight(first)
      ? isRight(second) && EA.equals(second.right)(first.right)
      : isBoth(second) && EE.equals(second.left)(first.left) && EA.equals(second.right)(first.right)
  )

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>> => ({
  concat: (second) => (first) =>
    isLeft(first)
      ? isLeft(second)
        ? left(SE.concat(second.left)(first.left))
        : isRight(second)
        ? both(first.left, second.right)
        : both(SE.concat(second.left)(first.left), second.right)
      : isRight(first)
      ? isLeft(second)
        ? both(second.left, first.right)
        : isRight(second)
        ? right(SA.concat(second.right)(first.right))
        : both(second.left, SA.concat(second.right)(first.right))
      : isLeft(second)
      ? both(SE.concat(second.left)(first.left), first.right)
      : isRight(second)
      ? both(first.left, SA.concat(second.right)(first.right))
      : both(SE.concat(second.left)(first.left), SA.concat(second.right)(first.right))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  bimap,
  mapLeft
}

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] =
  /*#__PURE__*/
  mapDefault<URI>(Bifunctor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed2<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(S: Semigroup<E>): Apply2C<URI, E> => ({
  map,
  ap: (fa) => (fab) =>
    isLeft(fab)
      ? isLeft(fa)
        ? left(S.concat(fa.left)(fab.left))
        : isRight(fa)
        ? left(fab.left)
        : left(S.concat(fa.left)(fab.left))
      : isRight(fab)
      ? isLeft(fa)
        ? left(fa.left)
        : isRight(fa)
        ? right(fab.right(fa.right))
        : both(fa.left, fab.right(fa.right))
      : isLeft(fa)
      ? left(S.concat(fa.left)(fab.left))
      : isRight(fa)
      ? both(fab.left, fab.right(fa.right))
      : both(S.concat(fa.left)(fab.left), fab.right(fa.right))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(S: Semigroup<E>): Applicative2C<URI, E> => {
  const A = getApply(S)
  return {
    map,
    ap: A.ap,
    of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getChain = <E>(S: Semigroup<E>): Chain2C<URI, E> => {
  const chain = <A, B>(f: (a: A) => These<E, B>) => (ma: These<E, A>): These<E, B> => {
    if (isLeft(ma)) {
      return ma
    }
    if (isRight(ma)) {
      return f(ma.right)
    }
    const fb = f(ma.right)
    return isLeft(fb)
      ? left(S.concat(fb.left)(ma.left))
      : isRight(fb)
      ? both(ma.left, fb.right)
      : both(S.concat(fb.left)(ma.left), fb.right)
  }

  return {
    map,
    chain
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad2C<URI, E> => {
  const C = getChain(S)
  return {
    map,
    of,
    chain: C.chain
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither2<URI> = {
  fromEither: identity
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: FromThese2<URI> = {
  fromThese: identity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable2<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable2<URI> = {
  map,
  traverse
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) => (a: A): (<E>(ma: These<E, A>) => boolean) => exists(E.equals(a))

/**
 * @since 3.0.0
 */
export const exists = <A>(predicate: Predicate<A>) => <E>(ma: These<E, A>): boolean =>
  isLeft(ma) ? false : predicate(ma.right)

/**
 * @example
 * import { toTuple2, left, right, both } from 'fp-ts/These'
 *
 * const f = toTuple2(() => 'a', () => 1)
 * assert.deepStrictEqual(f(left('b')), ['b', 1])
 * assert.deepStrictEqual(f(right(2)), ['a', 2])
 * assert.deepStrictEqual(f(both('b', 2)), ['b', 2])
 *
 * @since 3.0.0
 */
export const toTuple2 = <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: These<E, A>): readonly [E, A] =>
  isLeft(fa) ? [fa.left, a()] : isRight(fa) ? [e(), fa.right] : [fa.left, fa.right]

/**
 * Returns an `E` value if possible
 *
 * @example
 * import { getLeft, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
 *
 * @since 3.0.0
 */
export const getLeft = <E, A>(fa: These<E, A>): Option<E> =>
  isLeft(fa) ? _.some(fa.left) : isRight(fa) ? _.none : _.some(fa.left)

/**
 * Returns an `A` value if possible
 *
 * @example
 * import { getRight, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getRight(left('a')), none)
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(both('a', 1)), some(1))
 *
 * @since 3.0.0
 */
export const getRight = <E, A>(fa: These<E, A>): Option<A> =>
  isLeft(fa) ? _.none : isRight(fa) ? _.some(fa.right) : _.some(fa.right)

/**
 * Returns the `E` value if and only if the value is constructed with `Left`
 *
 * @example
 * import { getLeftOnly, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
 * assert.deepStrictEqual(getLeftOnly(right(1)), none)
 * assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
 *
 * @since 3.0.0
 */
export const getLeftOnly = <E, A>(fa: These<E, A>): Option<E> => (isLeft(fa) ? _.some(fa.left) : _.none)

/**
 * Returns the `A` value if and only if the value is constructed with `Right`
 *
 * @example
 * import { getRightOnly, left, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(getRightOnly(left('a')), none)
 * assert.deepStrictEqual(getRightOnly(right(1)), some(1))
 * assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
 *
 * @since 3.0.0
 */
export const getRightOnly = <E, A>(fa: These<E, A>): Option<A> => (isRight(fa) ? _.some(fa.right) : _.none)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: These<never, readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApplicative(S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <E>(S: Semigroup<E>) => <A, B>(
  f: (index: number, a: A) => These<E, B>
) => (as: ReadonlyNonEmptyArray<A>): These<E, ReadonlyNonEmptyArray<B>> => {
  let e: Option<E> = _.none
  const t = f(0, _.head(as))
  if (isLeft(t)) {
    return t
  }
  if (isBoth(t)) {
    e = _.some(t.left)
  }
  const out: NonEmptyArray<B> = [t.right]
  for (let i = 1; i < as.length; i++) {
    const t = f(i, as[i])
    if (isLeft(t)) {
      return t
    }
    if (isBoth(t)) {
      e = _.isNone(e) ? _.some(t.left) : _.some(S.concat(t.left)(e.value))
    }
    out.push(t.right)
  }
  return _.isNone(e) ? right(out) : both(e.value, out)
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <E>(S: Semigroup<E>) => <A, B>(
  f: (index: number, a: A) => These<E, B>
): ((as: ReadonlyArray<A>) => These<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(S)(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
