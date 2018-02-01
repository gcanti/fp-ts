import { HKT, HKT2, URIS, URIS2, Type, Type2 } from './HKT'
import { Functor, Functor1, Functor2 } from './Functor'
import { Monad, Monad1, Monad2 } from './Monad'
import {
  Applicative,
  Applicative1,
  Applicative2,
  getApplicativeComposition,
  ApplicativeComposition,
  ApplicativeComposition12,
  ApplicativeComposition22
} from './Applicative'
import { Either, URI as URIEither } from './Either'
import * as either from './Either'

export interface EitherT<F> extends ApplicativeComposition<F, URIEither> {
  chain<L, A, B>(f: (a: A) => HKT<F, Either<L, B>>, fa: HKT<F, Either<L, A>>): HKT<F, Either<L, B>>
}

export interface EitherT1<F extends URIS> extends ApplicativeComposition12<F, URIEither> {
  chain<L, A, B>(f: (a: A) => HKT<F, Either<L, B>>, fa: HKT<F, Either<L, A>>): Type<F, Either<L, B>>
}

export interface EitherT2<F extends URIS2> extends ApplicativeComposition22<F, URIEither> {
  chain<L, M, A, B>(f: (a: A) => HKT2<F, M, Either<L, B>>, fa: HKT2<F, M, Either<L, A>>): Type2<F, M, Either<L, B>>
}

export function chain<F extends URIS2>(F: Monad<F>): EitherT2<F>['chain']
export function chain<F extends URIS>(F: Monad<F>): EitherT1<F>['chain']
export function chain<F>(F: Monad<F>): EitherT<F>['chain']
export function chain<F>(F: Monad<F>): EitherT<F>['chain'] {
  return (f, fa) => F.chain(fa, e => e.fold(l => F.of(either.left(l)), a => f(a)))
}

export function right<F extends URIS2>(F: Functor2<F>): <L, M, A>(fa: HKT2<F, M, A>) => Type2<F, M, Either<L, A>>
export function right<F extends URIS>(F: Functor1<F>): <L, A>(fa: HKT<F, A>) => Type<F, Either<L, A>>
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>> {
  return ma => F.map(ma, a => either.right(a))
}

export function left<F extends URIS2>(F: Functor2<F>): <L, M, A>(fl: HKT2<F, M, L>) => Type2<F, M, Either<L, A>>
export function left<F extends URIS>(F: Functor1<F>): <L, A>(fl: HKT<F, L>) => Type<F, Either<L, A>>
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>> {
  return ml => F.map(ml, l => either.left(l))
}

export function fromEither<F extends URIS2>(
  F: Applicative2<F>
): <L, M, A>(fa: Either<L, A>) => Type2<F, M, Either<L, A>>
export function fromEither<F extends URIS>(F: Applicative1<F>): <L, A>(fa: Either<L, A>) => Type<F, Either<L, A>>
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>> {
  return oa => F.of(oa)
}

export function fold<F extends URIS2>(
  F: Functor2<F>
): <R, L, M, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT2<F, M, Either<L, A>>) => Type2<F, M, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => Type<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R> {
  return (left, right, fa) => F.map(fa, e => e.fold(left, right))
}

export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <N, L, M>(f: (l: L) => N) => <A>(fa: HKT2<F, M, Either<L, A>>) => Type2<F, M, Either<N, A>>
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => Type<F, Either<N, A>>
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>> {
  return f => fa => F.map(fa, e => e.mapLeft(f))
}

export function getEitherT<M extends URIS2>(M: Monad2<M>): EitherT2<M>
export function getEitherT<M extends URIS>(M: Monad1<M>): EitherT1<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M> {
  const applicativeComposition = getApplicativeComposition(M, either.either)

  return {
    ...applicativeComposition,
    chain: chain(M)
  }
}
