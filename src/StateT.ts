/**
 * @since 3.0.0
 */
import type { Chain } from './Chain'
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'
import type { Pointed } from './Pointed'
import type { State } from './State'
import { snd } from './Writer'

/**
 * @since 3.0.0
 */
export interface StateT<F extends HKT, FS, FR, FW, FE, S, A> {
  (s: S): Kind<F, FS, FR, FW, FE, readonly [A, S]>
}

/**
 * @since 3.0.0
 */
export function of<F extends HKT>(F: Pointed<F>): <A, FS, FR, FW, FE, S>(a: A) => StateT<F, FS, FR, FW, FE, S, A> {
  return (a) => (s) => F.of([a, s])
}

/**
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <FS, FR, FW, FE, S>(fa: StateT<F, FS, FR, FW, FE, S, A>) => StateT<F, FS, FR, FW, FE, S, B> {
  return (f) => (fa) =>
    flow(
      fa,
      F.map(([a, s1]) => [f(a), s1])
    )
}

/**
 * @since 3.0.0
 */
export const ap = <F extends HKT>(F: Chain<F>) => <FS, FR2, FW2, FE2, S, A>(fa: StateT<F, FS, FR2, FW2, FE2, S, A>) => <
  FR1,
  FW1,
  FE1,
  B
>(
  fab: StateT<F, FS, FR1, FW1, FE1, S, (a: A) => B>
): StateT<F, FS, FR1 & FR2, FW1 | FW2, FE1 | FE2, S, B> => {
  // TODO
  const chain: <A, S, R2, W2, E2, B>(
    f: (a: A) => Kind<F, S, R2, W2, E2, B>
  ) => <R1, W1, E1>(ma: Kind<F, S, R1, W1, E1, A>) => Kind<F, S, R1 & R2, W1 | W2, E1 | E2, B> = F.chain as any
  return (s) =>
    pipe(
      fab(s),
      chain(([f, s]) =>
        pipe(
          fa(s),
          F.map(([a, s]) => [f(a), s])
        )
      )
    )
}

/**
 * @since 3.0.0
 */
export function chain<F extends HKT>(
  F: Chain<F>
): <A, FS, FR, FW, FE, S, B>(
  f: (a: A) => StateT<F, FS, FR, FW, FE, S, B>
) => (ma: StateT<F, FS, FR, FW, FE, S, A>) => StateT<F, FS, FR, FW, FE, S, B> {
  return (f) => (ma) => (s) =>
    pipe(
      ma(s),
      F.chain(([a, s1]) => f(a)(s1))
    )
}

/**
 * @since 3.0.0
 */
export function fromState<F extends HKT>(
  F: Pointed<F>
): <S, A, FS, FR, FW, FE>(sa: State<S, A>) => StateT<F, FS, FR, FW, FE, S, A> {
  return (sa) => (s) => F.of(sa(s))
}

/**
 * @since 3.0.0
 */
export function fromF<F extends HKT>(
  F: Functor<F>
): <FS, FR, FW, FE, A, S>(ma: Kind<F, FS, FR, FW, FE, A>) => StateT<F, FS, FR, FW, FE, S, A> {
  return (ma) => (s) =>
    pipe(
      ma,
      F.map((a) => [a, s])
    )
}

/**
 * @since 3.0.0
 */
export function evaluate<F extends HKT>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, A> {
  return (s) => (ma) =>
    pipe(
      ma(s),
      F.map(([a]) => a)
    )
}

/**
 * @since 3.0.0
 */
export function execute<F extends HKT>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, S> {
  return (s) => (ma) => pipe(ma(s), F.map(snd))
}
