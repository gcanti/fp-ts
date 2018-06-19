import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { fromEither, Option } from './Option'
import { Either, fromOption } from './Either'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'

export type Separated<A, B> = {
  left: A
  right: B
}
/**
 * @function
 * @since 1.6.3
 */
export const separated = <A, B>(a: A, b: B): Separated<A, B> => ({
  left: a,
  right: b
})

/**
 * @typeclass
 * `Compactable` represents data structures which can be _compacted_/_filtered_.
 * This is a generalization of catMaybes as a new function `compact`. `compact` has relations with {@link Functor}, {@link Applicative}, {@link Monad}, {@link Plus}, and {@link Traversable} in that we can use these classes to provide the ability to operate on a data type by eliminating intermediate Nones. This is useful for representing the filtering out of values, or failure.
 * - {@link compact}
 * - {@link separate}
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Compactable.purs
 */
export interface Compactable<F> {
  readonly URI: F
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}

export interface Compactable1<F extends URIS> {
  readonly URI: F
  readonly compact: <A>(fa: Type<F, Option<A>>) => Type<F, A>
  readonly separate: <A, B>(fa: Type<F, Either<A, B>>) => Separated<Type<F, A>, HKT<F, B>>
}

export interface Compactable2<F extends URIS2> {
  readonly URI: F
  readonly compact: <L, A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <L, A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

export interface Compactable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly compact: <A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

export interface Compactable3<F extends URIS3> {
  readonly URI: F
  readonly compact: <U, L, A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <U, L, A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

export interface Compactable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly compact: <A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

/**
 * Gets default implementation of {@link Compactable.compact} using {@link Compactable.separate}
 * @function
 * @since 1.6.3
 * @experimental
 */
export function getCompact<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'separate'>
): Compactable3C<F, U, L>['compact']
export function getCompact<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'separate'>
): Compactable3<F>['compact']
export function getCompact<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'separate'>
): Compactable2C<F, L>['compact']
export function getCompact<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'separate'>
): Compactable2<F>['compact']
export function getCompact<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'separate'>
): Compactable1<F>['compact']
export function getCompact<F>(F: Functor<F> & Pick<Compactable<F>, 'separate'>): Compactable<F>['compact']
export function getCompact<F>(F: Functor<F> & Pick<Compactable<F>, 'separate'>): Compactable<F>['compact'] {
  return foa => F.separate(F.map(foa, fromOption(null))).right
}

/**
 * Gets default implementation of {@link Compactable.separate} using {@link Compactable.compact}
 * @function
 * @since 1.6.3
 * @experimental
 */
export function getSeparate<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'compact'>
): Compactable3C<F, U, L>['separate']
export function getSeparate<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'compact'>
): Compactable3<F>['separate']
export function getSeparate<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'compact'>
): Compactable2C<F, L>['separate']
export function getSeparate<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'compact'>
): Compactable2<F>['separate']
export function getSeparate<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'compact'>
): Compactable1<F>['separate']
export function getSeparate<F>(F: Functor<F> & Pick<Compactable<F>, 'compact'>): Compactable<F>['separate']
export function getSeparate<F>(F: Functor<F> & Pick<Compactable<F>, 'compact'>): Compactable<F>['separate'] {
  return fela => {
    const left = F.compact(F.map(fela, ela => fromEither(ela.swap())))
    const right = F.compact(F.map(fela, fromEither))
    return separated(left, right)
  }
}
