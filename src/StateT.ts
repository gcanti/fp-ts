/**
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { flow, pipe } from './function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind } from './HKT'
import type { Pointed } from './Pointed'
import type { State } from './State'
import * as writer from './Writer'

/**
 * @since 3.0.0
 */
export interface StateT<F extends TypeLambda, FS, FR, FW, FE, S, A> {
  (s: S): Kind<F, FS, FR, FW, FE, readonly [S, A]>
}

/**
 * @since 3.0.0
 */
export function of<F extends TypeLambda>(
  F: Pointed<F>
): <A, FS, FR, FW, FE, S>(a: A) => StateT<F, FS, FR, FW, FE, S, A> {
  return (a) => (s) => F.of([s, a])
}

/**
 * @since 3.0.0
 */
export function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <FS, FR, FW, FE, S>(fa: StateT<F, FS, FR, FW, FE, S, A>) => StateT<F, FS, FR, FW, FE, S, B> {
  return (f) => (fa) =>
    flow(
      fa,
      F.map(([s1, a]) => [s1, f(a)])
    )
}

/**
 * @since 3.0.0
 */
export const ap =
  <F extends TypeLambda>(F: Flattenable<F>) =>
  <FS, FR2, FW2, FE2, S, A>(fa: StateT<F, FS, FR2, FW2, FE2, S, A>) =>
  <FR1, FW1, FE1, B>(
    fab: StateT<F, FS, FR1, FW1, FE1, S, (a: A) => B>
  ): StateT<F, FS, FR1 & FR2, FW1 | FW2, FE1 | FE2, S, B> => {
    return (s) =>
      pipe(
        fab(s),
        F.flatMap(([s1, f]) =>
          pipe(
            fa(s1),
            F.map(([s2, a]) => [s2, f(a)])
          )
        )
      )
  }

/**
 * @since 3.0.0
 */
export const flatMap =
  <F extends TypeLambda>(F: Flattenable<F>) =>
  <A, FS, FR2, FW2, FE2, S, B>(f: (a: A) => StateT<F, FS, FR2, FW2, FE2, S, B>) =>
  <FR1, FW1, FE1>(ma: StateT<F, FS, FR1, FW1, FE1, S, A>): StateT<F, FS, FR1 & FR2, FW1 | FW2, FE1 | FE2, S, B> => {
    return (s) =>
      pipe(
        ma(s),
        F.flatMap(([s1, a]) => f(a)(s1))
      )
  }

/**
 * @since 3.0.0
 */
export function fromState<F extends TypeLambda>(
  F: Pointed<F>
): <S, A, FS, FR, FW, FE>(sa: State<S, A>) => StateT<F, FS, FR, FW, FE, S, A> {
  return (sa) => (s) => F.of(sa(s))
}

/**
 * @since 3.0.0
 */
export function fromF<F extends TypeLambda>(
  F: Functor<F>
): <FS, FR, FW, FE, A, S>(self: Kind<F, FS, FR, FW, FE, A>) => StateT<F, FS, FR, FW, FE, S, A> {
  return (self) => (s) =>
    pipe(
      self,
      F.map((a) => [s, a])
    )
}

/**
 * @since 3.0.0
 */
export function evaluate<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, A> {
  return (s) => (ma) => pipe(ma(s), F.map(writer.snd))
}

/**
 * @since 3.0.0
 */
export function execute<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, S> {
  return (s) => (ma) => pipe(ma(s), F.map(writer.fst))
}
