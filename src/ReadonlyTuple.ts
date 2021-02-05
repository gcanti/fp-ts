/**
 * @since 2.5.0
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Either } from './Either'
import { Foldable2 } from './Foldable'
import { identity, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { PipeableTraverse2, Traversable2 } from './Traversable'
import { Extend2 } from './Extend'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.5.0
 */
export function fst<A, E>(ea: readonly [A, E]): A {
  return ea[0]
}

/**
 * @category destructors
 * @since 2.5.0
 */
export function snd<A, E>(ea: readonly [A, E]): E {
  return ea[1]
}

/**
 * @category combinators
 * @since 2.5.0
 */
export function swap<A, E>(ea: readonly [A, E]): readonly [E, A] {
  return [snd(ea), fst(ea)]
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getApply<S>(S: Semigroup<S>): Apply2C<URI, S> {
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]
  }
}

const of = <M>(M: Monoid<M>) => <A>(a: A): readonly [A, M] => {
  return [a, M.empty]
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getApplicative<M>(M: Monoid<M>): Applicative2C<URI, M> {
  const A = getApply(M)
  return {
    URI,
    _E: undefined as any,
    map: A.map,
    ap: A.ap,
    of: of(M)
  }
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getChain<S>(S: Semigroup<S>): Chain2C<URI, S> {
  const A = getApply(S)
  return {
    URI,
    _E: undefined as any,
    map: A.map,
    ap: A.ap,
    chain: (ma, f) => {
      const [b, s] = f(fst(ma))
      return [b, S.concat(snd(ma), s)]
    }
  }
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getMonad<M>(M: Monoid<M>): Monad2C<URI, M> {
  const C = getChain(M)
  return {
    URI,
    _E: undefined as any,
    map: C.map,
    ap: C.ap,
    chain: C.chain,
    of: of(M)
  }
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
export function getChainRec<M>(M: Monoid<M>): ChainRec2C<URI, M> {
  const chainRec = <A, B>(a: A, f: (a: A) => readonly [Either<A, B>, M]): readonly [B, M] => {
    let result: readonly [Either<A, B>, M] = f(a)
    let acc: M = M.empty
    let s: Either<A, B> = fst(result)
    while (s._tag === 'Left') {
      acc = M.concat(acc, snd(result))
      result = f(s.left)
      s = fst(result)
    }
    return [s.right, M.concat(acc, snd(result))]
  }

  const C = getChain(M)
  return {
    URI,
    _E: undefined as any,
    map: C.map,
    ap: C.ap,
    chain: C.chain,
    chainRec
  }
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _compose: Semigroupoid2<URI>['compose'] = (bc, ab) => pipe(bc, compose(ab))
/* istanbul ignore next */
const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))
/* istanbul ignore next */
const _extend: Extend2<URI>['extend'] = (wa, f) => pipe(wa, extend(f))
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
): (<A, S, B>(ta: readonly [A, S], f: (a: A) => HKT<F, B>) => HKT<F, readonly [B, S]>) => {
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
 * @since 2.5.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: readonly [A, E]) => readonly [B, G] = (
  f,
  g
) => (fa) => [g(fst(fa)), f(snd(fa))]

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.5.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G] = (f) => (fa) => [
  fst(fa),
  f(snd(fa))
]

/**
 * @category Semigroupoid
 * @since 2.5.0
 */
export const compose: <A, B>(ab: readonly [B, A]) => <C>(bc: readonly [C, B]) => readonly [C, A] = (ab) => (bc) => [
  fst(bc),
  snd(ab)
]

/**
 * @category Extend
 * @since 2.5.0
 */
export const extend: <E, A, B>(f: (wa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E] = (f) => (
  wa
) => [f(wa), snd(wa)]

/**
 * @category Extract
 * @since 2.6.2
 */
export const extract: <E, A>(wa: readonly [A, E]) => A = fst

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const duplicate: <E, A>(wa: readonly [A, E]) => readonly [readonly [A, E], E] =
  /*#__PURE__*/
  extend(identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E] = (f) => (fa) => [
  f(fst(fa)),
  snd(fa)
]

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B = (b, f) => (fa) =>
  f(b, fst(fa))

/**
 * @category Foldable
 * @since 2.5.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M = () => {
  return (f) => (fa) => f(fst(fa))
}

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B = (b, f) => (fa) =>
  f(fst(fa), b)

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => <E>(as: readonly [A, E]) => HKT<F, readonly [B, E]>) => {
  return (f) => (ta) => F.map(f(fst(ta)), (b) => [b, snd(ta)])
}

/**
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(F: Applicative<F>) => <A, E>(
  fas: readonly [HKT<F, A>, E]
): HKT<F, readonly [A, E]> => {
  return F.map(fst(fas), (a) => [a, snd(fas)])
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.5.0
 */
export const URI = 'ReadonlyTuple'

/**
 * @category instances
 * @since 2.5.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: readonly [A, E]
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
export const Semigroupoid: Semigroupoid2<URI> = {
  URI,
  compose: _compose
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Comonad: Comonad2<URI> = {
  URI,
  map: _map,
  extend: _extend,
  extract
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

// -------------------------------------------------------------------------------------
// derivables
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
export const readonlyTuple: Semigroupoid2<URI> &
  Bifunctor2<URI> &
  Comonad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> = {
  URI,
  compose: _compose,
  map: _map,
  bimap: _bimap,
  mapLeft: _mapLeft,
  extract,
  extend: _extend,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}
