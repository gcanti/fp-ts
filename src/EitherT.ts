import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'
import { Functor } from './Functor'
import { Chain } from './Chain'
import { Monad } from './Monad'
import {
  getApplicativeComposition,
  ApplicativeComposition,
  ApplicativeComposition12,
  ApplicativeComposition22
} from './Applicative'
import { Either, URI as URIEither } from './Either'
import * as either from './Either'
import { Option } from './Option'
import { Applicative } from './Applicative'

export interface EitherT<F> extends ApplicativeComposition<F, URIEither> {
  chain<L, A, B>(f: (a: A) => HKT<F, Either<L, B>>, fa: HKT<F, Either<L, A>>): HKT<F, Either<L, B>>
}

export interface EitherT1<F extends HKTS> extends ApplicativeComposition12<F, URIEither> {
  chain<L, A, B>(f: (a: A) => URI2HKT<Either<L, B>>[F], fa: URI2HKT<Either<L, A>>[F]): URI2HKT<Either<L, B>>[F]
}

export interface EitherT2<F extends HKT2S> extends ApplicativeComposition22<F, URIEither> {
  chain<L, M, A, B>(
    f: (a: A) => URI2HKT2<M, Either<L, B>>[F],
    fa: URI2HKT2<M, Either<L, A>>[F]
  ): URI2HKT2<M, Either<L, B>>[F]
}

export class Ops {
  chain<F extends HKT2S>(F: Chain<F>): EitherT2<F>['chain']
  chain<F extends HKTS>(F: Chain<F>): EitherT1<F>['chain']
  chain<F>(F: Chain<F>): EitherT<F>['chain']
  chain<F>(F: Chain<F>): EitherT<F>['chain'] {
    return (f, fa) => F.chain(e => e.fold(() => fa as any, a => f(a)), fa)
  }

  right<F extends HKT2S>(F: Functor<F>): <L, M, A>(fa: URI2HKT2<M, A>[F]) => URI2HKT2<M, Either<L, A>>[F]
  right<F extends HKTS>(F: Functor<F>): <L, A>(fa: URI2HKT<A>[F]) => URI2HKT<Either<L, A>>[F]
  right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
  right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>> {
    return ma => F.map(a => either.right(a), ma)
  }

  left<F extends HKT2S>(F: Functor<F>): <L, M, A>(fl: URI2HKT2<M, L>[F]) => URI2HKT2<M, Either<L, A>>[F]
  left<F extends HKTS>(F: Functor<F>): <L, A>(fl: URI2HKT<L>[F]) => URI2HKT<Either<L, A>>[F]
  left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
  left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>> {
    return ml => F.map(l => either.left(l), ml)
  }

  fromEither<F extends HKT2S>(F: Applicative<F>): <L, M, A>(fa: Either<L, A>) => URI2HKT2<M, Either<L, A>>[F]
  fromEither<F extends HKTS>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => URI2HKT<Either<L, A>>[F]
  fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
  fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>> {
    return oa => F.of(oa)
  }

  fold<F extends HKT2S>(
    F: Functor<F>
  ): <R, L, M, A>(left: (l: L) => R, right: (a: A) => R, fa: URI2HKT2<M, Either<L, A>>[F]) => URI2HKT2<M, R>[F]
  fold<F extends HKTS>(
    F: Functor<F>
  ): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: URI2HKT<Either<L, A>>[F]) => URI2HKT<R>[F]
  fold<F>(F: Functor<F>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
  fold<F>(F: Functor<F>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R> {
    return (left, right, fa) => F.map(e => e.fold(left, right), fa)
  }

  mapLeft<F extends HKT2S>(
    F: Functor<F>
  ): <N, L, M, A>(f: (l: L) => N, fa: URI2HKT2<M, Either<L, A>>[F]) => URI2HKT2<M, Either<N, A>>[F]
  mapLeft<F extends HKTS>(
    F: Functor<F>
  ): <N, L, A>(f: (l: L) => N, fa: URI2HKT<Either<L, A>>[F]) => URI2HKT<Either<N, A>>[F]
  mapLeft<F>(F: Functor<F>): <N, L, A>(f: (l: L) => N, fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
  mapLeft<F>(F: Functor<F>): <N, L, A>(f: (l: L) => N, fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>> {
    return (f, fa) => F.map(e => e.mapLeft(f), fa)
  }

  toOption<F extends HKT2S>(F: Functor<F>): <L, M, A>(fa: URI2HKT2<M, Either<L, A>>[F]) => URI2HKT2<M, Option<A>>[F]
  toOption<F extends HKTS>(F: Functor<F>): <L, A>(fa: URI2HKT<Either<L, A>>[F]) => URI2HKT<Option<A>>[F]
  toOption<F>(F: Functor<F>): <L, A>(fa: HKT<F, Either<L, A>>) => HKT<F, Option<A>>
  toOption<F>(F: Functor<F>): <L, A>(fa: HKT<F, Either<L, A>>) => HKT<F, Option<A>> {
    return fa => F.map(e => e.toOption(), fa)
  }

  getEitherT<M extends HKT2S>(M: Monad<M>): EitherT2<M>
  getEitherT<M extends HKTS>(M: Monad<M>): EitherT1<M>
  getEitherT<M>(M: Monad<M>): EitherT<M>
  getEitherT<M>(M: Monad<M>): EitherT<M> {
    const applicativeComposition = getApplicativeComposition(M, either)

    return {
      ...applicativeComposition,
      chain: this.chain(M)
    }
  }
}

const ops = new Ops()
export const chain: Ops['chain'] = ops.chain
export const right: Ops['right'] = ops.right
export const left: Ops['left'] = ops.left
export const fromEither: Ops['fromEither'] = ops.fromEither
export const fold: Ops['fold'] = ops.fold
export const mapLeft: Ops['mapLeft'] = ops.mapLeft
export const toOption: Ops['toOption'] = ops.toOption
export const getEitherT: Ops['getEitherT'] = ops.getEitherT
