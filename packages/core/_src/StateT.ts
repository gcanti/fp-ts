/**
 * @since 3.0.0
 */
import type { Flattenable } from '@fp-ts/core/Flattenable'
import type { FromIdentity } from '@fp-ts/core/FromIdentity'
import { flow, pipe } from '@fp-ts/core/Function'
import type { Functor } from '@fp-ts/core/Functor'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import type { State } from '@fp-ts/core/State'
import * as writer from '@fp-ts/core/Writer'

/**
 * @since 3.0.0
 */
export interface StateT<F extends TypeLambda, S> extends TypeLambda {
  readonly type: (s: S) => Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], readonly [S, this['Out1']]>
}

/**
 * @since 3.0.0
 */
export const of = <F extends TypeLambda>(F: FromIdentity<F>) =>
  <A, S, FS>(a: A): Kind<StateT<F, S>, FS, unknown, never, never, A> => {
    return (s) => F.of([s, a])
  }

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(F: Functor<F>) =>
  <A, B>(f: (a: A) => B) =>
    <S, FS, R, O, E>(self: Kind<StateT<F, S>, FS, R, O, E, A>): Kind<StateT<F, S>, FS, R, O, E, B> => {
      return flow(
        self,
        F.map(([s1, a]) => [s1, f(a)])
      )
    }

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(F: Flattenable<F>) =>
  <S, FS, R2, O2, E2, A>(fa: Kind<StateT<F, S>, FS, R2, O2, E2, A>) =>
    <R1, O1, E1, B>(
      self: Kind<StateT<F, S>, FS, R1, O1, E1, (a: A) => B>
    ): Kind<StateT<F, S>, FS, R1 & R2, O1 | O2, E1 | E2, B> => {
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
export const flatMap = <F extends TypeLambda>(F: Flattenable<F>) =>
  <A, S, FS, R2, O2, E2, B>(f: (a: A) => Kind<StateT<F, S>, FS, R2, O2, E2, B>) =>
    <R1, O1, E1>(self: Kind<StateT<F, S>, FS, R1, O1, E1, A>): Kind<StateT<F, S>, FS, R1 & R2, O1 | O2, E1 | E2, B> => {
      return (s) =>
        pipe(
          self(s),
          F.flatMap(([s1, a]) => f(a)(s1))
        )
    }

/**
 * @since 3.0.0
 */
export const fromState = <F extends TypeLambda>(F: FromIdentity<F>) =>
  <S, A, FS>(sa: State<S, A>): Kind<StateT<F, S>, FS, unknown, never, never, A> => {
    return (s) => F.of(sa(s))
  }

/**
 * @since 3.0.0
 */
export const fromKind = <F extends TypeLambda>(F: Functor<F>) =>
  <FS, R, O, E, A, S>(self: Kind<F, FS, R, O, E, A>): Kind<StateT<F, S>, FS, R, O, E, A> => {
    return (s) =>
      pipe(
        self,
        F.map((a) => [s, a])
      )
  }

/**
 * @since 3.0.0
 */
export const evaluate = <F extends TypeLambda>(F: Functor<F>) =>
  <S>(s: S) =>
    <FS, R, O, E, A>(self: Kind<StateT<F, S>, FS, R, O, E, A>): Kind<F, FS, R, O, E, A> => {
      return pipe(self(s), F.map(writer.snd))
    }

/**
 * @since 3.0.0
 */
export const execute = <F extends TypeLambda>(F: Functor<F>) =>
  <S>(s: S) =>
    <FS, R, O, E, A>(self: Kind<StateT<F, S>, FS, R, O, E, A>): Kind<F, FS, R, O, E, S> => {
      return pipe(self(s), F.map(writer.fst))
    }
