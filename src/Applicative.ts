import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, getSemigroup } from './Apply'
import {
  FunctorComposition,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition12C,
  FunctorComposition21,
  FunctorComposition22,
  FunctorComposition22C,
  FunctorComposition2C1,
  FunctorComposition3C1,
  getFunctorComposition
} from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monoid } from './Monoid'

/**
 * The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
 * of type `f a` from values of type `a`.
 *
 * Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
 * wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
 * function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
 * any number of function arguments.
 *
 * Instances must satisfy the following laws in addition to the `Apply` laws:
 *
 * 1. Identity: `A.ap(A.of(a => a), fa) = fa`
 * 2. Homomorphism: `A.ap(A.of(ab), A.of(a)) = A.of(ab(a))`
 * 3. Interchange: A.ap(fab, A.of(a)) = A.ap(A.of(ab => ab(a)), fab)
 *
 * Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`
 *
 * @typeclass
 */
export interface Applicative<F> extends Apply<F> {
  readonly of: <A>(a: A) => HKT<F, A>
}

export interface Applicative1<F extends URIS> extends Apply1<F> {
  readonly of: <A>(a: A) => Type<F, A>
}

export interface Applicative2<F extends URIS2> extends Apply2<F> {
  readonly of: <L, A>(a: A) => Type2<F, L, A>
}

export interface Applicative3<F extends URIS3> extends Apply3<F> {
  readonly of: <U, L, A>(a: A) => Type3<F, U, L, A>
}

export interface Applicative2C<F extends URIS2, L> extends Apply2C<F, L> {
  readonly of: <A>(a: A) => Type2<F, L, A>
}

export interface Applicative3C<F extends URIS3, U, L> extends Apply3C<F, U, L> {
  readonly of: <A>(a: A) => Type3<F, U, L, A>
}

export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  readonly of: <A>(a: A) => HKT<F, HKT<G, A>>
  readonly ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}

export interface ApplicativeComposition11<F extends URIS, G extends URIS> extends FunctorComposition11<F, G> {
  readonly of: <A>(a: A) => Type<F, Type<G, A>>
  readonly ap: <A, B>(fgab: Type<F, Type<G, (a: A) => B>>, fga: Type<F, Type<G, A>>) => Type<F, Type<G, B>>
}

export interface ApplicativeComposition12<F extends URIS, G extends URIS2> extends FunctorComposition12<F, G> {
  readonly of: <L, A>(a: A) => Type<F, Type2<G, L, A>>
  readonly ap: <L, A, B>(
    fgab: Type<F, Type2<G, L, (a: A) => B>>,
    fga: Type<F, Type2<G, L, A>>
  ) => Type<F, Type2<G, L, B>>
}

export interface ApplicativeComposition12C<F extends URIS, G extends URIS2, L> extends FunctorComposition12C<F, G, L> {
  readonly of: <A>(a: A) => Type<F, Type2<G, L, A>>
  readonly ap: <A, B>(fgab: Type<F, Type2<G, L, (a: A) => B>>, fga: Type<F, Type2<G, L, A>>) => Type<F, Type2<G, L, B>>
}

export interface ApplicativeComposition21<F extends URIS2, G extends URIS> extends FunctorComposition21<F, G> {
  readonly of: <L, A>(a: A) => Type2<F, L, Type<G, A>>
  readonly ap: <L, A, B>(
    fgab: Type2<F, L, Type<G, (a: A) => B>>,
    fga: Type2<F, L, Type<G, A>>
  ) => Type2<F, L, Type<G, B>>
}

export interface ApplicativeComposition2C1<F extends URIS2, G extends URIS, L> extends FunctorComposition2C1<F, G, L> {
  readonly of: <A>(a: A) => Type2<F, L, Type<G, A>>
  readonly ap: <A, B>(fgab: Type2<F, L, Type<G, (a: A) => B>>, fga: Type2<F, L, Type<G, A>>) => Type2<F, L, Type<G, B>>
}

export interface ApplicativeComposition22<F extends URIS2, G extends URIS2> extends FunctorComposition22<F, G> {
  readonly of: <L, M, A>(a: A) => Type2<F, L, Type2<G, M, A>>
  readonly ap: <L, M, A, B>(
    fgab: Type2<F, L, Type2<G, M, (a: A) => B>>,
    fga: Type2<F, L, Type2<G, M, A>>
  ) => Type2<F, L, Type2<G, M, B>>
}

export interface ApplicativeComposition22C<F extends URIS2, G extends URIS2, M> extends FunctorComposition22C<F, G, M> {
  readonly of: <L, A>(a: A) => Type2<F, L, Type2<G, M, A>>
  readonly ap: <L, A, B>(
    fgab: Type2<F, L, Type2<G, M, (a: A) => B>>,
    fga: Type2<F, L, Type2<G, M, A>>
  ) => Type2<F, L, Type2<G, M, B>>
}

export interface ApplicativeComposition3C1<F extends URIS3, G extends URIS, U, L>
  extends FunctorComposition3C1<F, G, U, L> {
  readonly of: <A>(a: A) => Type3<F, U, L, Type<G, A>>
  readonly ap: <A, B>(
    fgab: Type3<F, U, L, Type<G, (a: A) => B>>,
    fga: Type3<F, U, L, Type<G, A>>
  ) => Type3<F, U, L, Type<G, B>>
}

/** Perform a applicative action when a condition is true */
export function when<F extends URIS3>(
  F: Applicative3<F>
): <U, L>(condition: boolean, fu: Type3<F, U, L, void>) => Type3<F, U, L, void>
export function when<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (condition: boolean, fu: Type3<F, U, L, void>) => Type3<F, U, L, void>
export function when<F extends URIS2>(
  F: Applicative2<F>
): <L>(condition: boolean, fu: Type2<F, L, void>) => Type2<F, L, void>
export function when<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (condition: boolean, fu: Type2<F, L, void>) => Type2<F, L, void>
export function when<F extends URIS>(F: Applicative1<F>): (condition: boolean, fu: Type<F, void>) => Type<F, void>
export function when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void>
/**
 * Perform a applicative action when a condition is true
 * @function
 * @since 1.0.0
 */
export function when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void> {
  return (condition, fu) => (condition ? fu : F.of(undefined))
}

export function getApplicativeComposition<F extends URIS2, G extends URIS2>(
  F: Applicative2<F>,
  G: Applicative2<G>
): ApplicativeComposition22<F, G>
export function getApplicativeComposition<F extends URIS2, G extends URIS2, L>(
  F: Applicative2<F>,
  G: Applicative2C<G, L>
): ApplicativeComposition22C<F, G, L>
export function getApplicativeComposition<F extends URIS2, G extends URIS>(
  F: Applicative2<F>,
  G: Applicative1<G>
): ApplicativeComposition21<F, G>
export function getApplicativeComposition<F extends URIS, G extends URIS2>(
  F: Applicative1<F>,
  G: Applicative2<G>
): ApplicativeComposition12<F, G>
export function getApplicativeComposition<F extends URIS, G extends URIS2, L>(
  F: Applicative1<F>,
  G: Applicative2C<G, L>
): ApplicativeComposition12C<F, G, L>
export function getApplicativeComposition<F extends URIS, G extends URIS>(
  F: Applicative1<F>,
  G: Applicative1<G>
): ApplicativeComposition11<F, G>
export function getApplicativeComposition<F, G extends URIS2>(
  F: Applicative<F>,
  G: Applicative2<G>
): ApplicativeComposition<F, G>
export function getApplicativeComposition<F, G extends URIS>(
  F: Applicative<F>,
  G: Applicative1<G>
): ApplicativeComposition<F, G>
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G>
/**
 * @function
 * @since 1.0.0
 */
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    of: a => F.of(G.of(a)),
    ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>> =>
      F.ap(F.map(fgab, h => (ga: HKT<G, A>) => G.ap<A, B>(h, ga)), fga)
  }
}

/**
 * If `F` is a `Applicative` and `M` is a `Monoid` over `A` then `HKT<F, A>` is a `Monoid` over `A` as well.
 * Adapted from http://hackage.haskell.org/package/monoids-0.2.0.2/docs/Data-Monoid-Applicative.html
 */
export function getMonoid<F extends URIS3, A>(
  F: Applicative3<F>,
  M: Monoid<A>
): <U = never, L = never>() => Monoid<Type3<F, U, L, A>>
export function getMonoid<F extends URIS3, U, L, A>(
  F: Applicative3C<F, U, L>,
  M: Monoid<A>
): () => Monoid<Type3<F, U, L, A>>
export function getMonoid<F extends URIS2, A>(F: Applicative2<F>, M: Monoid<A>): <L = never>() => Monoid<Type2<F, L, A>>
export function getMonoid<F extends URIS2, L, A>(F: Applicative2C<F, L>, M: Monoid<A>): () => Monoid<Type2<F, L, A>>
export function getMonoid<F extends URIS, A>(F: Applicative1<F>, M: Monoid<A>): () => Monoid<Type<F, A>>
export function getMonoid<F, A>(F: Applicative<F>, M: Monoid<A>): () => Monoid<HKT<F, A>>
/**
 * If `F` is a `Applicative` and `M` is a `Monoid` over `A` then `HKT<F, A>` is a `Monoid` over `A` as well.
 * Adapted from http://hackage.haskell.org/package/monoids-0.2.0.2/docs/Data-Monoid-Applicative.html
 *
 * @example
 * import { getMonoid } from 'fp-ts/lib/Applicative'
 * import { option, some, none } from 'fp-ts/lib/Option'
 * import { monoidSum } from 'fp-ts/lib/Monoid'
 *
 * const M = getMonoid(option, monoidSum)()
 * assert.deepEqual(M.concat(none, none), none)
 * assert.deepEqual(M.concat(some(1), none), none)
 * assert.deepEqual(M.concat(none, some(2)), none)
 * assert.deepEqual(M.concat(some(1), some(2)), some(3))
 *
 * @function
 * @since 1.4.0
 */
export function getMonoid<F, A>(F: Applicative<F>, M: Monoid<A>): () => Monoid<HKT<F, A>> {
  const S = getSemigroup(F, M)()
  return () => ({
    ...S,
    empty: F.of(M.empty)
  })
}
