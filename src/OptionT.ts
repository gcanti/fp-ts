import {
  ApplicativeComposition,
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeComposition3C1,
  getApplicativeComposition
} from './Applicative'
import { Functor, Functor1, Functor2, Functor2C, Functor3C } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3C } from './Monad'
import { none as optionNone, Option, option, URI } from './Option'

export interface OptionT<M> extends ApplicativeComposition<M, URI> {
  readonly chain: <A, B>(fa: HKT<M, Option<A>>, f: (a: A) => HKT<M, Option<B>>) => HKT<M, Option<B>>
}

export interface OptionT1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(fa: Type<M, Option<A>>, f: (a: A) => Type<M, Option<B>>) => Type<M, Option<B>>
}

export interface OptionT2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(fa: Type2<M, L, Option<A>>, f: (a: A) => Type2<M, L, Option<B>>) => Type2<M, L, Option<B>>
}

export interface OptionT2C<M extends URIS2, L> extends ApplicativeComposition2C1<M, URI, L> {
  readonly chain: <A, B>(fa: Type2<M, L, Option<A>>, f: (a: A) => Type2<M, L, Option<B>>) => Type2<M, L, Option<B>>
}

export interface OptionT3C<M extends URIS3, U, L> extends ApplicativeComposition3C1<M, URI, U, L> {
  readonly chain: <A, B>(
    fa: Type3<M, U, L, Option<A>>,
    f: (a: A) => Type3<M, U, L, Option<B>>
  ) => Type3<M, U, L, Option<B>>
}

/**
 * @since 1.0.0
 */
export function fold<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <R, A>(onNone: R, onSome: (a: A) => R, fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, R>
export function fold<F extends URIS2>(
  F: Functor2<F>
): <L, R, A>(onNone: R, onSome: (a: A) => R, fa: Type2<F, L, Option<A>>) => Type2<F, L, R>
export function fold<F extends URIS2, L>(
  F: Functor2C<F, L>
): <R, A>(onNone: R, onSome: (a: A) => R, fa: Type2<F, L, Option<A>>) => Type2<F, L, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, A>(onNone: R, onSome: (a: A) => R, fa: Type<F, Option<A>>) => Type<F, R>
export function fold<F>(F: Functor<F>): <R, A>(onNone: R, onSome: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
export function fold<F>(F: Functor<F>): <R, A>(onNone: R, onSome: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> {
  return (onNone, onSome, fa) => F.map(fa, o => (o.isNone() ? onNone : onSome(o.value)))
}

/**
 * @since 1.14.0
 */
export function getOptionT<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionT3C<M, U, L>
export function getOptionT<M extends URIS2>(M: Monad2<M>): OptionT2<M>
export function getOptionT<M extends URIS2, L>(M: Monad2C<M, L>): OptionT2C<M, L>
export function getOptionT<M extends URIS>(M: Monad1<M>): OptionT1<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M> {
  const applicativeComposition = getApplicativeComposition(M, option)

  return {
    ...applicativeComposition,
    chain: (fa, f) => M.chain(fa, o => (o.isNone() ? M.of(optionNone) : f(o.value)))
  }
}
