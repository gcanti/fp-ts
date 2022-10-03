/**
 * The `FromEither` type class represents those data types which support typed errors.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import type { Either } from './Either'
import { pipe, flow } from './Function'
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
  <F extends TypeLambda>(FromEither: FromEither<F>) =>
  <E>(onNone: E): (<A, S>(self: Option<A>) => Kind<F, S, unknown, never, E, A>) => {
    const fromOption = _.fromOption(onNone)
    return (self) => FromEither.fromEither(fromOption(self))
  }

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable =
  <F extends TypeLambda>(FromEither: FromEither<F>) =>
  <E>(onNullable: E) => {
    const fromNullable = _.eitherFromNullable(onNullable)
    return <A, S>(a: A): Kind<F, S, unknown, never, E, NonNullable<A>> => {
      return FromEither.fromEither(fromNullable(a))
    }
  }

// -------------------------------------------------------------------------------------
// lifting
// -------------------------------------------------------------------------------------

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: <F extends TypeLambda>(
  FromEither: FromEither<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <S>(
    c: C
  ) => Kind<F, S, unknown, never, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <S>(b: B) => Kind<F, S, unknown, never, E, B>
} =
  <F extends TypeLambda>(FromEither: FromEither<F>) =>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E) =>
  <S>(b: B): Kind<F, S, unknown, never, E, B> =>
    FromEither.fromEither(predicate(b) ? _.right(b) : _.left(onFalse))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable = <F extends TypeLambda>(FromEither: FromEither<F>) => {
  const fromNullable_ = fromNullable(FromEither)
  return <A extends ReadonlyArray<unknown>, B, E>(f: (...a: A) => B | null | undefined, onNullable: E) => {
    const from = fromNullable_(onNullable)
    return <S>(...a: A): Kind<F, S, unknown, never, E, NonNullable<B>> => from(f(...a))
  }
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption = <F extends TypeLambda>(FromEither: FromEither<F>) => {
  return <A extends ReadonlyArray<unknown>, B, E>(f: (...a: A) => Option<B>, onNone: E) => {
    const fromOption = _.fromOption(onNone)
    return <S>(...a: A): Kind<F, S, unknown, never, E, B> => FromEither.fromEither(fromOption(f(...a)))
  }
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftEither =
  <F extends TypeLambda>(FromEither: FromEither<F>) =>
  <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, E, B> =>
    FromEither.fromEither(f(...a))

// -------------------------------------------------------------------------------------
// sequencing
// -------------------------------------------------------------------------------------

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable = <M extends TypeLambda>(FromEither: FromEither<M>, Flattenable: Flattenable<M>) => {
  const liftNullable_ = liftNullable(FromEither)
  return <A, B, E2>(f: (a: A) => B | null | undefined, onNullable: E2) => {
    const lift = liftNullable_(f, onNullable)
    return <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>): Kind<M, S, R, O, E1 | E2, NonNullable<B>> =>
      pipe(self, Flattenable.flatMap<A, S, R, O, E2, NonNullable<B>>(lift))
  }
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapOption = <F extends TypeLambda>(FromEither: FromEither<F>, Flattenable: Flattenable<F>) => {
  const liftOption_ = liftOption(FromEither)
  return <A, B, E2>(f: (a: A) => Option<B>, onNone: E2) => {
    const lift = liftOption_(f, onNone)
    return <S, R, O, E1>(self: Kind<F, S, R, O, E1, A>): Kind<F, S, R, O, E1 | E2, B> => {
      return pipe(self, Flattenable.flatMap<A, S, R, O, E2, B>(lift))
    }
  }
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapEither = <M extends TypeLambda>(FromEither: FromEither<M>, Flattenable: Flattenable<M>) => {
  const fromEitherKF = liftEither(FromEither)
  return <A, E2, B>(f: (a: A) => Either<E2, B>) =>
    <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>): Kind<M, S, R, O, E1 | E2, B> => {
      return pipe(self, Flattenable.flatMap<A, S, R, O, E1 | E2, B>(fromEitherKF(f)))
    }
}

// -------------------------------------------------------------------------------------
// filtering
// -------------------------------------------------------------------------------------

// TODO
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
  <F extends TypeLambda>(FromEither: FromEither<F>, Flattenable: Flattenable<F>) =>
  <A, B, E>(f: (a: A) => Option<B>, onNone: E): (<S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>) => {
    return Flattenable.flatMap((a) => {
      const ob = f(a)
      return FromEither.fromEither(_.isNone(ob) ? _.left(onNone) : _.right(ob.value))
    })
  }

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap =
  <F extends TypeLambda>(FromEither: FromEither<F>, Flattenable: Flattenable<F>) =>
  <A, B, C, E>(f: (a: A) => Either<B, C>, onEmpty: E) =>
  <S, R, O>(self: Kind<F, S, R, O, E, A>): readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>] => {
    const filterMapFM = filterMap(FromEither, Flattenable)
    return [pipe(self, filterMapFM(flow(f, _.getLeft), onEmpty)), pipe(self, filterMapFM(flow(f, _.getRight), onEmpty))]
  }

/**
 * @category filtering
 * @since 3.0.0
 */
export const filter =
  <F extends TypeLambda>(
    FromEither: FromEither<F>,
    Flattenable: Flattenable<F>
  ): {
    <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <S, R, O, E1>(
      self: Kind<F, S, R, O, E1, C>
    ) => Kind<F, S, R, O, E1 | E2, B>
    <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <S, R, O, E1>(
      self: Kind<F, S, R, O, E1, B>
    ) => Kind<F, S, R, O, E1 | E2, B>
  } =>
  <B extends A, E2, A = B>(
    predicate: Predicate<A>,
    onFalse: E2
  ): (<S, R, O, E1>(mb: Kind<F, S, R, O, E1, B>) => Kind<F, S, R, O, E1 | E2, B>) => {
    return Flattenable.flatMap((b) => FromEither.fromEither(predicate(b) ? _.right(b) : _.left(onFalse)))
  }

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition =
  <F extends TypeLambda>(
    FromEither: FromEither<F>,
    Flattenable: Flattenable<F>
  ): {
    <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <S, R, O>(
      self: Kind<F, S, R, O, E, C>
    ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
    <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <S, R, O>(
      self: Kind<F, S, R, O, E, B>
    ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
  } =>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E) =>
  <S, R, O>(self: Kind<F, S, R, O, E, B>): readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>] => {
    const filter_ = filter(FromEither, Flattenable)
    return [pipe(self, filter_(not(predicate), onFalse)), pipe(self, filter_(predicate, onFalse))]
  }
