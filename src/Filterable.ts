import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Predicate } from './function'

/**
 * @typeclass
 * @see http://hackage.haskell.org/package/gore-and-ash-1.2.2.0/docs/Data-Filterable.html
 */
export interface Filterable<F> {
  readonly URI: F
  readonly filter: <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
}

export interface Filterable1<F extends URIS> {
  readonly URI: F
  readonly filter: <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
}

export interface Filterable2<F extends URIS2> {
  readonly URI: F
  readonly filter: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

export interface Filterable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly filter: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

export interface Filterable3<F extends URIS3> {
  readonly URI: F
  readonly filter: <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

export interface Filterable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly filter: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}
