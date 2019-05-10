/**
 * @file `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * `traverse` signature:
 *
 * ```ts
 * <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
 * ```
 *
 * `sequence` signature:
 *
 * ```ts
 * <F>(F: Applicative<F>) => <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
 * ```
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3 } from './Applicative'
import {
  Foldable,
  Foldable1,
  Foldable2,
  Foldable2C,
  Foldable3,
  FoldableComposition,
  FoldableComposition11,
  getFoldableComposition
} from './Foldable'
import {
  Functor,
  Functor1,
  Functor2,
  Functor2C,
  Functor3,
  FunctorComposition,
  FunctorComposition11,
  getFunctorComposition
} from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  /**
   * Runs an action for every element in a data structure and accumulates the results
   */
  readonly traverse: Traverse<T>
  readonly sequence: Sequence<T>
}

/**
 * @since 2.0.0
 */
export interface Traversable1<T extends URIS> extends Functor1<T>, Foldable1<T> {
  readonly traverse: Traverse1<T>
  readonly sequence: Sequence1<T>
}

/**
 * @since 2.0.0
 */
export interface Traversable2<T extends URIS2> extends Functor2<T>, Foldable2<T> {
  readonly traverse: Traverse2<T>
  readonly sequence: Sequence2<T>
}

/**
 * @since 2.0.0
 */
export interface Traversable2C<T extends URIS2, TL> extends Functor2C<T, TL>, Foldable2C<T, TL> {
  readonly traverse: Traverse2C<T, TL>
  readonly sequence: Sequence2C<T, TL>
}

/**
 * @since 2.0.0
 */
export interface Traversable3<T extends URIS3> extends Functor3<T>, Foldable3<T> {
  readonly traverse: Traverse3<T>
  readonly sequence: Sequence3<T>
}

interface Traverse<T> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: HKT<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => Type<F, B>) => Type<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

interface Traverse1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<T, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type<T, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<T, A>, f: (a: A) => Type<F, B>) => Type<F, Type<T, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
}

interface Traverse2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TL, FU, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, TL, B>>
  <F extends URIS2>(F: Applicative2<F>): <TL, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS>(F: Applicative1<F>): <TL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type<F, B>
  ) => Type<F, Type2<T, TL, B>>
  <F>(F: Applicative<F>): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
}

interface Traverse2C<T extends URIS2, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type2<T, TL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<T, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type2<T, TL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type<F, B>) => Type<F, Type2<T, TL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
}

interface Traverse3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TU, TL, FU, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  <F extends URIS2>(F: Applicative2<F>): <TU, TL, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type3<T, TU, TL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TU, TL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type2<F, FL, B>
  ) => Type2<F, FL, Type3<T, TU, TL, B>>
  <F extends URIS>(F: Applicative1<F>): <TU, TL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type<F, B>
  ) => Type<F, Type3<T, TU, TL, B>>
  <F>(F: Applicative<F>): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, TU, TL, B>>
}

interface Sequence<T> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(ta: HKT<T, Type3<F, FU, FL, A>>) => Type3<F, FU, FL, HKT<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: HKT<T, Type2<F, FL, A>>) => Type2<F, FL, HKT<T, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(ta: HKT<T, Type2<F, FL, A>>) => Type2<F, FL, HKT<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: HKT<T, Type<F, A>>) => Type<F, HKT<T, A>>
  <F>(F: Applicative<F>): <A>(ta: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
}

interface Sequence1<T extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(ta: Type<T, Type3<F, FU, FL, A>>) => Type3<F, FU, FL, Type<T, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: Type<T, Type2<F, FL, A>>) => Type2<F, FL, Type<T, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(ta: Type<T, Type2<F, FL, A>>) => Type2<F, FL, Type<T, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Type<T, Type<F, A>>) => Type<F, Type<T, A>>
  <F>(F: Applicative<F>): <A>(ta: Type<T, HKT<F, A>>) => HKT<F, Type<T, A>>
}

interface Sequence2<T extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <TL, FU, FL, A>(
    ta: Type2<T, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type2<T, TL, A>>
  <F extends URIS2>(F: Applicative2<F>): <TL, FL, A>(ta: Type2<T, TL, Type2<F, FL, A>>) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TL, A>(
    ta: Type2<T, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS>(F: Applicative1<F>): <TL, A>(ta: Type2<T, TL, Type<F, A>>) => Type<F, Type2<T, TL, A>>
  <F>(F: Applicative<F>): <TL, A>(ta: Type2<T, TL, HKT<F, A>>) => HKT<F, Type2<T, TL, A>>
}

interface Sequence2C<T extends URIS2, TL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A>(
    ta: Type2<T, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type2<T, TL, A>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A>(ta: Type2<T, TL, Type2<F, FL, A>>) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A>(
    ta: Type2<T, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type2<T, TL, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(ta: Type2<T, TL, Type<F, A>>) => Type<F, Type2<T, TL, A>>
  <F>(F: Applicative<F>): <A>(ta: Type2<T, TL, HKT<F, A>>) => HKT<F, Type2<T, TL, A>>
}

interface Sequence3<T extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <TU, TL, FU, FL, A>(
    ta: Type3<T, TU, TL, Type3<F, FU, FL, A>>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, A>>
  <F extends URIS2>(F: Applicative2<F>): <TU, TL, FL, A>(
    ta: Type3<T, TU, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type3<T, TU, TL, A>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <TU, TL, A>(
    ta: Type3<T, TU, TL, Type2<F, FL, A>>
  ) => Type2<F, FL, Type3<T, TU, TL, A>>
  <F extends URIS>(F: Applicative1<F>): <TU, TL, A>(ta: Type3<T, TU, TL, Type<F, A>>) => Type<F, Type3<T, TU, TL, A>>
  <F>(F: Applicative<F>): <TU, TL, A>(ta: Type3<T, TU, TL, HKT<F, A>>) => HKT<F, Type3<T, TU, TL, A>>
}

export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
  readonly sequence: <H>(H: Applicative<H>) => <A>(fga: HKT<F, HKT<G, HKT<H, A>>>) => HKT<H, HKT<F, HKT<G, A>>>
}

interface TraverseComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <HU, HL, A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type3<H, HU, HL, B>
  ) => Type3<H, HU, HL, Type<F, Type<G, B>>>
  <H extends URIS2>(H: Applicative2<H>): <HL, A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type2<H, HL, B>
  ) => Type2<H, HL, Type<F, Type<G, B>>>
  <H extends URIS2, HL>(H: Applicative2C<H, HL>): <A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type2<H, HL, B>
  ) => Type2<H, HL, Type<F, Type<G, B>>>
  <H extends URIS>(H: Applicative1<H>): <A, B>(
    fga: Type<F, Type<G, A>>,
    f: (a: A) => Type<H, B>
  ) => Type<H, Type<F, Type<G, B>>>
  <H>(H: Applicative<H>): <A, B>(fga: Type<F, Type<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, Type<F, Type<G, B>>>
}

interface SequenceComposition11<F extends URIS, G extends URIS> {
  <H extends URIS3>(H: Applicative3<H>): <HU, HL, A>(
    fga: Type<F, Type<G, Type3<H, HU, HL, A>>>
  ) => Type3<H, HU, HL, Type<F, Type<G, A>>>
  <H extends URIS2>(H: Applicative2<H>): <HL, A>(
    fga: Type<F, Type<G, Type2<H, HL, A>>>
  ) => Type2<H, HL, Type<F, Type<G, A>>>
  <H extends URIS2, HL>(H: Applicative2C<H, HL>): <A>(
    fga: Type<F, Type<G, Type2<H, HL, A>>>
  ) => Type2<H, HL, Type<F, Type<G, A>>>
  <H extends URIS>(H: Applicative1<H>): <A>(fga: Type<F, Type<G, Type<H, A>>>) => Type<H, Type<F, Type<G, A>>>
  <H>(H: Applicative<H>): <A>(fga: Type<F, Type<G, HKT<H, A>>>) => HKT<H, Type<F, Type<G, A>>>
}

export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: TraverseComposition11<F, G>
  readonly sequence: SequenceComposition11<F, G>
}

/**
 * Returns the composition of two traversables
 *
 * @example
 * import { array } from 'fp-ts/lib/Array'
 * import { io } from 'fp-ts/lib/IO'
 * import { none, option, some } from 'fp-ts/lib/Option'
 * import { getTraversableComposition } from 'fp-ts/lib/Traversable'
 *
 * const T = getTraversableComposition(array, option)
 * const state: Record<string, number | undefined> = {
 *   a: 1,
 *   b: 2
 * }
 * const read = (s: string) => () => state[s]
 * const x = T.sequence(io)([some(read('a')), none, some(read('b')), some(read('c'))])
 * assert.deepStrictEqual(x(), [some(1), none, some(2), some(undefined)])
 *
 * @since 2.0.0
 */
export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable1<F>,
  G: Traversable1<G>
): TraversableComposition11<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    ...getFoldableComposition(F, G),
    traverse: H => {
      const traverseF = F.traverse(H)
      const traverseG = G.traverse(H)
      return (fga, f) => traverseF(fga, ga => traverseG(ga, f))
    },
    sequence: H => {
      const sequenceF = F.sequence(H)
      const sequenceG = G.sequence(H)
      return fgha => sequenceF(F.map(fgha, sequenceG))
    }
  }
}
