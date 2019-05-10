/**
 * @file A `Traversable` with an additional index.
 * A `TraversableWithIndex` instance must be compatible with its `Traversable` instance
 *
 * ```ts
 * traverse(F)(ta, f) = traverseWithIndex(F)(ta, (_, a) => f(a))
 * ```
 *
 * with its `FoldableWithIndex` instance
 *
 * ```ts
 * foldMapWithIndex(M)(ta, f) = traverseWithIndex(getApplicative(M))(ta, (i, a) => new Const(f(i, a))).value
 * ```
 *
 * and with its `FunctorWithIndex` instance
 *
 * ```purescript
 * mapWithIndex(ta, f) = traverseWithIndex(identity)(ta, (i, a) => new Identity(f(i, a))).value
 * ```
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3 } from './Applicative'
import { FoldableWithIndex, FoldableWithIndex1, FoldableWithIndex2, FoldableWithIndex2C } from './FoldableWithIndex'
import { FunctorWithIndex, FunctorWithIndex1, FunctorWithIndex2, FunctorWithIndex2C } from './FunctorWithIndex'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Traversable, Traversable1, Traversable2, Traversable2C } from './Traversable'

/**
 * @since 2.0.0
 */
export interface TraversableWithIndex<T, I> extends FunctorWithIndex<T, I>, FoldableWithIndex<T, I>, Traversable<T> {
  readonly traverseWithIndex: TraverseWithIndex<T, I>
}

export interface TraversableWithIndex1<T extends URIS, I>
  extends FunctorWithIndex1<T, I>,
    FoldableWithIndex1<T, I>,
    Traversable1<T> {
  readonly traverseWithIndex: TraverseWithIndex1<T, I>
}

export interface TraversableWithIndex2<T extends URIS2, I>
  extends FunctorWithIndex2<T, I>,
    FoldableWithIndex2<T, I>,
    Traversable2<T> {
  readonly traverseWithIndex: TraverseWithIndex2<T, I>
}

export interface TraversableWithIndex2C<T extends URIS2, I, L>
  extends FunctorWithIndex2C<T, I, L>,
    FoldableWithIndex2C<T, I, L>,
    Traversable2C<T, L> {
  readonly traverseWithIndex: TraverseWithIndex2C<T, I, L>
}

export interface TraverseWithIndex<T, I> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
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

export interface TraverseWithIndex2<T extends URIS2, I> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, FL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS>(F: Applicative1<F>): <FL, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type<F, B>
  ) => Type<F, Type2<T, FL, B>>
  <F>(F: Applicative<F>): <FL, A, B>(ta: Type2<T, FL, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Type2<T, FL, B>>
}

export interface TraverseWithIndex2C<T extends URIS2, I, FL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, FL, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS2>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, FL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type2<T, FL, A>,
    f: (i: I, a: A) => Type<F, B>
  ) => Type<F, Type2<T, FL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<T, FL, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, Type2<T, FL, B>>
}
