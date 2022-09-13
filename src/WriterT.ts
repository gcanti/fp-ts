/**
 * @since 3.0.0
 */
import { ap as ap_, Apply } from './Apply'
import type { Chain } from './Chain'
import type { FromIO } from './FromIO'
import type { FromTask } from './FromTask'
import { pipe } from './function'
import { Functor, map as map_ } from './Functor'
import type { HKT, Kind } from './HKT'
import type { IO } from './IO'
import type { Monoid } from './Monoid'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'
import type { Task } from './Task'
import * as W from './Writer'

import Writer = W.Writer

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function fromF<F extends HKT>(
  F: Functor<F>
): <W>(w: W) => <S, R, FW, E, A>(fa: Kind<F, S, R, FW, E, A>) => Kind<F, S, R, FW, E, Writer<W, A>> {
  return (w) => F.map(W.fromIdentity(w))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIO = <F extends HKT>(F: Functor<F>, FT: FromIO<F>) => <W>(w: W) => <
  A,
  S,
  R = unknown,
  FW = never,
  E = never
>(
  fa: IO<A>
): Kind<F, S, R, FW, E, Writer<W, A>> => {
  return pipe(FT.fromIO<A, S, R, FW, E>(fa), F.map(W.fromIdentity(w)))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask = <F extends HKT>(F: Functor<F>, FT: FromTask<F>) => <W>(w: W) => <
  A,
  S,
  R = unknown,
  FW = never,
  E = never
>(
  fa: Task<A>
): Kind<F, S, R, FW, E, Writer<W, A>> => {
  return pipe(FT.fromTask<A, S, R, FW, E>(fa), F.map(W.fromIdentity(w)))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const tell = <F extends HKT>(F: Pointed<F>) => <W, S, R = unknown, FW = never, E = never>(
  w: W
): Kind<F, S, R, FW, E, Writer<W, void>> => {
  return F.of(W.tell(w))
}

// -------------------------------------------------------------------------------------
// type class operations
// -------------------------------------------------------------------------------------

/**
 * @category type class operations
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, FW, E, W>(fa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, B>> {
  return map_(F, W.Functor)
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export function of<F extends HKT, W>(
  F: Pointed<F>,
  M: Monoid<W>
): <A, S, R = unknown, FW = never, E = never>(a: A) => Kind<F, S, R, FW, E, Writer<W, A>> {
  return (a) => F.of([a, M.empty])
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export const ap = <F extends HKT, W>(
  F: Apply<F>,
  S: Semigroup<W>
): (<S, R2, FW2, E2, A>(
  fa: Kind<F, S, R2, FW2, E2, Writer<W, A>>
) => <R1, FW1, E1, B>(
  fab: Kind<F, S, R1, FW1, E1, Writer<W, (a: A) => B>>
) => Kind<F, S, R1 & R2, FW1 | FW2, E1 | E2, Writer<W, B>>) => {
  return ap_(F, W.getApply(S))
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export const chain = <M extends HKT, W>(M: Chain<M>, S: Semigroup<W>) => <A, S, R1, FW1, E1, B>(
  f: (a: A) => Kind<M, S, R1, FW1, E1, Writer<W, B>>
): (<R2, FW2, E2>(
  ma: Kind<M, S, R2, FW2, E2, Writer<W, A>>
) => Kind<M, S, R1 & R2, FW1 | FW2, E1 | E2, Writer<W, B>>) => {
  return M.chain(([a, w1]) =>
    pipe(
      f(a),
      M.map(([b, w2]) => [b, S.concat(w2)(w1)])
    )
  )
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export function bimap<F extends HKT>(
  F: Functor<F>
): <W, G, A, B>(
  mapSnd: (w: W) => G,
  mapFst: (a: A) => B
) => <S, R, FW, E>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<G, B>> {
  return (f, g) => F.map(W.bimap(f, g))
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export function mapLeft<F extends HKT>(
  F: Functor<F>
): <W, G>(
  mapSnd: (w: W) => G
) => <S, R, FW, E, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<G, A>> {
  return (f) => F.map(W.mapLeft(f))
}

// TODO: alt, zero, fromEither, fromReader, fromState, reduce, foldMap, reduceRight, traverse, contramap

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function fst<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, A> {
  return F.map(W.fst)
}

/**
 * @since 3.0.0
 */
export function snd<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, W> {
  return F.map(W.snd)
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function swap<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<A, W>> {
  return F.map(W.swap)
}

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export function listen<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, readonly [A, W]>> {
  return F.map(W.listen)
}

/**
 * Applies the returned function to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export function pass<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(
  fwa: Kind<F, S, R, FW, E, Writer<W, readonly [A, (w: W) => W]>>
) => Kind<F, S, R, FW, E, Writer<W, A>> {
  return F.map(W.pass)
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @category combinators
 * @since 3.0.0
 */
export function listens<F extends HKT>(
  F: Functor<F>
): <W, B>(
  f: (w: W) => B
) => <S, R, FW, E, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, readonly [A, B]>> {
  return (f) => F.map(W.listens(f))
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @category combinators
 * @since 3.0.0
 */
export function censor<F extends HKT>(
  F: Functor<F>
): <W>(
  f: (w: W) => W
) => <S, R, FW, E, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, A>> {
  return (f) => F.map(W.censor(f))
}
