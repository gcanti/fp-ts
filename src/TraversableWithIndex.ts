import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { FoldableWithIndex, FoldableWithIndex1 } from './FoldableWithIndex'
import { FunctorWithIndex, FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Traversable2v, Traversable2v1 } from './Traversable2v'

/**
 * A {@link Traversable} with an additional index.
 * A `TraversableWithIndex` instance must be compatible with its {@link Traversable} instance
 *
 * ```ts
 * traverse(F)(ta, f) = traverseWithIndex(F)(ta, (_, a) => f(a))
 * ```
 *
 * with its {@link FoldableWithIndex} instance
 *
 * ```ts
 * foldMapWithIndex(M)(ta, f) = traverseWithIndex(getApplicative(M))(ta, (i, a) => new Const(f(i, a))).value
 * ```
 *
 * and with its {@link FunctorWithIndex} instance
 *
 * ```purescript
 * mapWithIndex(ta, f) = traverseWithIndex(identity)(ta, (i, a) => new Identity(f(i, a))).value
 * ```
 *
 * @typeclass
 * @since 1.12.0
 */
export interface TraversableWithIndex<T, I> extends FunctorWithIndex<T, I>, FoldableWithIndex<T, I>, Traversable2v<T> {
  readonly traverseWithIndex: TraverseWithIndex<T, I>
}

export interface TraversableWithIndex1<T extends URIS, I>
  extends FunctorWithIndex1<T, I>,
    FoldableWithIndex1<T, I>,
    Traversable2v1<T> {
  readonly traverseWithIndex: TraverseWithIndex1<T, I>
}

export interface TraverseWithIndex<T, I> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, HKT<T, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: HKT<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<T, A>, f: (i: I, a: A) => Type<F, B>) => Type<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

export interface TraverseWithIndex1<T extends URIS, I> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type<T, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type<T, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<T, A>, f: (i: I, a: A) => Type<F, B>) => Type<F, Type<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
}
