/**
 * @since 2.4.0
 */
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Monoid } from './Monoid'

/**
 * @since 2.4.0
 */
export interface WriterT<M, W, A> {
  (): HKT<M, [A, W]>
}

/**
 * @since 2.4.0
 */
export interface WriterM<M> {
  readonly map: <W, A, B>(fa: WriterT<M, W, A>, f: (a: A) => B) => WriterT<M, W, B>
  readonly evalWriter: <W, A>(fa: WriterT<M, W, A>) => HKT<M, A>
  readonly execWriter: <W, A>(fa: WriterT<M, W, A>) => HKT<M, W>
  readonly tell: <W>(w: W) => WriterT<M, W, void>
  readonly listen: <W, A>(fa: WriterT<M, W, A>) => WriterT<M, W, [A, W]>
  readonly pass: <W, A>(fa: WriterT<M, W, [A, (w: W) => W]>) => WriterT<M, W, A>
  readonly listens: <W, A, B>(fa: WriterT<M, W, A>, f: (w: W) => B) => WriterT<M, W, [A, B]>
  readonly censor: <W, A>(fa: WriterT<M, W, A>, f: (w: W) => W) => WriterT<M, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <A, B>(ma: WriterT<M, W, A>, f: (a: A) => B) => WriterT<M, W, B>
    readonly of: <A>(a: A) => WriterT<M, W, A>
    readonly ap: <A, B>(mab: WriterT<M, W, (a: A) => B>, ma: WriterT<M, W, A>) => WriterT<M, W, B>
    readonly chain: <A, B>(ma: WriterT<M, W, A>, f: (a: A) => WriterT<M, W, B>) => WriterT<M, W, B>
  }
}

/**
 * @since 2.4.0
 */
export interface WriterT1<M extends URIS, W, A> {
  (): Kind<M, [A, W]>
}

/**
 * @since 2.4.0
 */
export interface WriterM1<M extends URIS> {
  readonly map: <W, A, B>(fa: WriterT1<M, W, A>, f: (a: A) => B) => WriterT1<M, W, B>
  readonly evalWriter: <W, A>(fa: WriterT1<M, W, A>) => Kind<M, A>
  readonly execWriter: <W, A>(fa: WriterT1<M, W, A>) => Kind<M, W>
  readonly tell: <W>(w: W) => WriterT1<M, W, void>
  readonly listen: <W, A>(fa: WriterT1<M, W, A>) => WriterT1<M, W, [A, W]>
  readonly pass: <W, A>(fa: WriterT1<M, W, [A, (w: W) => W]>) => WriterT1<M, W, A>
  readonly listens: <W, A, B>(fa: WriterT1<M, W, A>, f: (w: W) => B) => WriterT1<M, W, [A, B]>
  readonly censor: <W, A>(fa: WriterT1<M, W, A>, f: (w: W) => W) => WriterT1<M, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <A, B>(ma: WriterT1<M, W, A>, f: (a: A) => B) => WriterT1<M, W, B>
    readonly of: <A>(a: A) => WriterT1<M, W, A>
    readonly ap: <A, B>(mab: WriterT1<M, W, (a: A) => B>, ma: WriterT1<M, W, A>) => WriterT1<M, W, B>
    readonly chain: <A, B>(ma: WriterT1<M, W, A>, f: (a: A) => WriterT1<M, W, B>) => WriterT1<M, W, B>
  }
}

/**
 * @since 2.4.0
 */
export interface WriterT2<M extends URIS2, E, W, A> {
  (): Kind2<M, E, [A, W]>
}

/**
 * @since 2.4.0
 */
export interface WriterM2<M extends URIS2> {
  readonly map: <E, W, A, B>(fa: WriterT2<M, E, W, A>, f: (a: A) => B) => WriterT2<M, E, W, B>
  readonly evalWriter: <E, W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, A>
  readonly execWriter: <E, W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, W>
  readonly tell: <E, W>(w: W) => WriterT2<M, E, W, void>
  readonly listen: <E, W, A>(fa: WriterT2<M, E, W, A>) => WriterT2<M, E, W, [A, W]>
  readonly pass: <E, W, A>(fa: WriterT2<M, E, W, [A, (w: W) => W]>) => WriterT2<M, E, W, A>
  readonly listens: <E, W, A, B>(fa: WriterT2<M, E, W, A>, f: (w: W) => B) => WriterT2<M, E, W, [A, B]>
  readonly censor: <E, W, A>(fa: WriterT2<M, E, W, A>, f: (w: W) => W) => WriterT2<M, E, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <E, A, B>(ma: WriterT2<M, E, W, A>, f: (a: A) => B) => WriterT2<M, E, W, B>
    readonly of: <E, A>(a: A) => WriterT2<M, E, W, A>
    readonly ap: <E, A, B>(mab: WriterT2<M, E, W, (a: A) => B>, ma: WriterT2<M, E, W, A>) => WriterT2<M, E, W, B>
    readonly chain: <E, A, B>(ma: WriterT2<M, E, W, A>, f: (a: A) => WriterT2<M, E, W, B>) => WriterT2<M, E, W, B>
  }
}

/**
 * @since 2.4.0
 */
export function getWriterM<M extends URIS2>(M: Monad2<M>): WriterM2<M>
export function getWriterM<M extends URIS>(M: Monad1<M>): WriterM1<M>
export function getWriterM<M>(M: Monad<M>): WriterM<M>
export function getWriterM<M>(M: Monad<M>): WriterM<M> {
  const map = <W, A, B>(fa: WriterT<M, W, A>, f: (a: A) => B): WriterT<M, W, B> => () =>
    M.map(fa(), ([a, w]) => [f(a), w])
  return {
    map,
    evalWriter: fa => M.map(fa(), ([a]) => a),
    execWriter: fa => M.map(fa(), ([_, w]) => w),
    tell: w => () => M.of([undefined, w]),
    listen: fa => () => M.map(fa(), ([a, w]) => [[a, w], w]),
    pass: fa => () => M.map(fa(), ([[a, f], w]) => [a, f(w)]),
    listens: (fa, f) => () => M.map(fa(), ([a, w]) => [[a, f(w)], w]),
    censor: (fa, f) => () => M.map(fa(), ([a, w]) => [a, f(w)]),
    getMonad: W => {
      return {
        _E: undefined as any,
        map,
        of: a => () => M.of([a, W.empty]),
        ap: (mab, ma) => () => M.chain(mab(), ([f, w1]) => M.map(ma(), ([a, w2]) => [f(a), W.concat(w1, w2)])),
        chain: (ma, f) => () => M.chain(ma(), ([a, w1]) => M.map(f(a)(), ([b, w2]) => [b, W.concat(w1, w2)]))
      }
    }
  }
}
