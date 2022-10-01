/**
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind } from './HKT'
import type { Pointed } from './Pointed'
import type { State } from './State'
import * as writer from './Writer'

/**
 * @since 3.0.0
 */
export interface StateT<F extends TypeLambda, S, FS, R, O, E, A> {
  (s: S): Kind<F, FS, R, O, E, readonly [S, A]>
}

/**
 * @since 3.0.0
 */
export function of<F extends TypeLambda>(
  F: Pointed<F>
): <A, S, FS>(a: A) => StateT<F, S, FS, unknown, never, never, A> {
  return (a) => (s) => F.of([s, a])
}

/**
 * @since 3.0.0
 */
export function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, FS, R, O, E>(self: StateT<F, S, FS, R, O, E, A>) => StateT<F, S, FS, R, O, E, B> {
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
  <S, FS, R2, O2, E2, A>(fa: StateT<F, S, FS, R2, O2, E2, A>) =>
  <R1, O1, E1, B>(self: StateT<F, S, FS, R1, O1, E1, (a: A) => B>): StateT<F, S, FS, R1 & R2, O1 | O2, E1 | E2, B> => {
    return (s) =>
      pipe(
        self(s),
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
  <A, S, FS, R2, O2, E2, B>(f: (a: A) => StateT<F, S, FS, R2, O2, E2, B>) =>
  <R1, O1, E1>(self: StateT<F, S, FS, R1, O1, E1, A>): StateT<F, S, FS, R1 & R2, O1 | O2, E1 | E2, B> => {
    return (s) =>
      pipe(
        self(s),
        F.flatMap(([s1, a]) => f(a)(s1))
      )
  }

/**
 * @since 3.0.0
 */
export function fromState<F extends TypeLambda>(
  F: Pointed<F>
): <S, A, FS>(sa: State<S, A>) => StateT<F, S, FS, unknown, never, never, A> {
  return (sa) => (s) => F.of(sa(s))
}

/**
 * @since 3.0.0
 */
export function fromKind<F extends TypeLambda>(
  F: Functor<F>
): <FS, R, O, E, A, S>(self: Kind<F, FS, R, O, E, A>) => StateT<F, S, FS, R, O, E, A> {
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
): <S>(s: S) => <FS, R, O, E, A>(self: StateT<F, S, FS, R, O, E, A>) => Kind<F, FS, R, O, E, A> {
  return (s) => (ma) => pipe(ma(s), F.map(writer.snd))
}

/**
 * @since 3.0.0
 */
export function execute<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, R, O, E, A>(self: StateT<F, S, FS, R, O, E, A>) => Kind<F, FS, R, O, E, S> {
  return (s) => (ma) => pipe(ma(s), F.map(writer.fst))
}
