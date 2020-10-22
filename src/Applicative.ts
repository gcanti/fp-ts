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
 * 1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
 * 2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
 * 3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`
 *
 * Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`
 *
 * @since 2.0.0
 */
import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply4, Apply3C } from './Apply'
import {
  FunctorComposition,
  FunctorCompositionHKT1,
  FunctorCompositionHKT2,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition12C,
  FunctorComposition21,
  FunctorComposition22,
  FunctorComposition22C,
  FunctorComposition2C1,
  getFunctorComposition,
  FunctorCompositionHKT2C
} from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative<F> extends Apply<F> {
  readonly of: <A>(a: A) => HKT<F, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative1<F extends URIS> extends Apply1<F> {
  readonly of: <A>(a: A) => Kind<F, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative2<F extends URIS2> extends Apply2<F> {
  readonly of: <E, A>(a: A) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative2C<F extends URIS2, E> extends Apply2C<F, E> {
  readonly of: <A>(a: A) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative3<F extends URIS3> extends Apply3<F> {
  readonly of: <R, E, A>(a: A) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Applicative3C<F extends URIS3, E> extends Apply3C<F, E> {
  readonly of: <R, A>(a: A) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Applicative4<F extends URIS4> extends Apply4<F> {
  readonly of: <S, R, E, A>(a: A) => Kind4<F, S, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  readonly of: <A>(a: A) => HKT<F, HKT<G, A>>
  readonly ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeCompositionHKT1<F, G extends URIS> extends FunctorCompositionHKT1<F, G> {
  readonly of: <A>(a: A) => HKT<F, Kind<G, A>>
  readonly ap: <A, B>(fgab: HKT<F, Kind<G, (a: A) => B>>, fga: HKT<F, Kind<G, A>>) => HKT<F, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeCompositionHKT2<F, G extends URIS2> extends FunctorCompositionHKT2<F, G> {
  readonly of: <E, A>(a: A) => HKT<F, Kind2<G, E, A>>
  readonly ap: <E, A, B>(fgab: HKT<F, Kind2<G, E, (a: A) => B>>, fga: HKT<F, Kind2<G, E, A>>) => HKT<F, Kind2<G, E, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeCompositionHKT2C<F, G extends URIS2, E> extends FunctorCompositionHKT2C<F, G, E> {
  readonly of: <A>(a: A) => HKT<F, Kind2<G, E, A>>
  readonly ap: <A, B>(fgab: HKT<F, Kind2<G, E, (a: A) => B>>, fga: HKT<F, Kind2<G, E, A>>) => HKT<F, Kind2<G, E, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition11<F extends URIS, G extends URIS> extends FunctorComposition11<F, G> {
  readonly of: <A>(a: A) => Kind<F, Kind<G, A>>
  readonly ap: <A, B>(fgab: Kind<F, Kind<G, (a: A) => B>>, fga: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition12<F extends URIS, G extends URIS2> extends FunctorComposition12<F, G> {
  readonly of: <E, A>(a: A) => Kind<F, Kind2<G, E, A>>
  readonly ap: <E, A, B>(
    fgab: Kind<F, Kind2<G, E, (a: A) => B>>,
    fga: Kind<F, Kind2<G, E, A>>
  ) => Kind<F, Kind2<G, E, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition12C<F extends URIS, G extends URIS2, E> extends FunctorComposition12C<F, G, E> {
  readonly of: <A>(a: A) => Kind<F, Kind2<G, E, A>>
  readonly ap: <A, B>(fgab: Kind<F, Kind2<G, E, (a: A) => B>>, fga: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition21<F extends URIS2, G extends URIS> extends FunctorComposition21<F, G> {
  readonly of: <E, A>(a: A) => Kind2<F, E, Kind<G, A>>
  readonly ap: <E, A, B>(
    fgab: Kind2<F, E, Kind<G, (a: A) => B>>,
    fga: Kind2<F, E, Kind<G, A>>
  ) => Kind2<F, E, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition2C1<F extends URIS2, G extends URIS, E> extends FunctorComposition2C1<F, G, E> {
  readonly of: <A>(a: A) => Kind2<F, E, Kind<G, A>>
  readonly ap: <A, B>(fgab: Kind2<F, E, Kind<G, (a: A) => B>>, fga: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition22<F extends URIS2, G extends URIS2> extends FunctorComposition22<F, G> {
  readonly of: <FE, GE, A>(a: A) => Kind2<F, FE, Kind2<G, GE, A>>
  readonly ap: <FE, GE, A, B>(
    fgab: Kind2<F, FE, Kind2<G, GE, (a: A) => B>>,
    fga: Kind2<F, FE, Kind2<G, GE, A>>
  ) => Kind2<F, FE, Kind2<G, GE, B>>
}

/**
 * @since 2.0.0
 */
export interface ApplicativeComposition22C<F extends URIS2, G extends URIS2, E> extends FunctorComposition22C<F, G, E> {
  readonly of: <FE, A>(a: A) => Kind2<F, FE, Kind2<G, E, A>>
  readonly ap: <FE, A, B>(
    fgab: Kind2<F, FE, Kind2<G, E, (a: A) => B>>,
    fga: Kind2<F, FE, Kind2<G, E, A>>
  ) => Kind2<F, FE, Kind2<G, E, B>>
}

/**
 * Like `Functor`, `Applicative`s compose. If `F` and `G` have `Applicative` instances, then so does `F<G<_>>`
 *
 * @example
 * import { getApplicativeComposition } from 'fp-ts/Applicative'
 * import { option, Option, some } from 'fp-ts/Option'
 * import { task, Task } from 'fp-ts/Task'
 *
 * // an Applicative instance for Task<Option<A>>
 * const A = getApplicativeComposition(task, option)
 *
 * const x: Task<Option<number>> = task.of(some(1))
 * const y: Task<Option<number>> = task.of(some(2))
 *
 * const sum = (a: number) => (b: number): number => a + b
 *
 * A.ap(A.map(x, sum), y)()
 *   .then(result => assert.deepStrictEqual(result, some(3)))
 *
 * @since 2.0.0
 */
export function getApplicativeComposition<F extends URIS2, G extends URIS2, E>(
  F: Applicative2<F>,
  G: Applicative2C<G, E>
): ApplicativeComposition22C<F, G, E>
export function getApplicativeComposition<F extends URIS2, G extends URIS2>(
  F: Applicative2<F>,
  G: Applicative2<G>
): ApplicativeComposition22<F, G>
export function getApplicativeComposition<F extends URIS2, G extends URIS2, E>(
  F: Applicative2<F>,
  G: Applicative2C<G, E>
): ApplicativeComposition22C<F, G, E>
export function getApplicativeComposition<F extends URIS2, G extends URIS>(
  F: Applicative2<F>,
  G: Applicative1<G>
): ApplicativeComposition21<F, G>
export function getApplicativeComposition<F extends URIS, G extends URIS2>(
  F: Applicative1<F>,
  G: Applicative2<G>
): ApplicativeComposition12<F, G>
export function getApplicativeComposition<F extends URIS, G extends URIS2, E>(
  F: Applicative1<F>,
  G: Applicative2C<G, E>
): ApplicativeComposition12C<F, G, E>
export function getApplicativeComposition<F extends URIS, G extends URIS>(
  F: Applicative1<F>,
  G: Applicative1<G>
): ApplicativeComposition11<F, G>
export function getApplicativeComposition<F, G extends URIS2>(
  F: Applicative<F>,
  G: Applicative2<G>
): ApplicativeCompositionHKT2<F, G>
export function getApplicativeComposition<F, G extends URIS2, E>(
  F: Applicative<F>,
  G: Applicative2C<G, E>
): ApplicativeCompositionHKT2C<F, G, E>
export function getApplicativeComposition<F, G extends URIS>(
  F: Applicative<F>,
  G: Applicative1<G>
): ApplicativeCompositionHKT1<F, G>
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G>
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G> {
  return {
    map: getFunctorComposition(F, G).map,
    of: (a) => F.of(G.of(a)),
    ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>> =>
      F.ap(
        F.map(fgab, (h) => (ga: HKT<G, A>) => G.ap<A, B>(h, ga)),
        fga
      )
  }
}
