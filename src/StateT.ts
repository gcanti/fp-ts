/**
 * @since 3.0.0
 */
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C } from './Chain'
import { flow, pipe } from './function'
import type { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import type { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import type { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C } from './Pointed'
import type { State } from './State'
import { snd } from './Tuple2'

/**
 * @since 3.0.0
 */
export interface StateT<M, S, A> {
  (s: S): HKT<M, readonly [A, S]>
}

/**
 * @since 3.0.0
 */
export interface StateT1<M extends URIS, S, A> {
  (s: S): Kind<M, readonly [A, S]>
}

/**
 * @since 3.0.0
 */
export interface StateT2<M extends URIS2, S, E, A> {
  (s: S): Kind2<M, E, readonly [A, S]>
}

/**
 * @since 3.0.0
 */
export interface StateT3<M extends URIS3, S, R, E, A> {
  (s: S): Kind3<M, R, E, readonly [A, S]>
}

/**
 * @since 3.0.0
 */
export function of<F extends URIS3>(F: Pointed3<F>): <A, S, R, E>(a: A) => StateT3<F, S, R, E, A>
export function of<F extends URIS3, E>(F: Pointed3C<F, E>): <A, S, R>(a: A) => StateT3<F, S, R, E, A>
export function of<F extends URIS2>(F: Pointed2<F>): <A, S, E>(a: A) => StateT2<F, S, E, A>
export function of<F extends URIS2, E>(F: Pointed2C<F, E>): <A, S>(a: A) => StateT2<F, S, E, A>
export function of<F extends URIS>(F: Pointed1<F>): <A, S>(a: A) => StateT1<F, S, A>
export function of<F>(F: Pointed<F>): <A, S>(a: A) => StateT<F, S, A>
export function of<F>(F: Pointed<F>): <A, S>(a: A) => StateT<F, S, A> {
  return (a) => (s) => F.of([a, s])
}

/**
 * @since 3.0.0
 */
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export function map<F extends URIS3, E>(
  F: Functor3C<F, E>
): <A, B>(f: (a: A) => B) => <S, R>(fa: StateT3<F, S, R, E, A>) => StateT3<F, S, R, E, B>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <S, E>(fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export function map<F extends URIS2, E>(
  F: Functor2C<F, E>
): <A, B>(f: (a: A) => B) => <S>(fa: StateT2<F, S, E, A>) => StateT2<F, S, E, B>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <S>(fa: StateT1<F, S, A>) => StateT1<F, S, B>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <S>(fa: StateT<F, S, A>) => StateT<F, S, B>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <S>(fa: StateT<F, S, A>) => StateT<F, S, B> {
  return (f) => (fa) =>
    flow(
      fa,
      F.map(([a, s1]) => [f(a), s1])
    )
}

/**
 * @since 3.0.0
 */
export function ap<M extends URIS3>(
  M: Chain3<M>
): <S, R, E, A>(fa: StateT3<M, S, R, E, A>) => <B>(fab: StateT3<M, S, R, E, (a: A) => B>) => StateT3<M, S, R, E, B>
export function ap<M extends URIS3, E>(
  M: Chain3C<M, E>
): <S, R, A>(fa: StateT3<M, S, R, E, A>) => <B>(fab: StateT3<M, S, R, E, (a: A) => B>) => StateT3<M, S, R, E, B>
export function ap<M extends URIS2>(
  M: Chain2<M>
): <S, E, A>(fa: StateT2<M, S, E, A>) => <B>(fab: StateT2<M, S, E, (a: A) => B>) => StateT2<M, S, E, B>
export function ap<M extends URIS2, E>(
  M: Chain2C<M, E>
): <S, A>(fa: StateT2<M, S, E, A>) => <B>(fab: StateT2<M, S, E, (a: A) => B>) => StateT2<M, S, E, B>
export function ap<M extends URIS>(
  M: Chain1<M>
): <S, A>(fa: StateT1<M, S, A>) => <B>(fab: StateT1<M, S, (a: A) => B>) => StateT1<M, S, B>
export function ap<M>(
  M: Chain<M>
): <S, A>(fa: StateT<M, S, A>) => <B>(fab: StateT<M, S, (a: A) => B>) => StateT<M, S, B>
export function ap<M>(
  M: Chain<M>
): <S, A>(fa: StateT<M, S, A>) => <B>(fab: StateT<M, S, (a: A) => B>) => StateT<M, S, B> {
  return (fa) => (fab) => (s) =>
    pipe(
      fab(s),
      M.chain(([f, s]) =>
        pipe(
          fa(s),
          M.map(([a, s]) => [f(a), s])
        )
      )
    )
}

/**
 * @since 3.0.0
 */
export function chain<M extends URIS3>(
  M: Chain3<M>
): <A, S, R, E, B>(f: (a: A) => StateT3<M, S, R, E, B>) => (ma: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
export function chain<M extends URIS3, E>(
  M: Chain3C<M, E>
): <A, S, R, B>(f: (a: A) => StateT3<M, S, R, E, B>) => (ma: StateT3<M, S, R, E, A>) => StateT3<M, S, R, E, B>
export function chain<M extends URIS2>(
  M: Chain2<M>
): <A, S, E, B>(f: (a: A) => StateT2<M, S, E, B>) => (ma: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
export function chain<M extends URIS2, E>(
  M: Chain2C<M, E>
): <A, S, B>(f: (a: A) => StateT2<M, S, E, B>) => (ma: StateT2<M, S, E, A>) => StateT2<M, S, E, B>
export function chain<M extends URIS>(
  M: Chain1<M>
): <A, S, B>(f: (a: A) => StateT1<M, S, B>) => (ma: StateT1<M, S, A>) => StateT1<M, S, B>
export function chain<M>(
  M: Chain<M>
): <A, S, B>(f: (a: A) => StateT<M, S, B>) => (ma: StateT<M, S, A>) => StateT<M, S, B>
export function chain<M>(
  M: Chain<M>
): <A, S, B>(f: (a: A) => StateT<M, S, B>) => (ma: StateT<M, S, A>) => StateT<M, S, B> {
  return (f) => (ma) => (s) =>
    pipe(
      ma(s),
      M.chain(([a, s1]) => f(a)(s1))
    )
}

/**
 * @since 3.0.0
 */
export function fromState<F extends URIS3>(F: Pointed3<F>): <S, A, R, E>(sa: State<S, A>) => StateT3<F, S, R, E, A>
export function fromState<F extends URIS3, E>(F: Pointed3C<F, E>): <S, A, R>(sa: State<S, A>) => StateT3<F, S, R, E, A>
export function fromState<F extends URIS2>(F: Pointed2<F>): <S, A, E>(sa: State<S, A>) => StateT2<F, S, E, A>
export function fromState<F extends URIS2, E>(F: Pointed2C<F, E>): <S, A>(sa: State<S, A>) => StateT2<F, S, E, A>
export function fromState<F extends URIS>(F: Pointed1<F>): <S, A>(sa: State<S, A>) => StateT1<F, S, A>
export function fromState<F>(F: Pointed<F>): <S, A>(sa: State<S, A>) => StateT<F, S, A>
export function fromState<F>(F: Pointed<F>): <S, A>(sa: State<S, A>) => StateT<F, S, A> {
  return (sa) => (s) => F.of(sa(s))
}

/**
 * @since 3.0.0
 */
export function fromF<F extends URIS3>(F: Functor3<F>): <R, E, A, S>(ma: Kind3<F, R, E, A>) => StateT3<F, S, R, E, A>
export function fromF<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, A, S>(ma: Kind3<F, R, E, A>) => StateT3<F, S, R, E, A>
export function fromF<F extends URIS2>(F: Functor2<F>): <E, A, S>(ma: Kind2<F, E, A>) => StateT2<F, S, E, A>
export function fromF<F extends URIS2, E>(F: Functor2C<F, E>): <A, S>(ma: Kind2<F, E, A>) => StateT2<F, S, E, A>
export function fromF<F extends URIS>(F: Functor1<F>): <A, S>(ma: Kind<F, A>) => StateT1<F, S, A>
export function fromF<F>(F: Functor<F>): <A, S>(ma: HKT<F, A>) => StateT<F, S, A>
export function fromF<F>(F: Functor<F>): <A, S>(ma: HKT<F, A>) => StateT<F, S, A> {
  return (ma) => (s) =>
    pipe(
      ma,
      F.map((a) => [a, s])
    )
}

/**
 * @since 3.0.0
 */
export function evaluate<F extends URIS3>(
  F: Functor3<F>
): <S>(s: S) => <R, E, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, A>
export function evaluate<F extends URIS3, E>(
  F: Functor3C<F, E>
): <S>(s: S) => <R, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, A>
export function evaluate<F extends URIS2>(
  F: Functor2<F>
): <S>(s: S) => <E, A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, A>
export function evaluate<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(s: S) => <A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, A>
export function evaluate<F extends URIS>(F: Functor1<F>): <S>(s: S) => <A>(ma: StateT1<F, S, A>) => Kind<F, A>
export function evaluate<F>(F: Functor<F>): <S>(s: S) => <A>(ma: StateT<F, S, A>) => HKT<F, A>
export function evaluate<F>(F: Functor<F>): <S>(s: S) => <A>(ma: StateT<F, S, A>) => HKT<F, A> {
  return (s) => (ma) =>
    pipe(
      ma(s),
      F.map(([a]) => a)
    )
}

/**
 * @since 3.0.0
 */
export function execute<F extends URIS3>(
  F: Functor3<F>
): <S>(s: S) => <R, E, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, S>
export function execute<F extends URIS3, E>(
  F: Functor3C<F, E>
): <S>(s: S) => <R, A>(ma: StateT3<F, S, R, E, A>) => Kind3<F, R, E, S>
export function execute<F extends URIS2>(F: Functor2<F>): <S>(s: S) => <E, A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, S>
export function execute<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(s: S) => <A>(ma: StateT2<F, S, E, A>) => Kind2<F, E, S>
export function execute<F extends URIS>(F: Functor1<F>): <S>(s: S) => <A>(ma: StateT1<F, S, A>) => Kind<F, S>
export function execute<F>(F: Functor<F>): <S>(s: S) => <A>(ma: StateT<F, S, A>) => HKT<F, S>
export function execute<F>(F: Functor<F>): <S>(s: S) => <A>(ma: StateT<F, S, A>) => HKT<F, S> {
  return (s) => (ma) => pipe(ma(s), F.map(snd))
}
