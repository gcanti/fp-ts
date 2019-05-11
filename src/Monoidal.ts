/**
 * @file `Applicative` functors are equivalent to strong lax monoidal functors
 *
 * - https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
 * - https://bartoszmilewski.com/2017/02/06/applicative-functors/
 */
import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { constant } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Monoidal<F> extends Functor<F> {
  readonly unit: () => HKT<F, void>
  readonly mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [A, B]>
}

/**
 * @since 2.0.0
 */
export interface Monoidal1<F extends URIS> extends Functor1<F> {
  readonly unit: () => Type<F, void>
  readonly mult: <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, [A, B]>
}

/**
 * @since 2.0.0
 */
export interface Monoidal2<F extends URIS2> extends Functor2<F> {
  readonly unit: <L>() => Type2<F, L, void>
  readonly mult: <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>
}

/**
 * @since 2.0.0
 */
export interface Monoidal2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly unit: () => Type2<F, L, void>
  readonly mult: <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>
}

/**
 * @since 2.0.0
 */
export interface Monoidal3<F extends URIS3> extends Functor3<F> {
  readonly unit: <U, L>() => Type3<F, U, L, void>
  readonly mult: <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [A, B]>
}

/**
 * @since 2.0.0
 */
export function fromApplicative<F extends URIS3>(F: Applicative3<F>): Monoidal3<F>
export function fromApplicative<F extends URIS2>(F: Applicative2<F>): Monoidal2<F>
export function fromApplicative<F extends URIS>(F: Applicative1<F>): Monoidal1<F>
export function fromApplicative<F>(F: Applicative<F>): Monoidal<F>
export function fromApplicative<F>(F: Applicative<F>): Monoidal<F> {
  const f = <A>(a: A) => <B>(b: B): [A, B] => [a, b]
  return {
    URI: F.URI,
    map: F.map,
    unit: () => F.of(undefined),
    mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => F.ap(F.map<A, (b: B) => [A, B]>(fa, f), fb)
  }
}

/**
 * @since 2.0.0
 */
export function toApplicative<F extends URIS3>(M: Monoidal3<F>): Applicative3<F>
export function toApplicative<F extends URIS2>(M: Monoidal2<F>): Applicative2<F>
export function toApplicative<F extends URIS>(M: Monoidal1<F>): Applicative1<F>
export function toApplicative<F>(M: Monoidal<F>): Applicative<F>
export function toApplicative<F>(M: Monoidal<F>): Applicative<F> {
  return {
    URI: M.URI,
    map: M.map,
    of: a => M.map(M.unit(), constant(a)),
    ap: (fab, fa) => M.map(M.mult(fab, fa), ([f, a]) => f(a))
  }
}
