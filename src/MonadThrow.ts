import { Either } from './Either'
import { HKT2, Type2, Type3, URIS2, URIS3, Type, URIS } from './HKT'
import { Monad2, Monad2C, Monad3, Monad3C, Monad1 } from './Monad'
import { Option } from './Option'

/**
 * The `MonadThrow` type class represents those monads which support errors via
 * `throwError`, where `throwError(e)` halts, yielding the error `e`.
 *
 * Laws:
 *
 * - Left zero: `M.chain(M.throwError(e), f) = M.throwError(e)`
 *
 * @since 2.0.0
 */
export interface MonadThrow<M> {
  readonly URI: M
  readonly map: <L, A, B>(ma: HKT2<M, L, A>, f: (a: A) => B) => HKT2<M, L, B>
  readonly ap: <L, A, B>(mab: HKT2<M, L, (a: A) => B>, ma: HKT2<M, L, A>) => HKT2<M, L, B>
  readonly of: <L, A>(a: A) => HKT2<M, L, A>
  readonly chain: <L, A, B>(ma: HKT2<M, L, A>, f: (a: A) => HKT2<M, L, B>) => HKT2<M, L, B>
  readonly throwError: <L, A>(e: L) => HKT2<M, L, A>
  readonly fromEither: <L, A>(e: Either<L, A>) => HKT2<M, L, A>
  readonly fromOption: <L, A>(o: Option<A>, onNone: () => L) => HKT2<M, L, A>
}

export interface MonadThrow1<M extends URIS> extends Monad1<M> {
  readonly throwError: <L, A>(e: L) => Type<M, A>
  readonly fromEither: <L, A>(e: Either<L, A>) => Type<M, A>
  readonly fromOption: <L, A>(o: Option<A>, onNone: () => L) => Type<M, A>
}

export interface MonadThrow2<M extends URIS2> extends Monad2<M> {
  readonly throwError: <L, A>(e: L) => Type2<M, L, A>
  readonly fromEither: <L, A>(e: Either<L, A>) => Type2<M, L, A>
  readonly fromOption: <L, A>(o: Option<A>, onNone: () => L) => Type2<M, L, A>
}

export interface MonadThrow2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly throwError: <A>(e: L) => Type2<M, L, A>
  readonly fromEither: <A>(e: Either<L, A>) => Type2<M, L, A>
  readonly fromOption: <A>(o: Option<A>, onNone: () => L) => Type2<M, L, A>
}

export interface MonadThrow3<M extends URIS3> extends Monad3<M> {
  readonly throwError: <U, L, A>(e: L) => Type3<M, U, L, A>
  readonly fromEither: <U, L, A>(e: Either<L, A>) => Type3<M, U, L, A>
  readonly fromOption: <U, L, A>(o: Option<A>, onNone: () => L) => Type3<M, U, L, A>
}

export interface MonadThrow3C<M extends URIS3, U, L> extends Monad3C<M, U, L> {
  readonly throwError: <A>(e: L) => Type3<M, U, L, A>
  readonly fromEither: <A>(e: Either<L, A>) => Type3<M, U, L, A>
  readonly fromOption: <A>(o: Option<A>, onNone: () => L) => Type3<M, U, L, A>
}
