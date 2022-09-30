/**
 * The `FromEither` type class represents those data types which support typed errors.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import type { Either } from './Either'
import type { LazyArg } from './function'
import { pipe, flow } from './function'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import * as _ from './internal'
import type { Option } from './Option'
import type { Predicate } from './Predicate'
import { not } from './Predicate'
import type { Refinement } from './Refinement'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface FromEither<F extends TypeLambda> extends TypeClass<F> {
  readonly fromEither: <E, A, S>(fa: Either<E, A>) => Kind<F, S, unknown, never, E, A>
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption =
  <F extends TypeLambda>(F: FromEither<F>) =>
  <E>(onNone: LazyArg<E>): (<A, S>(fa: Option<A>) => Kind<F, S, unknown, never, E, A>) => {
    const fromOption = _.fromOption(onNone)
    return (ma) => F.fromEither(fromOption(ma))
  }

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable =
  <F extends TypeLambda>(F: FromEither<F>) =>
  <E>(onNullable: LazyArg<E>) =>
  <A, S>(a: A): Kind<F, S, unknown, never, E, NonNullable<A>> => {
    return F.fromEither(_.fromNullableOrElse(a, onNullable))
  }

// -------------------------------------------------------------------------------------
// lifting
// -------------------------------------------------------------------------------------

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: <F extends TypeLambda>(
  F: FromEither<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S>(
    c: C
  ) => Kind<F, S, unknown, never, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S>(b: B) => Kind<F, S, unknown, never, E, B>
} =
  <F extends TypeLambda>(F: FromEither<F>) =>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E) =>
  <S>(b: B): Kind<F, S, unknown, never, E, B> =>
    F.fromEither(predicate(b) ? _.right(b) : _.left(onFalse(b)))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption = <F extends TypeLambda>(F: FromEither<F>) => {
  return <A extends ReadonlyArray<unknown>, B, E>(f: (...a: A) => Option<B>, onNone: (...a: A) => E) =>
    <S>(...a: A): Kind<F, S, unknown, never, E, B> => {
      return F.fromEither(_.fromOptionOrElse(f(...a), () => onNone(...a)))
    }
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftEither =
  <F extends TypeLambda>(F: FromEither<F>) =>
  <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, E, B> =>
    F.fromEither(f(...a))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable = <F extends TypeLambda>(F: FromEither<F>) => {
  const fromNullableF = fromNullable(F)
  return <E>(onNullable: LazyArg<E>) => {
    const fromNullable = fromNullableF(onNullable)
    return <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B | null | undefined) =>
      <S>(...a: A): Kind<F, S, unknown, never, E, NonNullable<B>> => {
        return fromNullable(f(...a))
      }
  }
}

// -------------------------------------------------------------------------------------
// sequencing
// -------------------------------------------------------------------------------------

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption = <M extends TypeLambda>(F: FromEither<M>, M: Flattenable<M>) => {
  const fromOptionKF = liftOption(F)
  return <A, B, E>(f: (a: A) => Option<B>, onNone: (a: A) => E) => {
    const from = fromOptionKF(f, onNone)
    return <S, R, O>(self: Kind<M, S, R, O, E, A>): Kind<M, S, R, O, E, B> => {
      return pipe(self, M.flatMap<A, S, R, O, E, B>(from))
    }
  }
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapEither = <M extends TypeLambda>(F: FromEither<M>, M: Flattenable<M>) => {
  const fromEitherKF = liftEither(F)
  return <A, E2, B>(f: (a: A) => Either<E2, B>) =>
    <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>): Kind<M, S, R, O, E1 | E2, B> => {
      return pipe(self, M.flatMap<A, S, R, O, E1 | E2, B>(fromEitherKF(f)))
    }
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable = <M extends TypeLambda>(F: FromEither<M>, M: Flattenable<M>) => {
  const liftNullable_ = liftNullable(F)
  return <E>(onNullable: LazyArg<E>) => {
    const fromNullable = liftNullable_(onNullable)
    return <A, B>(f: (a: A) => B | null | undefined) =>
      <S, R, O>(self: Kind<M, S, R, O, E, A>): Kind<M, S, R, O, E, NonNullable<B>> => {
        return pipe(self, M.flatMap<A, S, R, O, E, NonNullable<B>>(fromNullable(f)))
      }
  }
}

// -------------------------------------------------------------------------------------
// filtering
// -------------------------------------------------------------------------------------

// /**
//  * @category filtering
//  * @since 3.0.0
//  */
// export const compact =
//   <F extends TypeLambda>(F: FromEither<F>, M: Flattenable<F>) =>
//   <S, R, O, E, A>(self: Kind<F, S, R, O, E, Option<A>>): Kind<F, S, R, O, E, A> => {
//     return null as any
//   }

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap =
  <F extends TypeLambda>(F: FromEither<F>, M: Flattenable<F>) =>
  <A, B, E>(
    f: (a: A) => Option<B>,
    onNone: (a: A) => E
  ): (<S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>) => {
    return M.flatMap((a) => {
      const ob = f(a)
      return F.fromEither(_.isNone(ob) ? _.left(onNone(a)) : _.right(ob.value))
    })
  }

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap =
  <F extends TypeLambda>(F: FromEither<F>, M: Flattenable<F>) =>
  <A, B, C, E>(f: (a: A) => Either<B, C>, onEmpty: (a: A) => E) =>
  <S, R, O>(self: Kind<F, S, R, O, E, A>): readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>] => {
    const filterMapFM = filterMap(F, M)
    return [pipe(self, filterMapFM(flow(f, _.getLeft), onEmpty)), pipe(self, filterMapFM(flow(f, _.getRight), onEmpty))]
  }

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter =
  <M extends TypeLambda>(
    F: FromEither<M>,
    M: Flattenable<M>
  ): {
    <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <S, R, O, E1>(
      self: Kind<M, S, R, O, E1, C>
    ) => Kind<M, S, R, O, E1 | E2, B>
    <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <S, R, O, E1>(
      self: Kind<M, S, R, O, E1, B>
    ) => Kind<M, S, R, O, E1 | E2, B>
  } =>
  <B extends A, E2, A = B>(
    predicate: Predicate<A>,
    onFalse: (b: B) => E2
  ): (<S, R, O, E1>(mb: Kind<M, S, R, O, E1, B>) => Kind<M, S, R, O, E1 | E2, B>) => {
    return M.flatMap((b) => F.fromEither(predicate(b) ? _.right(b) : _.left(onFalse(b))))
  }

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition =
  <F extends TypeLambda>(
    F: FromEither<F>,
    M: Flattenable<F>
  ): {
    <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S, R, O>(
      self: Kind<F, S, R, O, E, C>
    ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
    <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S, R, O>(
      self: Kind<F, S, R, O, E, B>
    ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
  } =>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E) =>
  <S, R, O>(self: Kind<F, S, R, O, E, B>): readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>] => {
    const filterFM = filter(F, M)
    return [pipe(self, filterFM(not(predicate), onFalse)), pipe(self, filterFM(predicate, onFalse))]
  }
