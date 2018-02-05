import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import { Apply, Apply2, Apply3, Apply2C, Apply3C, Apply1 } from './Apply'
import {
  getFunctorComposition,
  FunctorComposition,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition21,
  FunctorComposition22,
  FunctorComposition12C
} from './Functor'

/** @typeclass */
export interface Applicative<F> extends Apply<F> {
  of: <A>(a: A) => HKT<F, A>
}

export interface Applicative1<F extends URIS> extends Apply1<F> {
  of: <A>(a: A) => Type<F, A>
}

export interface Applicative2<F extends URIS2> extends Apply2<F> {
  of: <L, A>(a: A) => Type2<F, L, A>
}

export interface Applicative3<F extends URIS3> extends Apply3<F> {
  of: <U, L, A>(a: A) => Type3<F, U, L, A>
}

export interface Applicative2C<F extends URIS2, L> extends Apply2C<F, L> {
  of: <A>(a: A) => Type2<F, L, A>
}

export interface Applicative3C<F extends URIS3, U, L> extends Apply3C<F, U, L> {
  of: <A>(a: A) => Type3<F, U, L, A>
}

export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  of: <A>(a: A) => HKT<F, HKT<G, A>>
  ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}

export interface ApplicativeComposition11<F extends URIS, G extends URIS> extends FunctorComposition11<F, G> {
  of: <A>(a: A) => Type<F, Type<G, A>>
  ap: <A, B>(fgab: Type<F, Type<G, (a: A) => B>>, fga: Type<F, Type<G, A>>) => Type<F, Type<G, B>>
}

export interface ApplicativeComposition12<F extends URIS, G extends URIS2> extends FunctorComposition12<F, G> {
  of: <L, A>(a: A) => Type<F, Type2<G, L, A>>
  ap: <L, A, B>(fgab: Type<F, Type2<G, L, (a: A) => B>>, fga: Type<F, Type2<G, L, A>>) => Type<F, Type2<G, L, B>>
}

export interface ApplicativeComposition12C<F extends URIS, G extends URIS2, L> extends FunctorComposition12C<F, G, L> {
  of: <A>(a: A) => Type<F, Type2<G, L, A>>
  ap: <A, B>(fgab: Type<F, Type2<G, L, (a: A) => B>>, fga: Type<F, Type2<G, L, A>>) => Type<F, Type2<G, L, B>>
}

export interface ApplicativeComposition21<F extends URIS2, G extends URIS> extends FunctorComposition21<F, G> {
  of: <L, A>(a: A) => Type2<F, L, Type<G, A>>
  ap<L, A, B>(fgab: Type2<F, L, Type<G, (a: A) => B>>, fga: Type2<F, L, Type<G, A>>): Type2<F, L, Type<G, B>>
}

export interface ApplicativeComposition22<F extends URIS2, G extends URIS2> extends FunctorComposition22<F, G> {
  of: <LF, LG, A>(a: A) => Type2<F, LF, Type2<G, LG, A>>
  ap<LF, LG, A, B>(
    fgab: Type2<F, LF, Type2<G, LG, (a: A) => B>>,
    fga: Type2<F, LF, Type2<G, LG, A>>
  ): Type2<F, LF, Type2<G, LG, B>>
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
 */
export function when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void> {
  return (condition, fu) => (condition ? fu : F.of(undefined))
}

export function getApplicativeComposition<F extends URIS2, G extends URIS2>(
  F: Applicative2<F>,
  G: Applicative2<G>
): ApplicativeComposition22<F, G>
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
/** @function */
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    of: a => F.of(G.of(a)),
    ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>> =>
      F.ap(F.map(fgab, h => (ga: HKT<G, A>) => G.ap<A, B>(h, ga)), fga)
  }
}
