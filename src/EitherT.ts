import {
  ApplicativeComposition02,
  ApplicativeComposition12,
  ApplicativeComposition22,
  getApplicativeComposition
} from './Applicative'
import { Either, either, isLeft, left, right, URI, swap, fold } from './Either'
import { HKT, Type, Type2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'

export interface EitherT<M, L, A> extends HKT<M, Either<L, A>> {}

export interface EitherM<M> extends ApplicativeComposition02<M, URI> {
  readonly chain: <L, A, B>(ma: EitherT<M, L, A>, f: (a: A) => EitherT<M, L, B>) => EitherT<M, L, B>
  readonly fold: <L, A, R>(ma: EitherT<M, L, A>, onLeft: (l: L) => HKT<M, R>, onRight: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly bimap: <L, A, N, B>(ma: EitherT<M, L, A>, f: (l: L) => N, g: (a: A) => B) => EitherT<M, N, B>
  readonly mapLeft: <L, A, N>(ma: EitherT<M, L, A>, f: (l: L) => N) => EitherT<M, N, A>
  readonly getOrElse: <L, A>(ma: EitherT<M, L, A>, f: (l: L) => HKT<M, A>) => HKT<M, A>
  readonly orElse: <L, A, N>(ma: EitherT<M, L, A>, f: (l: L) => EitherT<M, N, A>) => EitherT<M, N, A>
  readonly swap: <L, A>(ma: EitherT<M, L, A>) => EitherT<M, A, L>
  readonly rightM: <L, A>(ma: HKT<M, A>) => EitherT<M, L, A>
  readonly leftM: <L, A>(ml: HKT<M, L>) => EitherT<M, L, A>
  readonly left: <L, A>(l: L) => EitherT<M, L, A>
  readonly bracket: <L, A, B>(
    acquire: EitherT<M, L, A>,
    use: (a: A) => EitherT<M, L, B>,
    release: (a: A, e: Either<L, B>) => EitherT<M, L, void>
  ) => EitherT<M, L, B>
}

type EitherT1<M extends URIS, L, A> = Type<M, Either<L, A>>

interface EitherM1<M extends URIS> extends ApplicativeComposition12<M, URI> {
  readonly chain: <L, A, B>(ma: EitherT1<M, L, A>, f: (a: A) => EitherT1<M, L, B>) => EitherT1<M, L, B>
  readonly fold: <L, A, R>(
    ma: EitherT1<M, L, A>,
    onLeft: (l: L) => Type<M, R>,
    onRight: (a: A) => Type<M, R>
  ) => Type<M, R>
  readonly bimap: <L, A, N, B>(ma: EitherT1<M, L, A>, f: (l: L) => N, g: (a: A) => B) => EitherT1<M, N, B>
  readonly mapLeft: <L, A, N>(ma: EitherT1<M, L, A>, f: (l: L) => N) => EitherT1<M, N, A>
  readonly getOrElse: <L, A>(ma: EitherT1<M, L, A>, f: (l: L) => Type<M, A>) => Type<M, A>
  readonly orElse: <L, A, N>(ma: EitherT1<M, L, A>, f: (l: L) => EitherT1<M, N, A>) => EitherT1<M, N, A>
  readonly swap: <L, A>(ma: EitherT1<M, L, A>) => EitherT1<M, A, L>
  readonly rightM: <L, A>(ma: Type<M, A>) => EitherT1<M, L, A>
  readonly leftM: <L, A>(ml: Type<M, L>) => EitherT1<M, L, A>
  readonly left: <L, A>(l: L) => EitherT1<M, L, A>
  readonly bracket: <L, A, B>(
    acquire: EitherT1<M, L, A>,
    use: (a: A) => EitherT1<M, L, B>,
    release: (a: A, e: Either<L, B>) => EitherT1<M, L, void>
  ) => EitherT1<M, L, B>
}

type EitherT2<M extends URIS2, LM, L, A> = Type2<M, LM, Either<L, A>>

interface EitherM2<M extends URIS2> extends ApplicativeComposition22<M, URI> {
  readonly chain: <LM, L, A, B>(ma: EitherT2<M, LM, L, A>, f: (a: A) => EitherT2<M, LM, L, B>) => EitherT2<M, LM, L, B>
  readonly fold: <LM, L, A, R>(
    ma: EitherT2<M, LM, L, A>,
    onLeft: (l: L) => Type2<M, LM, R>,
    onRight: (a: A) => Type2<M, LM, R>
  ) => Type2<M, LM, R>
  readonly bimap: <LM, L, A, N, B>(ma: EitherT2<M, LM, L, A>, f: (l: L) => N, g: (a: A) => B) => EitherT2<M, LM, N, B>
  readonly mapLeft: <LM, L, A, N>(ma: EitherT2<M, LM, L, A>, f: (l: L) => N) => EitherT2<M, LM, N, A>
  readonly getOrElse: <LM, L, A>(ma: EitherT2<M, LM, L, A>, f: (l: L) => Type2<M, LM, A>) => Type2<M, LM, A>
  readonly orElse: <LM, L, A, N>(ma: EitherT2<M, LM, L, A>, f: (l: L) => EitherT2<M, LM, N, A>) => EitherT2<M, LM, N, A>
  readonly swap: <LM, L, A>(ma: EitherT2<M, LM, L, A>) => EitherT2<M, LM, A, L>
  readonly rightM: <LM, L, A>(ma: Type2<M, LM, A>) => EitherT2<M, LM, L, A>
  readonly leftM: <LM, L, A>(ml: Type2<M, LM, L>) => EitherT2<M, LM, L, A>
  readonly left: <LM, L, A>(l: L) => EitherT2<M, LM, L, A>
  readonly bracket: <LM, L, A, B>(
    acquire: EitherT2<M, LM, L, A>,
    use: (a: A) => EitherT2<M, LM, L, B>,
    release: (a: A, e: Either<L, B>) => EitherT2<M, LM, L, void>
  ) => EitherT2<M, LM, L, B>
}

/**
 * @since 2.0.0
 */
export function getEitherM<M extends URIS2>(M: Monad2<M>): EitherM2<M>
export function getEitherM<M extends URIS>(M: Monad1<M>): EitherM1<M>
export function getEitherM<M>(M: Monad<M>): EitherM<M>
export function getEitherM<M>(M: Monad<M>): EitherM<M> {
  const A = getApplicativeComposition(M, either)

  const chain = <L, A, B>(ma: EitherT<M, L, A>, f: (a: A) => EitherT<M, L, B>): EitherT<M, L, B> =>
    M.chain(ma, e => (isLeft(e) ? M.of(left(e.left)) : f(e.right)))

  const _left = <L, A>(l: L): EitherT<M, L, A> => M.of(left(l))

  return {
    ...A,
    chain,
    fold: (ma, onLeft, onRight) => M.chain(ma, e => fold(e, onLeft, onRight)),
    bimap: (ma, f, g) => M.map(ma, e => either.bimap(e, f, g)),
    mapLeft: (ma, f) => M.map(ma, e => either.mapLeft(e, f)),
    getOrElse: (ma, onLeft) => M.chain(ma, e => fold(e, onLeft, M.of)),
    orElse: (ma, f) => M.chain(ma, e => fold(e, f, a => A.of(a))),
    swap: ma => M.map(ma, swap),
    rightM: ma => M.map(ma, right),
    leftM: ml => M.map(ml, left),
    left: _left,
    bracket: <L, A, B>(
      acquire: EitherT<M, L, A>,
      use: (a: A) => EitherT<M, L, B>,
      release: (a: A, e: Either<L, B>) => EitherT<M, L, void>
    ): EitherT<M, L, B> =>
      chain(acquire, a =>
        chain(M.map(use(a), right), e => chain(release(a, e), () => fold<L, B, EitherT<M, L, B>>(e, _left, A.of)))
      )
  }
}
