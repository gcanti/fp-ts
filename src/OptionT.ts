/**
 * @since 3.0.0
 */
import { Apply, Apply1, ap as ap_ } from './Apply'
import { Chain1, Chain } from './Chain'
import { Either } from './Either'
import { flow, Lazy, Predicate, Refinement } from './function'
import { Functor, Functor1, map as map_ } from './Functor'
import { HKT, Kind, URIS } from './HKT'
import { Monad, Monad1 } from './Monad'
import * as O from './Option'
import { Pointed, Pointed1 } from './Pointed'

import Option = O.Option

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function some<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>>
export function some<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>> {
  return flow(O.some, F.of)
}

/**
 * @since 3.0.0
 */
export function none<F extends URIS>(F: Pointed1<F>): Kind<F, Option<never>>
export function none<F>(F: Pointed<F>): HKT<F, Option<never>>
export function none<F>(F: Pointed<F>): HKT<F, Option<never>> {
  return F.of(O.none)
}

/**
 * @since 3.0.0
 */
export function fromF<F extends URIS>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>>
export function fromF<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>> {
  return F.map(O.some)
}

/**
 * @since 3.0.0
 */
export function fromNullable<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<NonNullable<A>>> {
  return flow(O.fromNullable, F.of)
}

/**
 * @since 3.0.0
 */
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
 * @since 3.0.0
 */
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
 * @since 3.0.0
 */
export function fromPredicate<F extends URIS>(
  F: Pointed1<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Kind<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => Kind<F, Option<A>>
}
export function fromPredicate<F>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
}
export function fromPredicate<F>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
} {
  return <A>(predicate: Predicate<A>) => (a: A) => F.of(O.fromPredicate(predicate)(a))
}

/**
 * @since 3.0.0
 */
export function fromEither<F extends URIS>(F: Pointed1<F>): <E, A>(e: Either<E, A>) => Kind<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>>
export function fromEither<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>> {
  return flow(O.fromEither, F.of)
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<M extends URIS>(
  M: Chain1<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B>
export function match<M>(
  M: Chain<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B>
export function match<M>(
  M: Chain<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B> {
  return flow(O.match, M.chain)
}

/**
 * @since 3.0.0
 */
export function getOrElse<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export function getOrElse<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A>
export function getOrElse<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A> {
  return (onNone) => M.chain(O.match(onNone, M.of))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
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
 * @since 3.0.0
 */
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

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>> {
  return map_(F, O.Functor)
}

/**
 * @since 3.0.0
 */
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
 * @since 3.0.0
 */
export function chain<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>>
export function chain<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>> {
  const _none = none(M)
  return (f) => M.chain(O.match(() => _none, f))
}

/**
 * @since 3.0.0
 */
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
  return (second) => M.chain(O.match(second, _some))
}
