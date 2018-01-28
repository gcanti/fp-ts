import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor } from './Functor'
import { Monad } from './Monad'
import {
  getApplicativeComposition,
  ApplicativeComposition,
  ApplicativeComposition12,
  ApplicativeComposition22
} from './Applicative'
import { Either, URI as URIEither } from './Either'
import * as either from './Either'
import { Applicative } from './Applicative'

export interface EitherT<F> extends ApplicativeComposition<F, URIEither> {
  chain<L, A, B>(f: (a: A) => HKT<F, Either<L, B>>, fa: HKT<F, Either<L, A>>): HKT<F, Either<L, B>>
}

export interface EitherT1<F extends HKTS> extends ApplicativeComposition12<F, URIEither> {
  chain<L, A, B>(f: (a: A) => HKTAs<F, Either<L, B>>, fa: HKTAs<F, Either<L, A>>): HKTAs<F, Either<L, B>>
}

export interface EitherT2<F extends HKT2S> extends ApplicativeComposition22<F, URIEither> {
  chain<L, M, A, B>(f: (a: A) => HKT2As<F, M, Either<L, B>>, fa: HKT2As<F, M, Either<L, A>>): HKT2As<F, M, Either<L, B>>
}

export function chain<F extends HKT2S>(F: Monad<F>): EitherT2<F>['chain']
export function chain<F extends HKTS>(F: Monad<F>): EitherT1<F>['chain']
export function chain<F>(F: Monad<F>): EitherT<F>['chain']
export function chain<F>(F: Monad<F>): EitherT<F>['chain'] {
  return (f, fa) => F.chain(e => e.fold(l => F.of(either.left(l)), a => f(a)), fa)
}

export function right<F extends HKT2S>(F: Functor<F>): <L, M, A>(fa: HKT2As<F, M, A>) => HKT2As<F, M, Either<L, A>>
export function right<F extends HKTS>(F: Functor<F>): <L, A>(fa: HKTAs<F, A>) => HKTAs<F, Either<L, A>>
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>> {
  return ma => F.map(ma, a => either.right(a))
}

export function left<F extends HKT2S>(F: Functor<F>): <L, M, A>(fl: HKT2As<F, M, L>) => HKT2As<F, M, Either<L, A>>
export function left<F extends HKTS>(F: Functor<F>): <L, A>(fl: HKTAs<F, L>) => HKTAs<F, Either<L, A>>
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>> {
  return ml => F.map(ml, l => either.left(l))
}

export function fromEither<F extends HKT2S>(
  F: Applicative<F>
): <L, M, A>(fa: Either<L, A>) => HKT2As<F, M, Either<L, A>>
export function fromEither<F extends HKTS>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKTAs<F, Either<L, A>>
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>> {
  return oa => F.of(oa)
}

export function fold<F extends HKT2S>(
  F: Functor<F>
): <R, L, M, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT2As<F, M, Either<L, A>>) => HKT2As<F, M, R>
export function fold<F extends HKTS>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKTAs<F, Either<L, A>>) => HKTAs<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R> {
  return (left, right, fa) => F.map(fa, e => e.fold(left, right))
}

export function mapLeft<F extends HKT2S>(
  F: Functor<F>
): <N, L, M>(f: (l: L) => N) => <A>(fa: HKT2As<F, M, Either<L, A>>) => HKT2As<F, M, Either<N, A>>
export function mapLeft<F extends HKTS>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKTAs<F, Either<L, A>>) => HKTAs<F, Either<N, A>>
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>> {
  return f => fa => F.map(fa, e => e.mapLeft(f))
}

export function getEitherT<M extends HKT2S>(M: Monad<M>): EitherT2<M>
export function getEitherT<M extends HKTS>(M: Monad<M>): EitherT1<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M> {
  const applicativeComposition = getApplicativeComposition(M, either)

  return {
    ...applicativeComposition,
    chain: chain(M)
  }
}
