/**
 * @since 2.10.0
 */
import { pipe } from './function'
import { Functor3, Functor4 } from './Functor'
import { HKT3, Kind3, Kind4, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxApply4<F extends URIS4> extends Functor4<F> {
  readonly iap: <O, Z, E, A>(
    fa: Kind4<F, O, Z, E, A>
  ) => <I, B>(fab: Kind4<F, I, O, E, (a: A) => B>) => Kind4<F, I, Z, E, B>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxApply3<F extends URIS3> extends Functor3<F> {
  readonly iap: <O, Z, A>(fa: Kind3<F, O, Z, A>) => <I, B>(fab: Kind3<F, I, O, (a: A) => B>) => Kind3<F, I, Z, B>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxApply<F> {
  readonly URI: F
  readonly map: <I, O, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => B) => HKT3<F, I, O, B>
  readonly iap: <O, Z, A>(fa: HKT3<F, O, Z, A>) => <I, B>(fab: HKT3<F, I, O, (a: A) => B>) => HKT3<F, I, Z, B>
}

/**
 * @category Combinators
 * @since 2.10.0
 */
export function iapFirst<F extends URIS4>(
  F: IxApply4<F>
): <O, Z, E, B>(second: Kind4<F, O, Z, E, B>) => <I, A>(first: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, A>
export function iapFirst<F extends URIS3>(
  F: IxApply3<F>
): <O, Z, B>(second: Kind3<F, O, Z, B>) => <I, A>(first: Kind3<F, I, O, A>) => Kind3<F, I, Z, A>
export function iapFirst<F>(
  F: IxApply<F>
): <O, Z, B>(second: HKT3<F, O, Z, B>) => <I, A>(first: HKT3<F, I, O, A>) => HKT3<F, I, Z, A>
export function iapFirst<F>(
  F: IxApply<F>
): <O, Z, B>(second: HKT3<F, O, Z, B>) => <I, A>(first: HKT3<F, I, O, A>) => HKT3<F, I, Z, A> {
  return (second) => (first) =>
    pipe(
      F.map(first, (a) => () => a),
      F.iap(second)
    )
}

/**
 * @category Combinators
 * @since 2.10.0
 */
export function iapSecond<F extends URIS4>(
  F: IxApply4<F>
): <O, Z, E, B>(second: Kind4<F, O, Z, E, B>) => <I, A>(first: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, B>
export function iapSecond<F extends URIS3>(
  F: IxApply3<F>
): <O, Z, B>(second: Kind3<F, O, Z, B>) => <I, A>(first: Kind3<F, I, O, A>) => Kind3<F, I, Z, B>
export function iapSecond<F>(
  F: IxApply<F>
): <O, Z, B>(second: HKT3<F, O, Z, B>) => <I, A>(first: HKT3<F, I, O, A>) => HKT3<F, I, Z, B>
export function iapSecond<F>(F: IxApply<F>) {
  return <O, Z, B>(second: HKT3<F, O, Z, B>) => <I, A>(first: HKT3<F, I, O, A>): HKT3<F, I, Z, B> =>
    pipe(
      F.map(first, () => (b: B) => b),
      F.iap(second)
    )
}
