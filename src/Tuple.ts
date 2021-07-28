/**
 * @since 2.0.0
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import * as RT from './ReadonlyTuple'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2, PipeableTraverse2 } from './Traversable'
import { flap as flap_, Functor2 } from './Functor'
import { Extend2 } from './Extend'
import { Either } from './Either'
import { identity, pipe } from './function'
import { HKT } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.0.0
 */
export const fst: <A, E>(ea: [A, E]) => A = RT.fst

/**
 * @category destructors
 * @since 2.0.0
 */
export const snd: <A, E>(ea: [A, E]) => E = RT.snd

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap = <A, E>(ea: [A, E]): [E, A] => [snd(ea), fst(ea)]

/**
 * @category instances
 * @since 2.0.0
 */
export function getApply<S>(S: Semigroup<S>): Apply2C<URI, S> {
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]
  }
}

const of = <M>(M: Monoid<M>) => <A>(a: A): [A, M] => {
  return [a, M.empty]
}

/**
 * @category instances
 * @since 2.0.0
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
 * @since 2.0.0
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
 * @since 2.0.0
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

/**
 * @category instances
 * @since 2.0.0
 */
export function getChainRec<M>(M: Monoid<M>): ChainRec2C<URI, M> {
  const chainRec = <A, B>(a: A, f: (a: A) => [Either<A, B>, M]): [B, M] => {
    let result: [Either<A, B>, M] = f(a)
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
const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, mapFst(f))
/* istanbul ignore next */
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapSnd(f))
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
function _traverse<F>(F: Applicative<F>): <A, S, B>(ta: [A, S], f: (a: A) => HKT<F, B>) => HKT<F, [B, S]> {
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
export const bimap: <E, G, A, B>(mapSnd: (e: E) => G, mapFst: (a: A) => B) => (fa: [A, E]) => [B, G] = (f, g) => (
  fa
) => [g(fst(fa)), f(snd(fa))]

/**
 * Map a function over the first component of a `Tuple`.
 *
 * This is the `map` operation of the `Functor` instance.
 *
 * @category Functor
 * @since 2.0.0
 */
export const mapFst: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E] = (f) => (fa) => [f(fst(fa)), snd(fa)]

/**
 * Map a function over the second component of a `Tuple`.
 *
 * This is the `mapLeft` operation of the `Bifunctor` instance.
 *
 * @category Bifunctor
 * @since 2.10.0
 */
export const mapSnd: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G] = (f) => (fa) => [fst(fa), f(snd(fa))]

/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export const compose: <A, B>(ab: [B, A]) => <C>(bc: [C, B]) => [C, A] = (ab) => (bc) => [fst(bc), snd(ab)]

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E] = (f) => (wa) => [f(wa), snd(wa)]

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const duplicate: <E, A>(wa: [A, E]) => [[A, E], E] =
  /*#__PURE__*/
  extend(identity)

/**
 * @category Extract
 * @since 2.6.2
 */
export const extract: <E, A>(wa: [A, E]) => A = RT.extract

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M = RT.foldMap

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B = RT.reduce

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B = RT.reduceRight

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => <E>(as: [A, E]) => HKT<F, [B, E]>) => {
  return (f) => (ta) => F.map(f(fst(ta)), (b) => [b, snd(ta)])
}

/**
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(F: Applicative<F>) => <A, E>(
  fas: [HKT<F, A>, E]
): HKT<F, [A, E]> => {
  return F.map(fst(fas), (a) => [a, snd(fas)])
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Tuple'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: [A, E]
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
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`mapFst`](#mapfst) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E] = mapFst

/**
 * Use [`mapSnd`](#mapsnd) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G] = mapSnd

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> = {
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
