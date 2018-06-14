import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Function1, Predicate } from './function'
import { Option } from './Option'

/**
 * @typeclass
 * @see https://hackage.haskell.org/package/witherable-0.2/docs/Data-Witherable.html
 */
export interface Filterable<F> {
  readonly URI: F
  readonly mapOption: <A, B>(fa: HKT<F, A>, f: Function1<A, Option<B>>) => HKT<F, B>
  readonly catOptions: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  readonly filter: <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
}

export interface Filterable1<F extends URIS> {
  readonly URI: F
  readonly mapOption: <A, B>(fa: Type<F, A>, f: Function1<A, Option<B>>) => Type<F, B>
  readonly catOptions: <A>(fa: Type<F, Option<A>>) => Type<F, A>
  readonly filter: <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
}

export interface Filterable2<F extends URIS2> {
  readonly URI: F
  readonly mapOption: <L, A, B>(fa: Type2<F, L, A>, f: Function1<A, Option<B>>) => Type2<F, L, B>
  readonly catOptions: <L, A, B>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly filter: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

export interface Filterable2C<F extends URIS2, L> {
  readonly URI: F
  readonly mapOption: <A, B>(fa: Type2<F, L, A>, f: Function1<A, Option<B>>) => Type2<F, L, B>
  readonly catOptions: <A, B>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly filter: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

export interface Filterable3<F extends URIS3> {
  readonly URI: F
  readonly mapOption: <U, L, A, B>(fa: Type3<F, U, L, A>, f: Function1<A, Option<B>>) => Type3<F, U, L, B>
  readonly catOptions: <U, L, A, B>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly filter: <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

export interface Filterable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly mapOption: <A, B>(fa: Type3<F, U, L, A>, f: Function1<A, Option<B>>) => Type3<F, U, L, B>
  readonly catOptions: <A, B>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly filter: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}
