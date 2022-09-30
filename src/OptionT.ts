/**
 * @since 2.0.0
 */
import {
  ApplicativeComposition11,
  ApplicativeComposition21,
  ApplicativeComposition2C1,
  ApplicativeCompositionHKT1
} from './Applicative'
import { ap as ap_, Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import { Either } from './Either'
import { constant, flow, Lazy, pipe } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4, map as map_ } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C, Monad4 } from './Monad'
import * as O from './Option'
import { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C, Pointed4 } from './Pointed'
import { Predicate } from './Predicate'
import { Refinement } from './Refinement'

import Option = O.Option

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function some<F extends URIS4>(F: Pointed4<F>): <A, S, R, E>(a: A) => Kind4<F, S, R, E, Option<A>>
export function some<F extends URIS3>(F: Pointed3<F>): <A, R, E>(a: A) => Kind3<F, R, E, Option<A>>
export function some<F extends URIS3, E>(F: Pointed3C<F, E>): <A, R>(a: A) => Kind3<F, R, E, Option<A>>
export function some<F extends URIS2>(F: Pointed2<F>): <A, E>(a: A) => Kind2<F, E, Option<A>>
export function some<F extends URIS2, E>(F: Pointed2C<F, E>): <A>(a: A) => Kind2<F, E, Option<A>>
export function some<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>> {
  return flow(O.some, F.of)
}

/**
 * @since 2.10.0
 */
export function zero<F extends URIS4>(F: Pointed4<F>): <S, R, E, A>() => Kind4<F, S, R, E, Option<A>>
export function zero<F extends URIS3>(F: Pointed3<F>): <R, E, A>() => Kind3<F, R, E, Option<A>>
export function zero<F extends URIS3, E>(F: Pointed3C<F, E>): <R, A>() => Kind3<F, R, E, Option<A>>
export function zero<F extends URIS2>(F: Pointed2<F>): <E, A>() => Kind2<F, E, Option<A>>
export function zero<F extends URIS2, E>(F: Pointed2C<F, E>): <A>() => Kind2<F, E, Option<A>>
export function zero<F extends URIS>(F: Pointed1<F>): <A>() => Kind<F, Option<A>>
export function zero<F>(F: Pointed<F>): <A>() => HKT<F, Option<A>>
export function zero<F>(F: Pointed<F>): <A>() => HKT<F, Option<A>> {
  return constant(F.of(O.none))
}

/**
 * @since 2.10.0
 */
export function fromF<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A>(ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, Option<A>>
export function fromF<F extends URIS3>(F: Functor3<F>): <R, E, A>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, Option<A>>
export function fromF<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, A>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, Option<A>>
export function fromF<F extends URIS2>(F: Functor2<F>): <E, A>(ma: Kind2<F, E, A>) => Kind2<F, E, Option<A>>
export function fromF<F extends URIS2, E>(F: Functor2C<F, E>): <A>(ma: Kind2<F, E, A>) => Kind2<F, E, Option<A>>
export function fromF<F extends URIS>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>> {
  return (ma) => F.map(ma, O.some)
}

/**
 * @since 2.10.0
 */
export function fromNullable<F extends URIS4>(
  F: Pointed4<F>
): <A, S, R, E>(a: A) => Kind4<F, S, R, E, Option<NonNullable<A>>>
export function fromNullable<F extends URIS3>(F: Pointed3<F>): <A, R, E>(a: A) => Kind3<F, R, E, Option<NonNullable<A>>>
export function fromNullable<F extends URIS3, E>(
  F: Pointed3C<F, E>
): <A, R>(a: A) => Kind3<F, R, E, Option<NonNullable<A>>>
export function fromNullable<F extends URIS2>(F: Pointed2<F>): <A, E>(a: A) => Kind2<F, E, Option<NonNullable<A>>>
export function fromNullable<F extends URIS2, E>(F: Pointed2C<F, E>): <A>(a: A) => Kind2<F, E, Option<NonNullable<A>>>
export function fromNullable<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<NonNullable<A>>> {
  return flow(O.fromNullable, F.of)
}

/**
 * @since 2.10.0
 */
export function fromNullableK<F extends URIS4>(
  F: Pointed4<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, E>(...a: A) => Kind4<F, S, R, E, Option<NonNullable<B>>>
export function fromNullableK<F extends URIS3>(
  F: Pointed3<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R, E>(...a: A) => Kind3<F, R, E, Option<NonNullable<B>>>
export function fromNullableK<F extends URIS3, E>(
  F: Pointed3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R>(...a: A) => Kind3<F, R, E, Option<NonNullable<B>>>
export function fromNullableK<F extends URIS2>(
  F: Pointed2<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <E>(...a: A) => Kind2<F, E, Option<NonNullable<B>>>
export function fromNullableK<F extends URIS2, E>(
  F: Pointed2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind2<F, E, Option<NonNullable<B>>>
export function fromNullableK<F extends URIS>(
  F: Pointed1<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind<F, Option<NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => HKT<F, Option<NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => HKT<F, Option<NonNullable<B>>> {
  const fromNullableF = fromNullable(F)
  return (f) => flow(f, fromNullableF)
}

/**
 * @since 2.10.0
 */
export function chainNullableK<M extends URIS4>(
  M: Monad4<M>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, E>(ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<NonNullable<B>>>
export function chainNullableK<M extends URIS3>(
  M: Monad3<M>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <R, E>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<NonNullable<B>>>
export function chainNullableK<M extends URIS3, E>(
  M: Monad3C<M, E>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<NonNullable<B>>>
export function chainNullableK<M extends URIS2>(
  M: Monad2<M>
): <A, B>(f: (a: A) => B | null | undefined) => <E>(ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<NonNullable<B>>>
export function chainNullableK<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<NonNullable<B>>>
export function chainNullableK<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind<M, Option<A>>) => Kind<M, Option<NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: HKT<M, Option<A>>) => HKT<M, Option<NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => B | null | undefined) => (ma: HKT<M, Option<A>>) => HKT<M, Option<NonNullable<B>>> {
  const chainM = chain(M)
  const fromNullableKM = fromNullableK(M)
  return (f) => chainM(fromNullableKM(f))
}

/**
 * @since 2.10.0
 */
export function fromOptionK<F extends URIS4>(
  F: Pointed4<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => <S, R, E>(...a: A) => Kind4<F, S, R, E, Option<B>>
export function fromOptionK<F extends URIS3>(
  F: Pointed3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R, E>(...a: A) => Kind3<F, R, E, Option<B>>
export function fromOptionK<F extends URIS3, E>(
  F: Pointed3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, Option<B>>
export function fromOptionK<F extends URIS2>(
  F: Pointed2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <E>(...a: A) => Kind2<F, E, Option<B>>
export function fromOptionK<F extends URIS2, E>(
  F: Pointed2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, Option<B>>
export function fromOptionK<F extends URIS>(
  F: Pointed1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind<F, Option<B>>
export function fromOptionK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT<F, Option<B>>
export function fromOptionK<F>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT<F, Option<B>> {
  return (f) => flow(f, F.of)
}

/**
 * @since 2.10.0
 */
export function chainOptionK<M extends URIS4>(
  M: Monad4<M>
): <A, B>(f: (a: A) => Option<B>) => <S, R, E>(ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<B>>
export function chainOptionK<M extends URIS3>(
  M: Monad3<M>
): <A, B>(f: (a: A) => Option<B>) => <R, E>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chainOptionK<M extends URIS3, E>(
  M: Monad3C<M, E>
): <A, B>(f: (a: A) => Option<B>) => <R>(ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chainOptionK<M extends URIS2>(
  M: Monad2<M>
): <A, B>(f: (a: A) => Option<B>) => <E>(ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chainOptionK<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chainOptionK<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chainOptionK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>>
export function chainOptionK<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>> {
  const chainM = chain(M)
  const fromOptionKM = fromOptionK(M)
  return (f) => chainM(fromOptionKM(f))
}

/**
 * @category lifting
 * @since 2.10.0
 */
export function fromPredicate<F extends URIS4>(
  F: Pointed4<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(a: A) => Kind4<F, S, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <S, R, E, B extends A>(b: B) => Kind4<F, S, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <S, R, E>(a: A) => Kind4<F, S, R, E, Option<A>>
}
export function fromPredicate<F extends URIS3>(
  F: Pointed3<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(a: A) => Kind3<F, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <R, E, B extends A>(b: B) => Kind3<F, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <R, E>(a: A) => Kind3<F, R, E, Option<A>>
}
export function fromPredicate<F extends URIS3, E>(
  F: Pointed3C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(a: A) => Kind3<F, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <R, B extends A>(b: B) => Kind3<F, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <R>(a: A) => Kind3<F, R, E, Option<A>>
}
export function fromPredicate<F extends URIS2>(
  F: Pointed2<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(a: A) => Kind2<F, E, Option<B>>
  <A>(predicate: Predicate<A>): <E, B extends A>(b: B) => Kind2<F, E, Option<B>>
  <A>(predicate: Predicate<A>): <E>(a: A) => Kind2<F, E, Option<A>>
}
export function fromPredicate<F extends URIS2, E>(
  F: Pointed2C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Kind2<F, E, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => Kind2<F, E, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => Kind2<F, E, Option<A>>
}
export function fromPredicate<F extends URIS>(
  F: Pointed1<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Kind<F, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => Kind<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => Kind<F, Option<A>>
}
export function fromPredicate<F>(F: Pointed<F>): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
}
export function fromPredicate<F>(F: Pointed<F>): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
} {
  return <A>(predicate: Predicate<A>) =>
    (a: A) =>
      F.of(O.fromPredicate(predicate)(a))
}

/**
 * @since 2.10.0
 */
export function fromEither<F extends URIS4>(
  F: Pointed4<F>
): <A, S, R, E>(e: Either<unknown, A>) => Kind4<F, S, R, E, Option<A>>
export function fromEither<F extends URIS3>(
  F: Pointed3<F>
): <A, R, E>(e: Either<unknown, A>) => Kind3<F, R, E, Option<A>>
export function fromEither<F extends URIS3, E>(
  F: Pointed3C<F, E>
): <A, R>(e: Either<unknown, A>) => Kind3<F, R, E, Option<A>>
export function fromEither<F extends URIS2>(F: Pointed2<F>): <A, E>(e: Either<unknown, A>) => Kind2<F, E, Option<A>>
export function fromEither<F extends URIS2, E>(F: Pointed2C<F, E>): <A>(e: Either<unknown, A>) => Kind2<F, E, Option<A>>
export function fromEither<F extends URIS2, E>(F: Pointed2C<F, E>): <A>(e: Either<unknown, A>) => Kind2<F, E, Option<A>>
export function fromEither<F extends URIS>(F: Pointed1<F>): <A>(e: Either<unknown, A>) => Kind<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <A>(e: Either<unknown, A>) => HKT<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <A>(e: Either<unknown, A>) => HKT<F, Option<A>> {
  return flow(O.fromEither, F.of)
}

/**
 * @category pattern matching
 * @since 2.10.0
 */
export function match<F extends URIS4>(
  F: Functor4<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <S, R, E>(ma: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, B>
export function match<F extends URIS3>(
  F: Functor3<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <R, E>(ma: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, B>
export function match<F extends URIS3, E>(
  F: Functor3C<F, E>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <R>(ma: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, B>
export function match<F extends URIS2>(
  F: Functor2<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <E>(ma: Kind2<F, E, Option<A>>) => Kind2<F, E, B>
export function match<F extends URIS2, E>(
  F: Functor2C<F, E>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: Kind2<F, E, Option<A>>) => Kind2<F, E, B>
export function match<F extends URIS>(
  F: Functor1<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: Kind<F, Option<A>>) => Kind<F, B>
export function match<F>(
  F: Functor<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: HKT<F, Option<A>>) => HKT<F, B>
export function match<F>(
  F: Functor<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: HKT<F, Option<A>>) => HKT<F, B> {
  return (onNone, onSome) => (ma) => F.map(ma, O.match(onNone, onSome))
}

/**
 * @since 2.10.0
 */
export function matchE<M extends URIS4>(
  M: Chain4<M>
): <S, R, E, B, A>(
  onNone: () => Kind4<M, S, R, E, B>,
  onSome: (a: A) => Kind4<M, S, R, E, B>
) => (ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, B>
export function matchE<M extends URIS3>(
  M: Chain3<M>
): <R, E, B, A>(
  onNone: () => Kind3<M, R, E, B>,
  onSome: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, B>
export function matchE<M extends URIS3, E>(
  M: Chain3C<M, E>
): <R, B, A>(
  onNone: () => Kind3<M, R, E, B>,
  onSome: (a: A) => Kind3<M, R, E, B>
) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, B>
export function matchE<M extends URIS2>(
  M: Chain2<M>
): <E, B, A>(
  onNone: () => Kind2<M, E, B>,
  onSome: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, B>
export function matchE<M extends URIS2, E>(
  M: Chain2C<M, E>
): <B, A>(
  onNone: () => Kind2<M, E, B>,
  onSome: (a: A) => Kind2<M, E, B>
) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, B>
export function matchE<M extends URIS>(
  M: Chain1<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B>
export function matchE<M>(
  M: Chain<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B>
export function matchE<M>(
  M: Chain<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B> {
  return (onNone, onSome) => (ma) => M.chain(ma, O.match(onNone, onSome))
}

/**
 * @since 2.10.0
 */
export function getOrElse<M extends URIS4>(
  M: Monad4<M>
): <S, R, E, A>(onNone: Lazy<Kind4<M, S, R, E, A>>) => (fa: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, A>
export function getOrElse<M extends URIS3>(
  M: Monad3<M>
): <R, E, A>(onNone: Lazy<Kind3<M, R, E, A>>) => (fa: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, A>
export function getOrElse<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A>(onNone: Lazy<Kind3<M, R, E, A>>) => (fa: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, A>
export function getOrElse<M extends URIS2>(
  M: Monad2<M>
): <E, A>(onNone: Lazy<Kind2<M, E, A>>) => (fa: Kind2<M, E, Option<A>>) => Kind2<M, E, A>
export function getOrElse<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A>(onNone: Lazy<Kind2<M, E, A>>) => (fa: Kind2<M, E, Option<A>>) => Kind2<M, E, A>
export function getOrElse<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export function getOrElse<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A>
export function getOrElse<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A> {
  return (onNone) => (fa) => M.chain(fa, O.match(onNone, M.of))
}

/**
 * @since 2.10.0
 */
export function map<F extends URIS4>(
  F: Functor4<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, Option<B>>
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, Option<B>>
export function map<F extends URIS3, E>(
  F: Functor3C<F, E>
): <A, B>(f: (a: A) => B) => <R>(fa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, Option<B>>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, Option<A>>) => Kind2<F, E, Option<B>>
export function map<F extends URIS2, E>(
  F: Functor2C<F, E>
): <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, Option<A>>) => Kind2<F, E, Option<B>>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>> {
  return map_(F, O.Functor)
}

/**
 * @since 2.10.0
 */
export function ap<F extends URIS4>(
  F: Apply4<F>
): <S, R, E, A>(
  fa: Kind4<F, S, R, E, Option<A>>
) => <B>(fab: Kind4<F, S, R, E, Option<(a: A) => B>>) => Kind4<F, S, R, E, Option<B>>
export function ap<F extends URIS3>(
  F: Apply3<F>
): <R, E, A>(
  fa: Kind3<F, R, E, Option<A>>
) => <B>(fab: Kind3<F, R, E, Option<(a: A) => B>>) => Kind3<F, R, E, Option<B>>
export function ap<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, A>(fa: Kind3<F, R, E, Option<A>>) => <B>(fab: Kind3<F, R, E, Option<(a: A) => B>>) => Kind3<F, R, E, Option<B>>
export function ap<F extends URIS2>(
  F: Apply2<F>
): <E, A>(fa: Kind2<F, E, Option<A>>) => <B>(fab: Kind2<F, E, Option<(a: A) => B>>) => Kind2<F, E, Option<B>>
export function ap<F extends URIS2, E>(
  F: Apply2C<F, E>
): <A>(fa: Kind2<F, E, Option<A>>) => <B>(fab: Kind2<F, E, Option<(a: A) => B>>) => Kind2<F, E, Option<B>>
export function ap<F extends URIS>(
  F: Apply1<F>
): <A>(fa: Kind<F, Option<A>>) => <B>(fab: Kind<F, Option<(a: A) => B>>) => Kind<F, Option<B>>
export function ap<F>(
  F: Apply<F>
): <A>(fa: HKT<F, Option<A>>) => <B>(fab: HKT<F, Option<(a: A) => B>>) => HKT<F, Option<B>>
export function ap<F>(
  F: Apply<F>
): <A>(fa: HKT<F, Option<A>>) => <B>(fab: HKT<F, Option<(a: A) => B>>) => HKT<F, Option<B>> {
  return ap_(F, O.Apply)
}

/**
 * @since 2.10.0
 */
export function chain<M extends URIS4>(
  M: Monad4<M>
): <A, S, R, E, B>(
  f: (a: A) => Kind4<M, S, R, E, Option<B>>
) => (ma: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<B>>
export function chain<M extends URIS3>(
  M: Monad3<M>
): <A, R, E, B>(f: (a: A) => Kind3<M, R, E, Option<B>>) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chain<M extends URIS3, E>(
  M: Monad3C<M, E>
): <A, R, B>(f: (a: A) => Kind3<M, R, E, Option<B>>) => (ma: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<B>>
export function chain<M extends URIS2>(
  M: Monad2<M>
): <A, E, B>(f: (a: A) => Kind2<M, E, Option<B>>) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chain<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(f: (a: A) => Kind2<M, E, Option<B>>) => (ma: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<B>>
export function chain<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>> {
  const zeroM = zero(M)
  return (f) => (ma) =>
    M.chain(
      ma,
      O.match(() => zeroM(), f)
    )
}

/**
 * @since 2.10.0
 */
export function alt<M extends URIS4>(
  M: Monad4<M>
): <S, R, E, A>(
  second: Lazy<Kind4<M, S, R, E, Option<A>>>
) => (first: Kind4<M, S, R, E, Option<A>>) => Kind4<M, S, R, E, Option<A>>
export function alt<M extends URIS3>(
  M: Monad3<M>
): <R, E, A>(second: Lazy<Kind3<M, R, E, Option<A>>>) => (first: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<A>>
export function alt<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A>(second: Lazy<Kind3<M, R, E, Option<A>>>) => (first: Kind3<M, R, E, Option<A>>) => Kind3<M, R, E, Option<A>>
export function alt<M extends URIS2>(
  M: Monad2<M>
): <E, A>(second: Lazy<Kind2<M, E, Option<A>>>) => (first: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<A>>
export function alt<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A>(second: Lazy<Kind2<M, E, Option<A>>>) => (first: Kind2<M, E, Option<A>>) => Kind2<M, E, Option<A>>
export function alt<M extends URIS>(
  M: Monad1<M>
): <A>(second: Lazy<Kind<M, Option<A>>>) => (first: Kind<M, Option<A>>) => Kind<M, Option<A>>
export function alt<M>(
  M: Monad<M>
): <A>(second: Lazy<HKT<M, Option<A>>>) => (first: HKT<M, Option<A>>) => HKT<M, Option<A>>
export function alt<M>(
  M: Monad<M>
): <A>(second: Lazy<HKT<M, Option<A>>>) => (first: HKT<M, Option<A>>) => HKT<M, Option<A>> {
  const _some = some(M)
  return (second) => (first) => M.chain(first, O.match(second, _some))
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface OptionT<M, A> extends HKT<M, Option<A>> {}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly alt: <A>(fa: OptionT<M, A>, that: Lazy<OptionT<M, A>>) => OptionT<M, A>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, R>>, onSome: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, A>>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export type OptionT1<M extends URIS, A> = Kind<M, Option<A>>

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly alt: <A>(fa: OptionT1<M, A>, that: Lazy<OptionT1<M, A>>) => OptionT1<M, A>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, R>>, onSome: (a: A) => Kind<M, R>) => Kind<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, A>>) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export type OptionT2<M extends URIS2, E, A> = Kind2<M, E, Option<A>>

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, O.URI> {
  readonly chain: <E, A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <E, A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}

/**
 * @category zone of death
 * @since 2.2.0
 * @deprecated
 */
export interface OptionM2C<M extends URIS2, E> extends ApplicativeComposition2C1<M, O.URI, E> {
  readonly chain: <A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}

/**
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
/** @deprecated */
export function getOptionM<M extends URIS2, E>(M: Monad2C<M, E>): OptionM2C<M, E>
/** @deprecated */
export function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
/** @deprecated */
export function getOptionM<M>(M: Monad<M>): OptionM<M>
/** @deprecated */
export function getOptionM<M>(M: Monad<M>): OptionM<M> {
  const apM = ap(M)
  const mapM = map(M)
  const chainM = chain(M)
  const altM = alt(M)
  const foldM = matchE(M)
  const getOrElseM = getOrElse(M)
  const zeroM = zero(M)

  return {
    map: (fa, f) => pipe(fa, mapM(f)),
    ap: (fab, fa) => pipe(fab, apM(fa)),
    of: some(M),
    chain: (ma, f) => pipe(ma, chainM(f)),
    alt: (fa, that) => pipe(fa, altM(that)),
    fold: (fa, onNone, onSome) => pipe(fa, foldM(onNone, onSome)),
    getOrElse: (fa, onNone) => pipe(fa, getOrElseM(onNone)),
    fromM: fromF(M),
    none: () => zeroM()
  }
}
