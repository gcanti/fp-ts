import { HKT, HKTS } from './HKT'
import { Traversable } from './Traversable'
import { Filterable } from './Filterable'
import { Applicative } from './Applicative'
import { Either, left, right } from './Either'
import { Option } from './Option'
import { identity } from './function'

export interface Witherable<T extends HKTS> extends Traversable<T>, Filterable<T> {
  wilt<M extends HKTS>(
    applicative: Applicative<M>
  ): <A, L, R, U1 = any, U2 = any, V1 = any, V2 = any>(
    f: (a: A) => HKT<Either<L, R>, U1, V1>[M],
    ta: HKT<A, U2, V2>[T]
  ) => HKT<{ left: HKT<L, U2, V2>[T]; right: HKT<R, U2, V2>[T] }, U1, V1>[M]
}

/**  A default implementation of `wither` using `wilt` */
export function wither<T extends HKTS, M extends HKTS>(
  witherable: Witherable<T>,
  applicative: Applicative<M>
): <A, B, U1 = any, U2 = any, V1 = any, V2 = any>(
  f: (a: A) => HKT<Option<B>, U1, V1>[M],
  ta: HKT<A, U2, V2>[T]
) => HKT<HKT<B, U2, V2>[T], U1, V1>[M] {
  return <A, B, U1 = any, U2 = any, V1 = any, V2 = any>(
    f: (a: A) => HKT<Option<B>, U1, V1>[M],
    ta: HKT<A, U2, V2>[T]
  ) =>
    witherable.map(
      (x: { right: HKT<B>[T] }) => x.right,
      witherable.wilt(applicative)<A, null, B>(
        (a: A) =>
          applicative.map<Option<B>, Either<null, B>>(
            ob => ob.fold(() => left<null, B>(null), b => right<null, B>(b)),
            f(a)
          ),
        ta
      )
    )
}

/** Partition between `Left` and `Right` values - with effects in `m` */
export function wilted<T extends HKTS, M extends HKTS>(
  witherable: Witherable<T>,
  applicative: Applicative<M>
): <L, R, U1 = any, U2 = any, V1 = any, V2 = any>(
  tm: HKT<HKT<Either<L, R>, U1, V1>[M], U2, V2>[T]
) => HKT<{ left: HKT<L, U2, V2>[T]; right: HKT<R, U2, V2>[T] }, U1, V1>[M] {
  return <L, R, U1 = any, U2 = any, V1 = any, V2 = any>(tm: HKT<HKT<Either<L, R>, U1, V1>[M], U2, V2>[T]) =>
    witherable.wilt(applicative)(identity, tm)
}

/** Filter out all the `Nothing` values - with effects in `m` */
export function withered<T extends HKTS, M extends HKTS>(
  witherable: Witherable<T>,
  applicative: Applicative<M>
): <A, U1 = any, U2 = any, V1 = any, V2 = any>(
  tm: HKT<HKT<Option<A>, U1, V1>[M], U2, V2>[T]
) => HKT<HKT<A, U2, V2>[T], U1, V1>[M] {
  return <A, U1 = any, U2 = any, V1 = any, V2 = any>(tm: HKT<HKT<Option<A>, U1, V1>[M], U2, V2>[T]) =>
    wither(witherable, applicative)(identity, tm)
}
