import {
  Applicative,
  Applicative1,
  Applicative2,
  ApplicativeComposition,
  ApplicativeComposition12,
  ApplicativeComposition22,
  getApplicativeComposition
} from './Applicative'
import { Either, URI, either, left as eitherLeft, right as eitherRight } from './Either'
import { Functor, Functor1, Functor2 } from './Functor'
import { HKT, Type, Type2, URIS, URIS2 } from './HKT'
import { Monad, Monad1, Monad2 } from './Monad'

export interface EitherT2v<F> extends ApplicativeComposition<F, URI> {
  readonly chain: <L, A, B>(fa: HKT<F, Either<L, A>>, f: (a: A) => HKT<F, Either<L, B>>) => HKT<F, Either<L, B>>
}

export interface EitherT2v1<F extends URIS> extends ApplicativeComposition12<F, URI> {
  readonly chain: <L, A, B>(fa: Type<F, Either<L, A>>, f: (a: A) => Type<F, Either<L, B>>) => Type<F, Either<L, B>>
}

export interface EitherT2v2<F extends URIS2> extends ApplicativeComposition22<F, URI> {
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
): <R, L, M, A>(left: (l: L) => R, right: (a: A) => R, fa: Type2<F, M, Either<L, A>>) => Type2<F, M, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: Type<F, Either<L, A>>) => Type<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R> {
  return (left, right, fa) => F.map(fa, e => (e.isLeft() ? left(e.value) : right(e.value)))
}

/**
 * @since 1.14.0
 */
export function getEitherT2v<M extends URIS2>(M: Monad2<M>): EitherT2v2<M>
export function getEitherT2v<M extends URIS>(M: Monad1<M>): EitherT2v1<M>
export function getEitherT2v<M>(M: Monad<M>): EitherT2v<M>
export function getEitherT2v<M>(M: Monad<M>): EitherT2v<M> {
  const applicativeComposition = getApplicativeComposition(M, either)

  return {
    ...applicativeComposition,
    chain: (fa, f) => M.chain(fa, e => (e.isLeft() ? M.of(eitherLeft(e.value)) : f(e.value)))
  }
}

/** @deprecated */
export interface EitherT<F> extends ApplicativeComposition<F, URI> {
  readonly chain: <L, A, B>(f: (a: A) => HKT<F, Either<L, B>>, fa: HKT<F, Either<L, A>>) => HKT<F, Either<L, B>>
}

/** @deprecated */
export interface EitherT1<F extends URIS> extends ApplicativeComposition12<F, URI> {
  readonly chain: <L, A, B>(f: (a: A) => Type<F, Either<L, B>>, fa: Type<F, Either<L, A>>) => Type<F, Either<L, B>>
}

/** @deprecated */
export interface EitherT2<F extends URIS2> extends ApplicativeComposition22<F, URI> {
  readonly chain: <L, M, A, B>(
    f: (a: A) => Type2<F, M, Either<L, B>>,
    fa: Type2<F, M, Either<L, A>>
  ) => Type2<F, M, Either<L, B>>
}

/**
 * Use {@link getEitherT2v} instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export function chain<F extends URIS2>(F: Monad2<F>): EitherT2<F>['chain']
/** @deprecated */
// tslint:disable-next-line: deprecation
export function chain<F extends URIS>(F: Monad1<F>): EitherT1<F>['chain']
/** @deprecated */
// tslint:disable-next-line: deprecation
export function chain<F>(F: Monad<F>): EitherT<F>['chain']
/** @deprecated */
// tslint:disable-next-line: deprecation
export function chain<F>(F: Monad<F>): EitherT<F>['chain'] {
  return (f, fa) => F.chain(fa, e => (e.isLeft() ? F.of(eitherLeft(e.value)) : f(e.value)))
}

/**
 * Use {@link getEitherT2v} instead
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export function getEitherT<M extends URIS2>(M: Monad2<M>): EitherT2<M>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getEitherT<M extends URIS>(M: Monad1<M>): EitherT1<M>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getEitherT<M>(M: Monad<M>): EitherT<M>
/** @deprecated */
// tslint:disable-next-line: deprecation
export function getEitherT<M>(M: Monad<M>): EitherT<M> {
  const applicativeComposition = getApplicativeComposition(M, either)

  return {
    ...applicativeComposition,
    // tslint:disable-next-line: deprecation
    chain: chain(M)
  }
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function right<F extends URIS2>(F: Functor2<F>): <L, M, A>(fa: Type2<F, M, A>) => Type2<F, M, Either<L, A>>
/** @deprecated */
export function right<F extends URIS>(F: Functor1<F>): <L, A>(fa: Type<F, A>) => Type<F, Either<L, A>>
/** @deprecated */
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
/** @deprecated */
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>> {
  return ma => F.map(ma, a => eitherRight(a))
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function left<F extends URIS2>(F: Functor2<F>): <L, M, A>(fl: Type2<F, M, L>) => Type2<F, M, Either<L, A>>
/** @deprecated */
export function left<F extends URIS>(F: Functor1<F>): <L, A>(fl: Type<F, L>) => Type<F, Either<L, A>>
/** @deprecated */
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
/** @deprecated */
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>> {
  return ml => F.map(ml, l => eitherLeft(l))
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function fromEither<F extends URIS2>(
  F: Applicative2<F>
): <L, M, A>(fa: Either<L, A>) => Type2<F, M, Either<L, A>>
/** @deprecated */
export function fromEither<F extends URIS>(F: Applicative1<F>): <L, A>(fa: Either<L, A>) => Type<F, Either<L, A>>
/** @deprecated */
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
/** @deprecated */
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>> {
  return F.of
}

/**
 * @since 1.0.0
 * @deprecated
 */
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <N, L, M>(f: (l: L) => N) => <A>(fa: Type2<F, M, Either<L, A>>) => Type2<F, M, Either<N, A>>
/** @deprecated */
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <N, L>(f: (l: L) => N) => <A>(fa: Type<F, Either<L, A>>) => Type<F, Either<N, A>>
/** @deprecated */
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
/** @deprecated */
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>> {
  return f => fa => F.map(fa, e => e.mapLeft(f))
}

/**
 * @since 1.2.0
 * @deprecated
 */
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <M, L, V, A, B>(fa: Type2<F, M, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => Type2<F, M, Either<V, B>>
/** @deprecated */
export function bimap<F extends URIS>(
  F: Functor1<F>
): <L, V, A, B>(fa: Type<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => Type<F, Either<V, B>>
/** @deprecated */
export function bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>
/** @deprecated */
export function bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>> {
  return (fa, f, g) => F.map(fa, e => e.bimap(f, g))
}
