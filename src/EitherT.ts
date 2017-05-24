import { HKT, HKTS } from './HKT'
import { StaticMonad } from './Monad'
import { getStaticApplicativeComposition } from './Applicative'
import { Either } from './Either'
import * as either from './Either'
import { Option } from './Option'

export interface StaticEitherT<URI extends HKTS, M extends HKTS> extends StaticMonad<URI> {
  /** lifts `M<A>` to `M<EitherT<L, A>>` */
  right<L, A, U = any, V = any>(ma: HKT<A, U, V>[M]): HKT<Either<L, A>, U, V>[M]
  /** lifts `M<L>` to `M<Either<L, A>>` */
  left<L, A, U = any, V = any>(ml: HKT<L, U, V>[M]): HKT<Either<L, A>, U, V>[M]
  fold<R, L, A, U = any, V = any>(left: (l: L) => R, right: (a: A) => R, fa: HKT<Either<L, A>, U, V>[M]): HKT<R, U, V>[M]
  mapLeft<L2, L, A, U = any, V = any>(f: (l: L) => L2, fa: HKT<Either<L, A>, U, V>[M]): HKT<Either<L2, A>, U, V>[M]
  toOption<L, A, U = any, V = any>(fa: HKT<Either<L, A>, U, V>[M]): HKT<Option<A>, U, V>[M]
}

export function getStaticEitherT<URI extends HKTS, M extends HKTS>(URI: URI, monad: StaticMonad<M>): StaticEitherT<URI, M> {
  const applicative = getStaticApplicativeComposition(URI)(monad, either)

  function chain<L, A, B>(f: (a: A) => HKT<Either<L, B>>[M], fa: HKT<Either<L, A>>[M]): HKT<Either<L, B>>[M] {
    return monad.chain<Either<L, A>, Either<L, B>>(e => e.fold<HKT<Either<L, B>>[M]>(
      () => fa as any,
      a => f(a)
    ), fa)
  }

  function right<L, A>(ma: HKT<A>[M]): HKT<Either<L, A>>[M] {
    return monad.map((a: A) => either.right<L, A>(a), ma)
  }

  function left<L, A>(ml: HKT<L>[M]): HKT<Either<L, A>>[M] {
    return monad.map((l: L) => either.left<L, A>(l), ml)
  }

  function fold<R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<Either<L, A>>[M]): HKT<R>[M] {
    return monad.map<Either<L, A>, R>(e => e.fold(left, right), fa)
  }

  function mapLeft<L2, L, A>(f: (l: L) => L2, fa: HKT<Either<L, A>>[M]): HKT<Either<L2, A>>[M] {
    return monad.map<Either<L, A>, Either<L2, A>>(e => e.mapLeft(f), fa)
  }

  function toOption<L, A>(fa: HKT<Either<L, A>>[M]): HKT<Option<A>>[M] {
    return monad.map<Either<L, A>, Option<A>>(e => e.toOption(), fa)
  }

  return {
    ...applicative,
    chain,
    right,
    left,
    fold,
    mapLeft,
    toOption
  }
}
