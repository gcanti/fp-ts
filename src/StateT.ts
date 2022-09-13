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
export function ap<F extends HKT>(
  F: Chain<F>
): <FS, FR, FW, FE, S, A>(
  fa: StateT<F, FS, FR, FW, FE, S, A>
) => <B>(fab: StateT<F, FS, FR, FW, FE, S, (a: A) => B>) => StateT<F, FS, FR, FW, FE, S, B> {
  return (fa) => (fab) => (s) =>
    pipe(
      fab(s),
      F.chain(([f, s]) =>
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
