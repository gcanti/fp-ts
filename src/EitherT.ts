import {
  ApplicativeComposition,
  ApplicativeComposition12,
  ApplicativeComposition22,
  getApplicativeComposition
} from './Applicative'
import { Either, either, left as eitherLeft, URI, isLeft } from './Either'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Type, Type2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'

export interface EitherT<F> extends ApplicativeComposition<F, URI> {
  readonly chain: <L, A, B>(fa: HKT<F, Either<L, A>>, f: (a: A) => HKT<F, Either<L, B>>) => HKT<F, Either<L, B>>
}

export interface EitherT1<F extends URIS> extends ApplicativeComposition12<F, URI> {
  readonly chain: <L, A, B>(fa: Type<F, Either<L, A>>, f: (a: A) => Type<F, Either<L, B>>) => Type<F, Either<L, B>>
}

export interface EitherT2<F extends URIS2> extends ApplicativeComposition22<F, URI> {
  readonly chain: <L, M, A, B>(
    fa: Type2<F, M, Either<L, A>>,
    f: (a: A) => Type2<F, M, Either<L, B>>
  ) => Type2<F, M, Either<L, B>>
}

/**
 * @since 1.0.0
 */
export function fold<F extends URIS2>(
  F: Functor2<F>
): <R, L, M, A>(fa: Type2<F, M, Either<L, A>>, left: (l: L) => R, right: (a: A) => R) => Type2<F, M, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, L, A>(fa: Type<F, Either<L, A>>, left: (l: L) => R, right: (a: A) => R) => Type<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(fa: HKT<F, Either<L, A>>, left: (l: L) => R, right: (a: A) => R) => HKT<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(fa: HKT<F, Either<L, A>>, left: (l: L) => R, right: (a: A) => R) => HKT<F, R> {
  return (fa, left, right) => F.map(fa, e => (isLeft(e) ? left(e.left) : right(e.right)))
}

/**
 * @since 1.14.0
 */
export function getEitherT<M extends URIS2>(M: Monad2<M>): EitherT2<M>
export function getEitherT<M extends URIS>(M: Monad1<M>): EitherT1<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M> {
  const applicativeComposition = getApplicativeComposition(M, either)

  return {
    ...applicativeComposition,
    chain: (fa, f) => M.chain(fa, e => (isLeft(e) ? M.of(eitherLeft(e.left)) : f(e.right)))
  }
}
