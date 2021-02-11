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
 * @since 2.0.0
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { Either, Left, Right } from './Either'
import { Eq, fromEquals } from './Eq'
import { Foldable2 } from './Foldable'
import { FromEither2, fromOption as fromOption_, fromOptionK as fromOptionK_ } from './FromEither'
import { identity, Lazy, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { isNone, none, Option, some } from './Option'
import { Pointed2 } from './Pointed'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse2, Traversable2 } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}

/**
 * @category model
 * @since 2.0.0
 */
export type These<E, A> = Either<E, A> | Both<E, A>

/**
 * @category constructors
 * @since 2.0.0
 */
export function left<E = never, A = never>(left: E): These<E, A> {
  return { _tag: 'Left', left }
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function right<E = never, A = never>(right: A): These<E, A> {
  return { _tag: 'Right', right }
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function both<E, A>(left: E, right: A): These<E, A> {
  return { _tag: 'Both', left, right }
}

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
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
 * Alias of [`matchW`](#matchW).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = matchW

/**
 * @category destructors
 * @since 2.10.0
 */
export const match: <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (fa: These<E, A>) => B = matchW

/**
 * Alias of [`match`](#match).
 *
 * @category destructors
 * @since 2.0.0
 */
export const fold = match

/**
 * @category combinators
 * @since 2.4.0
 */
export const swap: <E, A>(fa: These<E, A>) => These<A, E> = fold(right, left, (e, a) => both(a, e))

/**
 * @category instances
 * @since 2.0.0
 */
export function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<These<E, A>> {
  return {
    show: fold(
      (l) => `left(${SE.show(l)})`,
      (a) => `right(${SA.show(a)})`,
      (l, a) => `both(${SE.show(l)}, ${SA.show(a)})`
    )
  }
}

/**
 * @category instances
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
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<These<E, A>> {
  return {
    concat: (x, y) =>
      isLeft(x)
        ? isLeft(y)
          ? left(SE.concat(x.left, y.left))
          : isRight(y)
          ? both(x.left, y.right)
          : both(SE.concat(x.left, y.left), y.right)
        : isRight(x)
        ? isLeft(y)
          ? both(y.left, x.right)
          : isRight(y)
          ? right(SA.concat(x.right, y.right))
          : both(y.left, SA.concat(x.right, y.right))
        : isLeft(y)
        ? both(SE.concat(x.left, y.left), x.right)
        : isRight(y)
        ? both(x.left, SA.concat(x.right, y.right))
        : both(SE.concat(x.left, y.left), SA.concat(x.right, y.right))
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getApply = <E>(S: Semigroup<E>): Apply2C<URI, E> => ({
  URI,
  _E: undefined as any,
  map: _map,
  ap: (fab, fa) =>
    isLeft(fab)
      ? isLeft(fa)
        ? left(S.concat(fab.left, fa.left))
        : isRight(fa)
        ? left(fab.left)
        : left(S.concat(fab.left, fa.left))
      : isRight(fab)
      ? isLeft(fa)
        ? left(fa.left)
        : isRight(fa)
        ? right(fab.right(fa.right))
        : both(fa.left, fab.right(fa.right))
      : isLeft(fa)
      ? left(S.concat(fab.left, fa.left))
      : isRight(fa)
      ? both(fab.left, fab.right(fa.right))
      : both(S.concat(fab.left, fa.left), fab.right(fa.right))
})

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicative<E>(S: Semigroup<E>): Applicative2C<URI, E> {
  const A = getApply(S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    of
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export function getChain<E>(S: Semigroup<E>): Chain2C<URI, E> {
  const A = getApply(S)

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
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    chain
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMonad<E>(S: Semigroup<E>): Monad2C<URI, E> & MonadThrow2C<URI, E> {
  const C = getChain(S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    of,
    ap: C.ap,
    chain: C.chain,
    throwError: left
  }
}

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
 * @category destructors
 * @since 2.0.0
 */
export function getLeft<E, A>(fa: These<E, A>): Option<E> {
  return isLeft(fa) ? some(fa.left) : isRight(fa) ? none : some(fa.left)
}

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
 * @category destructors
 * @since 2.0.0
 */
export function getRight<E, A>(fa: These<E, A>): Option<A> {
  return isLeft(fa) ? none : isRight(fa) ? some(fa.right) : some(fa.right)
}

/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export function isLeft<E, A>(fa: These<E, A>): fa is Left<E> {
  return fa._tag === 'Left'
}

/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export function isRight<E, A>(fa: These<E, A>): fa is Right<A> {
  return fa._tag === 'Right'
}

/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @category guards
 * @since 2.0.0
 */
export function isBoth<E, A>(fa: These<E, A>): fa is Both<E, A> {
  return fa._tag === 'Both'
}

// TODO: make lazy in v3
/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(leftOrBoth('a')(none), left('a'))
 * assert.deepStrictEqual(leftOrBoth('a')(some(1)), both('a', 1))
 *
 * @category constructors
 * @since 2.0.0
 */
export function leftOrBoth<E>(e: E): <A>(ma: Option<A>) => These<E, A> {
  return (ma) => (isNone(ma) ? left(e) : both(e, ma.value))
}

// TODO: make lazy in v3
/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/These'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(1)(none), right(1))
 * assert.deepStrictEqual(rightOrBoth(1)(some('a')), both('a', 1))
 *
 * @category constructors
 * @since 2.0.0
 */
export function rightOrBoth<A>(a: A): <E>(me: Option<E>) => These<E, A> {
  return (me) => (isNone(me) ? right(a) : both(me.value, a))
}

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
 * @category destructors
 * @since 2.0.0
 */
export function getLeftOnly<E, A>(fa: These<E, A>): Option<E> {
  return isLeft(fa) ? some(fa.left) : none
}

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
 * @category destructors
 * @since 2.0.0
 */
export function getRightOnly<E, A>(fa: These<E, A>): Option<A> {
  return isRight(fa) ? some(fa.right) : none
}

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

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))
/* istanbul ignore next */
const _reduce: Foldable2<URI>['reduce'] = (fa, b, f) => pipe(fa, reduce(b, f))
/* istanbul ignore next */
const _foldMap: Foldable2<URI>['foldMap'] = (M) => {
  const foldMapM = foldMap(M)
  return (fa, f) => pipe(fa, foldMapM(f))
}
/* istanbul ignore next */
const _reduceRight: Foldable2<URI>['reduceRight'] = (fa, b, f) => pipe(fa, reduceRight(b, f))
/* istanbul ignore next */
const _traverse = <F>(
  F: Applicative<F>
): (<E, A, B>(ta: These<E, A>, f: (a: A) => HKT<F, B>) => HKT<F, These<E, B>>) => {
  const traverseF = traverse(F)
  return (ta, f) => pipe(ta, traverseF(f))
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: These<E, A>) => These<G, B> = (f, g) => (fa) =>
  isLeft(fa) ? left(f(fa.left)) : isRight(fa) ? right(g(fa.right)) : both(f(fa.left), g(fa.right))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: These<E, A>) => These<G, A> = (f) => (fa) =>
  isLeft(fa) ? left(f(fa.left)) : isBoth(fa) ? both(f(fa.left), fa.right) : fa

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: These<E, A>) => These<E, B> = (f) => (fa) =>
  isLeft(fa) ? fa : isRight(fa) ? right(f(fa.right)) : both(fa.left, f(fa.right))

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: These<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : isRight(fa) ? f(b, fa.right) : f(b, fa.right)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: These<E, A>) => M = (M) => (f) => (fa) =>
  isLeft(fa) ? M.empty : isRight(fa) ? f(fa.right) : f(fa.right)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: These<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : isRight(fa) ? f(fa.right, b) : f(fa.right, b)

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => <E>(ta: These<E, A>) => HKT<F, These<E, B>>) => (f) => (ta) =>
  isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(f(ta.right), right) : F.map(f(ta.right), (b) => both(ta.left, b))

/**
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(F: Applicative<F>) => <E, A>(
  ta: These<E, HKT<F, A>>
): HKT<F, These<E, A>> => {
  return isLeft(ta) ? F.of(ta) : isRight(ta) ? F.map(ta.right, right) : F.map(ta.right, (b) => both(ta.left, b))
}

/**
 * @category Pointed
 * @since 2.0.0
 */
export const of = right

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'These'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: These<E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Foldable: Foldable2<URI> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Traversable: Traversable2<URI> = {
  URI,
  map: _map,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromEither: FromEither2<URI> = {
  URI,
  fromEither: identity
}

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @example
 * import { toTuple2, left, right, both } from 'fp-ts/These'
 *
 * assert.deepStrictEqual(toTuple2(() => 'a', () => 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple2(() => 'a', () => 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple2(() => 'a', () => 1)(both('b', 2)), ['b', 2])
 *
 * @since 2.10.0
 */
export const toTuple2 = <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: These<E, A>): readonly [E, A] =>
  isLeft(fa) ? [fa.left, a()] : isRight(fa) ? [e(), fa.right] : [fa.left, fa.right]

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/* tslint:disable:readonly-array */
/**
 * Use `toTuple2` instead.
 *
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/These'
 *
 * assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
 *
 * @since 2.0.0
 * @deprecated
 */
export const toTuple = <E, A>(e: E, a: A): ((fa: These<E, A>) => [E, A]) =>
  toTuple2(
    () => e,
    () => a
  ) as any
/* tslint:enable:readonly-array */

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  map: _map,
  bimap: _bimap,
  mapLeft: _mapLeft,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}
