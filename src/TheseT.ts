/**
 * @since 2.4.0
 */
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'
import { Semigroup } from './Semigroup'
import { bimap, both, fold, left, map, mapLeft, right, swap, These, toTuple } from './These'

// TODO: remove module in v3

/**
 * @category model
 * @since 2.4.0
 */
export interface TheseT<M, E, A> extends HKT<M, These<E, A>> {}

/**
 * @since 2.4.0
 */
export interface TheseM<M> {
  readonly map: <E, A, B>(fa: TheseT<M, E, A>, f: (a: A) => B) => TheseT<M, E, B>
  readonly bimap: <E, A, N, B>(fa: TheseT<M, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT<M, N, B>
  readonly mapLeft: <E, A, N>(fa: TheseT<M, E, A>, f: (e: E) => N) => TheseT<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT<M, E, A>,
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>,
    onBoth: (e: E, a: A) => HKT<M, R>
  ) => HKT<M, R>
  readonly swap: <E, A>(fa: TheseT<M, E, A>) => TheseT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => TheseT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => TheseT<M, E, A>
  readonly left: <E, A>(e: E) => TheseT<M, E, A>
  readonly right: <E, A>(a: A) => TheseT<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT<M, E, A>, e: E, a: A) => HKT<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(ma: TheseT<M, E, A>, f: (a: A) => B) => TheseT<M, E, B>
    readonly of: <A>(a: A) => TheseT<M, E, A>
    readonly ap: <A, B>(mab: TheseT<M, E, (a: A) => B>, ma: TheseT<M, E, A>) => TheseT<M, E, B>
    readonly chain: <A, B>(ma: TheseT<M, E, A>, f: (a: A) => TheseT<M, E, B>) => TheseT<M, E, B>
  }
}

/**
 * @category model
 * @since 2.4.0
 */
export type TheseT1<M extends URIS, E, A> = Kind<M, These<E, A>>

/**
 * @since 2.4.0
 */
export interface TheseM1<M extends URIS> {
  readonly map: <E, A, B>(fa: TheseT1<M, E, A>, f: (a: A) => B) => TheseT1<M, E, B>
  readonly bimap: <E, A, N, B>(fa: TheseT1<M, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT1<M, N, B>
  readonly mapLeft: <E, A, N>(fa: TheseT1<M, E, A>, f: (e: E) => N) => TheseT1<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT1<M, E, A>,
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>,
    onBoth: (e: E, a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly swap: <E, A>(fa: TheseT1<M, E, A>) => TheseT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => TheseT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => TheseT1<M, E, A>
  readonly left: <E, A>(e: E) => TheseT1<M, E, A>
  readonly right: <E, A>(a: A) => TheseT1<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT1<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT1<M, E, A>, e: E, a: A) => Kind<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(ma: TheseT1<M, E, A>, f: (a: A) => B) => TheseT1<M, E, B>
    readonly of: <A>(a: A) => TheseT1<M, E, A>
    readonly ap: <A, B>(mab: TheseT1<M, E, (a: A) => B>, ma: TheseT1<M, E, A>) => TheseT1<M, E, B>
    readonly chain: <A, B>(ma: TheseT1<M, E, A>, f: (a: A) => TheseT1<M, E, B>) => TheseT1<M, E, B>
  }
}

/**
 * @category model
 * @since 2.4.0
 */
export type TheseT2<M extends URIS2, R, E, A> = Kind2<M, R, These<E, A>>

/**
 * @since 2.4.0
 */
export interface TheseM2<M extends URIS2> {
  readonly map: <R, E, A, B>(fa: TheseT2<M, R, E, A>, f: (a: A) => B) => TheseT2<M, R, E, B>
  readonly bimap: <R, E, A, N, B>(fa: TheseT2<M, R, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT2<M, R, N, B>
  readonly mapLeft: <R, E, A, N>(fa: TheseT2<M, R, E, A>, f: (e: E) => N) => TheseT2<M, R, N, A>
  readonly fold: <R, E, A, B>(
    fa: TheseT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>,
    onBoth: (e: E, a: A) => Kind2<M, R, B>
  ) => Kind2<M, R, B>
  readonly swap: <R, E, A>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => TheseT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => TheseT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => TheseT2<M, R, E, A>
  readonly right: <R, E, A>(a: A) => TheseT2<M, R, E, A>
  readonly both: <R, E, A>(e: E, a: A) => TheseT2<M, R, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <R, E, A>(fa: TheseT2<M, R, E, A>, e: E, a: A) => Kind2<M, R, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <R, A, B>(ma: TheseT2<M, R, E, A>, f: (a: A) => B) => TheseT2<M, R, E, B>
    readonly of: <R, A>(a: A) => TheseT2<M, R, E, A>
    readonly ap: <R, A, B>(mab: TheseT2<M, R, E, (a: A) => B>, ma: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
    readonly chain: <R, A, B>(ma: TheseT2<M, R, E, A>, f: (a: A) => TheseT2<M, R, E, B>) => TheseT2<M, R, E, B>
  }
}

/**
 * @since 2.4.0
 */
export function getTheseM<M extends URIS2>(M: Monad2<M>): TheseM2<M>
export function getTheseM<M extends URIS>(M: Monad1<M>): TheseM1<M>
export function getTheseM<M>(M: Monad<M>): TheseM<M>
export function getTheseM<M>(M: Monad<M>): TheseM<M> {
  function mapT<E, A, B>(fa: TheseT<M, E, A>, f: (a: A) => B): TheseT<M, E, B> {
    return M.map(fa, map(f))
  }

  function of<E, A>(a: A): TheseT<M, E, A> {
    return M.of(right(a))
  }

  function leftT<E = never, A = never>(e: E): TheseT<M, E, A> {
    return M.of(left(e))
  }

  return {
    map: mapT,
    bimap: (fa, f, g) => M.map(fa, bimap(f, g)),
    mapLeft: (fa, f) => M.map(fa, mapLeft(f)),
    fold: (fa, onLeft, onRight, onBoth) => M.chain(fa, fold(onLeft, onRight, onBoth)),
    swap: (fa) => M.map(fa, swap),
    rightM: (ma) => M.map(ma, right),
    leftM: (me) => M.map(me, left),
    left: leftT,
    right: of,
    both: (e, a) => M.of(both(e, a)),
    toTuple: (fa, e, a) => M.map(fa, toTuple(e, a)),
    getMonad: <E>(E: Semigroup<E>) => {
      function chain<A, B>(fa: TheseT<M, E, A>, f: (a: A) => TheseT<M, E, B>): TheseT<M, E, B> {
        return M.chain(
          fa,
          fold(leftT, f, (e1, a) =>
            M.map(
              f(a),
              fold(
                (e2) => left(E.concat(e1, e2)),
                (b) => both(e1, b),
                (e2, b) => both(E.concat(e1, e2), b)
              )
            )
          )
        )
      }

      return {
        _E: undefined as any,
        map: mapT,
        of,
        ap: <A, B>(mab: TheseT<M, E, (a: A) => B>, ma: TheseT<M, E, A>): TheseT<M, E, B> =>
          chain(mab, (f) => mapT(ma, f)),
        chain
      }
    }
  }
}
