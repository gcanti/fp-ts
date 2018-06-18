import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Option } from './Option'
import { Traversable, Traversable1, Traversable2, Traversable2C, Traversable3, Traversable3C } from './Traversable'
import { Applicative } from './Applicative'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3, Filterable3C } from './Filterable'

/**
 * @typeclass
 * Like Traversable, but you can remove elements instead of updating them.
 * @see https://hackage.haskell.org/package/witherable-0.2/docs/Data-Witherable.html
 */
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  readonly wither: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<T, B>>
}

export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  readonly wither: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<T, B>>
}

export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  readonly wither: <F>(
    F: Applicative<F>
  ) => <L, A, B>(ta: Type2<T, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, L, B>>
}

export interface Witherable2C<T extends URIS2, L> extends Traversable2C<T, L>, Filterable2C<T, L> {
  readonly wither: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: Type2<T, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<T, L, B>>
}

export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  readonly wither: <F>(
    F: Applicative<F>
  ) => <U, L, A, B>(ta: Type3<T, U, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, U, L, B>>
}

export interface Witherable3C<T extends URIS3, U, L> extends Traversable3C<T, U, L>, Filterable3C<T, U, L> {
  readonly wither: <F>(
    F: Applicative<F>
  ) => <A, B>(ta: Type3<T, U, L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<T, U, L, B>>
}
