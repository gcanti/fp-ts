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
import type * as applicative from './Applicative'
import type { Apply } from './Apply'
import * as bifunctor from './Bifunctor'
import type { Flat } from './Flat'
import type { Either, Left, Right } from './Either'
import type { Eq } from './Eq'
import * as eq from './Eq'
import type * as foldable from './Foldable'
import * as fromEither_ from './FromEither'
import type * as fromThese_ from './FromThese'
import type { Lazy } from './function'
import { identity, pipe } from './function'
import * as functor from './Functor'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type { Monad } from './Monad'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import type { Show } from './Show'
import * as traversable from './Traversable'

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
export const leftOrBoth =
  <E>(e: Lazy<E>) =>
  <A>(ma: Option<A>): These<E, A> =>
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
export const rightOrBoth =
  <A>(a: Lazy<A>) =>
  <E>(me: Option<E>): These<E, A> =>
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
 * @category destructors
 * @since 3.0.0
 */
export const match =
  <E, B, A, C = B, D = B>(onError: (e: E) => B, onSuccess: (a: A) => C, onBoth: (e: E, a: A) => D) =>
  (fa: These<E, A>): B | C | D => {
    switch (fa._tag) {
      case 'Left':
        return onError(fa.left)
      case 'Right':
        return onSuccess(fa.right)
      case 'Both':
        return onBoth(fa.left, fa.right)
    }
  }

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
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: These<E, A>) => These<G, B> =
  (f, g) => (fa) =>
    isLeft(fa) ? left(f(fa.left)) : isRight(fa) ? right(g(fa.right)) : both(f(fa.left), g(fa.right))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: These<E, A>) => These<G, A> =
  /*#__PURE__*/ bifunctor.mapLeftDefault<TheseF>(bimap)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(b, fa.right)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M = (M) => (f) => (fa) =>
  isLeft(fa) ? M.empty : f(fa.right)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(fa.right, b)

/**
 * @category Traversable
 * @since 3.0.0
 */
export const traverse: <F extends HKT>(
  F: applicative.Applicative<F>
) => <A, S, R, W, FE, B>(
  f: (a: A) => Kind<F, S, R, W, FE, B>
) => <E>(ta: These<E, A>) => Kind<F, S, R, W, FE, These<E, B>> = (F) => (f) => (ta) =>
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
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TheseF extends HKT {
  readonly type: These<this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TheseFFixedE<E> extends HKT {
  readonly type: These<E, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

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
  eq.fromEquals(
    (second) => (first) =>
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
  combine: (second) => (first) =>
    isLeft(first)
      ? isLeft(second)
        ? left(SE.combine(second.left)(first.left))
        : isRight(second)
        ? both(first.left, second.right)
        : both(SE.combine(second.left)(first.left), second.right)
      : isRight(first)
      ? isLeft(second)
        ? both(second.left, first.right)
        : isRight(second)
        ? right(SA.combine(second.right)(first.right))
        : both(second.left, SA.combine(second.right)(first.right))
      : isLeft(second)
      ? both(SE.combine(second.left)(first.left), first.right)
      : isRight(second)
      ? both(first.left, SA.combine(second.right)(first.right))
      : both(SE.combine(second.left)(first.left), SA.combine(second.right)(first.right))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<TheseF> = {
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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B> =
  /*#__PURE__*/ bifunctor.mapDefault<TheseF>(bimap)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TheseF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: These<E, (a: A) => B>) => These<E, B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<TheseF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <E>(S: Semigroup<E>): Apply<TheseFFixedE<E>> => ({
  map,
  ap: (fa) => (fab) =>
    isLeft(fab)
      ? isLeft(fa)
        ? left(S.combine(fa.left)(fab.left))
        : isRight(fa)
        ? left(fab.left)
        : left(S.combine(fa.left)(fab.left))
      : isRight(fab)
      ? isLeft(fa)
        ? left(fa.left)
        : isRight(fa)
        ? right(fab.right(fa.right))
        : both(fa.left, fab.right(fa.right))
      : isLeft(fa)
      ? left(S.combine(fa.left)(fab.left))
      : isRight(fa)
      ? both(fab.left, fab.right(fa.right))
      : both(S.combine(fa.left)(fab.left), fab.right(fa.right))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <E>(S: Semigroup<E>): applicative.Applicative<TheseFFixedE<E>> => {
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
export const getFlat = <E>(S: Semigroup<E>): Flat<TheseFFixedE<E>> => {
  const flatMap =
    <A, B>(f: (a: A) => These<E, B>) =>
    (ma: These<E, A>): These<E, B> => {
      if (isLeft(ma)) {
        return ma
      }
      if (isRight(ma)) {
        return f(ma.right)
      }
      const fb = f(ma.right)
      return isLeft(fb)
        ? left(S.combine(fb.left)(ma.left))
        : isRight(fb)
        ? both(ma.left, fb.right)
        : both(S.combine(fb.left)(ma.left), fb.right)
    }

  return {
    map,
    flatMap: flatMap
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <E>(S: Semigroup<E>): Monad<TheseFFixedE<E>> => {
  const C = getFlat(S)
  return {
    map,
    of,
    flatMap: C.flatMap
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<TheseF> = {
  fromEither: identity
}

/**
 * Derivable from `FromEither`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => These<E, A> =
  /*#__PURE__*/ fromEither_.fromOption(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionKOrElse: <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => These<E, B> = /*#__PURE__*/ fromEither_.fromOptionKOrElse(FromEither)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => (b: B) => These<E, B> = /*#__PURE__*/ fromEither_.fromPredicateOrElse(FromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => (c: C) => These<E, B> = /*#__PURE__*/ fromEither_.fromRefinementOrElse(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => These<E, B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableOrElse: <E>(onNullable: Lazy<E>) => <A>(a: A) => These<E, NonNullable<A>> =
  /*#__PURE__*/ fromEither_.fromNullableOrElse(FromEither)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => These<E, NonNullable<B>> = /*#__PURE__*/ fromEither_.fromNullableKOrElse(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromThese: fromThese_.FromThese<TheseF> = {
  fromThese: identity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<TheseF> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<TheseF> = {
  traverse
}

/**
 * @since 3.0.0
 */
export const sequence: <F extends HKT>(
  F: applicative.Applicative<F>
) => <E, FS, FR, FW, FE, A>(fa: These<E, Kind<F, FS, FR, FW, FE, A>>) => Kind<F, FS, FR, FW, FE, These<E, A>> =
  /*#__PURE__*/ traversable.sequence<TheseF>(Traversable)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const elem =
  <A>(E: Eq<A>) =>
  (a: A): (<E>(ma: These<E, A>) => boolean) =>
    exists(E.equals(a))

/**
 * @since 3.0.0
 */
export const exists =
  <A>(predicate: Predicate<A>) =>
  (ma: These<unknown, A>): boolean =>
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
export const toTuple2 =
  <E, A>(e: Lazy<E>, a: Lazy<A>) =>
  (fa: These<E, A>): readonly [E, A] =>
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
export const ApT: These<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => These<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): These<E, ReadonlyNonEmptyArray<B>> => {
    let e: Option<E> = _.none
    const t = f(0, _.head(as))
    if (isLeft(t)) {
      return t
    }
    if (isBoth(t)) {
      e = _.some(t.left)
    }
    const out: _.NonEmptyArray<B> = [t.right]
    for (let i = 1; i < as.length; i++) {
      const t = f(i, as[i])
      if (isLeft(t)) {
        return t
      }
      if (isBoth(t)) {
        e = _.isNone(e) ? _.some(t.left) : _.some(S.combine(t.left)(e.value))
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
export const traverseReadonlyArrayWithIndex =
  <E>(S: Semigroup<E>) =>
  <A, B>(f: (index: number, a: A) => These<E, B>): ((as: ReadonlyArray<A>) => These<E, ReadonlyArray<B>>) => {
    const g = traverseReadonlyNonEmptyArrayWithIndex(S)(f)
    return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
  }

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyNonEmptyArrayWithIndexS = traverseReadonlyNonEmptyArrayWithIndex(S)
  return <A, B>(f: (a: A) => These<E, B>): ((as: ReadonlyNonEmptyArray<A>) => These<E, ReadonlyNonEmptyArray<B>>) => {
    return traverseReadonlyNonEmptyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#traverse(getApplicative(S))`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <E>(S: Semigroup<E>) => {
  const traverseReadonlyArrayWithIndexS = traverseReadonlyArrayWithIndex(S)
  return <A, B>(f: (a: A) => These<E, B>): ((as: ReadonlyArray<A>) => These<E, ReadonlyArray<B>>) => {
    return traverseReadonlyArrayWithIndexS((_, a) => f(a))
  }
}

/**
 * Equivalent to `ReadonlyArray#sequence(getApplicative(S))`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray = <E>(
  S: Semigroup<E>
): (<A>(arr: ReadonlyArray<These<E, A>>) => These<E, ReadonlyArray<A>>) => traverseReadonlyArray(S)(identity)
