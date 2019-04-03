import { HKT2, Type2, Type3, URIS2, URIS3 } from './HKT'
import { Monad2, Monad3, Monad2C, Monad3C } from './Monad'
import { Either } from './Either'
import { Option } from './Option'

/**
 * The `MonadThrow` type class represents those monads which support errors via
 * `throwError`, where `throwError(e)` halts, yielding the error `e`.
 *
 * Laws:
 *
 * - Left zero: `M.chain(M.throwError(e), f) = M.throwError(e)`
 *
 * @since 1.16.0
 */
export interface MonadThrow<M> {
  readonly URI: M
  readonly map: <L, A, B>(fa: HKT2<M, L, A>, f: (a: A) => B) => HKT2<M, L, B>
  readonly ap: <L, A, B>(fab: HKT2<M, L, (a: A) => B>, fa: HKT2<M, L, A>) => HKT2<M, L, B>
  readonly of: <L, A>(a: A) => HKT2<M, L, A>
  readonly chain: <L, A, B>(fa: HKT2<M, L, A>, f: (a: A) => HKT2<M, L, B>) => HKT2<M, L, B>
  readonly throwError: <E, A>(e: E) => HKT2<M, E, A>
  readonly fromEither: <E, A>(e: Either<E, A>) => HKT2<M, E, A>
  readonly fromOption: <E, A>(o: Option<A>, e: E) => HKT2<M, E, A>
}

export interface MonadThrow2<M extends URIS2> extends Monad2<M> {
  readonly throwError: <E, A>(e: E) => Type2<M, E, A>
  readonly fromEither: <E, A>(e: Either<E, A>) => Type2<M, E, A>
  readonly fromOption: <E, A>(o: Option<A>, e: E) => Type2<M, E, A>
}

export interface MonadThrow2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly throwError: <A>(e: E) => Type2<M, E, A>
  readonly fromEither: <A>(e: Either<E, A>) => Type2<M, E, A>
  readonly fromOption: <A>(o: Option<A>, e: E) => Type2<M, E, A>
}

export interface MonadThrow3<M extends URIS3> extends Monad3<M> {
  readonly throwError: <U, E, A>(e: E) => Type3<M, U, E, A>
  readonly fromEither: <U, E, A>(e: Either<E, A>) => Type3<M, U, E, A>
  readonly fromOption: <U, E, A>(o: Option<A>, e: E) => Type3<M, U, E, A>
}

export interface MonadThrow3C<M extends URIS3, U, E> extends Monad3C<M, U, E> {
  readonly throwError: <A>(e: E) => Type3<M, U, E, A>
  readonly fromEither: <A>(e: Either<E, A>) => Type3<M, U, E, A>
  readonly fromOption: <A>(o: Option<A>, e: E) => Type3<M, U, E, A>
}
