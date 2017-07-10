import { HKT } from './HKT'
import { Functor } from './Functor'
import { Chain } from './Chain'
import { Monad } from './Monad'
import { getApplicativeComposition, ApplicativeComposition } from './Applicative'
import { Either, URI as URIEither } from './Either'
import * as either from './Either'
import { Option } from './Option'
import { Applicative } from './Applicative'

export interface EitherT<M> extends ApplicativeComposition<M, URIEither> {
  chain<L, A, B>(f: (a: A) => HKT<M, Either<L, B>>, fa: HKT<M, Either<L, A>>): HKT<M, Either<L, B>>
}

export class Ops {
  chain<F>(F: Chain<F>): EitherT<F>['chain']
  chain<F>(F: Chain<F>): EitherT<F>['chain'] {
    return (f, fa) => F.chain(e => e.fold(() => fa as any, a => f(a)), fa)
  }

  right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
  right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>> {
    return ma => F.map(a => either.right(a), ma)
  }

  left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
  left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>> {
    return ml => F.map(l => either.left(l), ml)
  }

  fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
  fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>> {
    return oa => F.of(oa)
  }

  fold<F>(F: Functor<F>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
  fold<F>(F: Functor<F>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R> {
    return (left, right, fa) => F.map(e => e.fold(left, right), fa)
  }

  mapLeft<F>(F: Functor<F>): <N, L, A>(f: (l: L) => N, fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
  mapLeft<F>(F: Functor<F>): <N, L, A>(f: (l: L) => N, fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>> {
    return (f, fa) => F.map(e => e.mapLeft(f), fa)
  }

  toOption<F>(F: Functor<F>): <L, A>(fa: HKT<F, Either<L, A>>) => HKT<F, Option<A>>
  toOption<F>(F: Functor<F>): <L, A>(fa: HKT<F, Either<L, A>>) => HKT<F, Option<A>> {
    return fa => F.map(e => e.toOption(), fa)
  }

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

//
// overloadings
//

import {
  ArrayURI,
  IOURI,
  IO,
  TaskURI,
  Task,
  ApplicativeCompositionArrayEither,
  ApplicativeCompositionIOEither,
  ApplicativeCompositionTaskEither
} from './overloadings'

//
// EitherT
//

export interface EitherTArray extends ApplicativeCompositionArrayEither {
  chain<L, A, B>(f: (a: A) => Array<Either<L, B>>, fa: Array<Either<L, A>>): Array<Either<L, B>>
}
export interface EitherTIO extends ApplicativeCompositionIOEither {
  chain<L, A, B>(f: (a: A) => IO<Either<L, B>>, fa: IO<Either<L, A>>): IO<Either<L, B>>
}
export interface EitherTTask extends ApplicativeCompositionTaskEither {
  chain<L, A, B>(f: (a: A) => Task<Either<L, B>>, fa: Task<Either<L, A>>): Task<Either<L, B>>
}

export interface Ops {
  right(F: Functor<ArrayURI>): <L, A>(fa: Array<A>) => Array<Either<L, A>>
  right(F: Functor<IOURI>): <L, A>(fa: IO<A>) => IO<Either<L, A>>
  right(F: Functor<TaskURI>): <L, A>(fa: Task<A>) => Task<Either<L, A>>

  left(F: Functor<ArrayURI>): <L, A>(fl: Array<L>) => Array<Either<L, A>>
  left(F: Functor<IOURI>): <L, A>(fl: IO<L>) => IO<Either<L, A>>
  left(F: Functor<TaskURI>): <L, A>(fl: Task<L>) => Task<Either<L, A>>

  fromEither(F: Applicative<ArrayURI>): <L, A>(fa: Either<L, A>) => Array<Either<L, A>>
  fromEither(F: Applicative<IOURI>): <L, A>(fa: Either<L, A>) => IO<Either<L, A>>
  fromEither(F: Applicative<TaskURI>): <L, A>(fa: Either<L, A>) => Task<Either<L, A>>

  fold(F: Functor<ArrayURI>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: Array<Either<L, A>>) => Array<R>
  fold(F: Functor<IOURI>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: IO<Either<L, A>>) => IO<R>
  fold(F: Functor<TaskURI>): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: Task<Either<L, A>>) => Task<R>

  mapLeft(F: Functor<ArrayURI>): <N, L, A>(f: (l: L) => N, fa: Array<Either<L, A>>) => Array<Either<N, A>>
  mapLeft(F: Functor<IOURI>): <N, L, A>(f: (l: L) => N, fa: IO<Either<L, A>>) => IO<Either<N, A>>
  mapLeft(F: Functor<TaskURI>): <N, L, A>(f: (l: L) => N, fa: Task<Either<L, A>>) => Task<Either<N, A>>

  toOption(F: Functor<ArrayURI>): <L, A>(fa: Array<Either<L, A>>) => Array<Option<A>>
  toOption(F: Functor<IOURI>): <L, A>(fa: IO<Either<L, A>>) => IO<Option<A>>
  toOption(F: Functor<TaskURI>): <L, A>(fa: Task<Either<L, A>>) => Task<Option<A>>

  getEitherT(M: Monad<ArrayURI>): EitherTArray
  getEitherT(M: Monad<IOURI>): EitherTIO
  getEitherT(M: Monad<TaskURI>): EitherTTask
}
