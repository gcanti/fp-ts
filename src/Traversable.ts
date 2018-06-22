import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import {
  Foldable,
  Foldable1,
  Foldable2,
  Foldable2C,
  Foldable3,
  Foldable3C,
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
  Functor3C,
  FunctorComposition,
  FunctorComposition11,
  getFunctorComposition
} from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Witherable, Witherable1, Witherable2, Witherable2C, Witherable3, Witherable3C } from './Witherable'
import { some } from './Option'

/** @typeclass */
export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: HKT<T, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, HKT<T, B>>
  traverse<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(ta: HKT<T, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, HKT<T, B>>
  traverse<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: HKT<T, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, HKT<T, B>>
  traverse<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: HKT<T, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, HKT<T, B>>
  traverse<F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => Type<F, B>) => Type<F, HKT<T, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}

export interface Traversable1<T extends URIS> extends Functor1<T>, Foldable1<T> {
  traverse<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: Type<T, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type<T, B>>
  traverse<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(ta: Type<T, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type<T, B>>
  traverse<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type<T, B>>
  traverse<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type<T, B>>
  traverse<F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<T, A>, f: (a: A) => Type<F, B>) => Type<F, Type<T, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: Type<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type<T, B>>
}

export interface Traversable2<T extends URIS2> extends Functor2<T>, Foldable2<T> {
  traverse<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type2<T, TL, B>>
  traverse<F extends URIS3>(
    F: Applicative3<F>
  ): <TL, FU, FL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type2<T, TL, B>>
  traverse<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type2<T, TL, B>>
  traverse<F extends URIS2>(
    F: Applicative2<F>
  ): <TL, FL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type2<T, TL, B>>
  traverse<F extends URIS>(
    F: Applicative1<F>
  ): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type<F, B>) => Type<F, Type2<T, TL, B>>
  traverse<F>(F: Applicative<F>): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
  traverse<F>(F: Applicative<F>): <TL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
}

export interface Traversable2C<T extends URIS2, TL> extends Functor2C<T, TL>, Foldable2C<T, TL> {
  traverse<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type2<T, TL, B>>
  traverse<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type2<T, TL, B>>
  traverse<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type2<T, TL, B>>
  traverse<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type2<T, TL, B>>
  traverse<F extends URIS>(
    F: Applicative1<F>
  ): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => Type<F, B>) => Type<F, Type2<T, TL, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: Type2<T, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type2<T, TL, B>>
}

export interface Traversable3<T extends URIS3> extends Functor3<T>, Foldable3<T> {
  traverse<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS3>(
    F: Applicative3<F>
  ): <TU, TL, FU, FL, A, B>(
    ta: Type3<T, TU, TL, A>,
    f: (a: A) => Type3<F, FU, FL, B>
  ) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS2>(
    F: Applicative2<F>
  ): <TU, TL, FL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS>(
    F: Applicative1<F>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type<F, B>) => Type<F, Type3<T, TU, TL, B>>
  traverse<F>(
    F: Applicative<F>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, TU, TL, B>>
  traverse<F>(
    F: Applicative<F>
  ): <TU, TL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, TU, TL, B>>
}

export interface Traversable3C<T extends URIS3, TU, TL> extends Functor3C<T, TU, TL>, Foldable3C<T, TU, TL> {
  traverse<F extends URIS3, FU, FL>(
    F: Applicative3C<F, FU, FL>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS3>(
    F: Applicative3<F>
  ): <FU, FL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type3<F, FU, FL, B>) => Type3<F, FU, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS2, FL>(
    F: Applicative2C<F, FL>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS2>(
    F: Applicative2<F>
  ): <FL, A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type2<F, FL, B>) => Type2<F, FL, Type3<T, TU, TL, B>>
  traverse<F extends URIS>(
    F: Applicative1<F>
  ): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => Type<F, B>) => Type<F, Type3<T, TU, TL, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, TU, TL, B>>
  traverse<F>(F: Applicative<F>): <A, B>(ta: Type3<T, TU, TL, A>, f: (a: A) => HKT<F, B>) => HKT<F, Type3<T, TU, TL, B>>
}

export interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: HKT<F, HKT<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, HKT<F, HKT<G, B>>>
}

export interface TraversableComposition11<F extends URIS, G extends URIS>
  extends FoldableComposition11<F, G>,
    FunctorComposition11<F, G> {
  readonly traverse: <H>(
    H: Applicative<H>
  ) => <A, B>(fga: Type<F, Type<G, A>>, f: (a: A) => HKT<H, B>) => HKT<H, Type<F, Type<G, B>>>
}

export function traverse<F extends URIS3, T extends URIS2>(
  F: Applicative3<F>,
  T: Traversable2<T>
): <UF, LF, LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type3<F, UF, LF, B>) => Type3<F, UF, LF, Type2<T, LT, B>>
export function traverse<F extends URIS2, T extends URIS2>(
  F: Applicative2<F>,
  T: Traversable2<T>
): <LF, LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type2<F, LF, B>) => Type2<F, LF, Type2<T, LT, B>>
export function traverse<F extends URIS, T extends URIS2>(
  F: Applicative1<F>,
  T: Traversable2<T>
): <LT, A, B>(ta: Type2<T, LT, A>, f: (a: A) => Type<F, B>) => Type<F, Type2<T, LT, B>>
export function traverse<F extends URIS3, T extends URIS>(
  F: Applicative3<F>,
  T: Traversable1<T>
): <U, L, A, B>(ta: Type<T, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Type<T, B>>
export function traverse<F extends URIS2, T extends URIS>(
  F: Applicative2<F>,
  T: Traversable1<T>
): <L, A, B>(ta: Type<T, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Type<T, B>>
export function traverse<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  T: Traversable1<T>
): <A, B>(ta: Type<T, A>, f: (a: A) => Type<F, B>) => Type<F, Type<T, B>>
export function traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
/**
 * @function
 * @since 1.0.0
 */
export function traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>> {
  return T.traverse(F)
}

export function sequence<F extends URIS2, T extends URIS2>(
  F: Applicative2<F>,
  T: Traversable2<T>
): <LF, LT, A>(tfa: Type2<T, LT, Type2<F, LF, A>>) => Type2<F, LF, Type2<T, LT, A>>
export function sequence<F extends URIS2, T extends URIS2, LF>(
  F: Applicative2C<F, LF>,
  T: Traversable2<T>
): <LT, A>(tfa: Type2<T, LT, Type2<F, LF, A>>) => Type2<F, LF, Type2<T, LT, A>>
export function sequence<F extends URIS, T extends URIS2>(
  F: Applicative1<F>,
  T: Traversable2<T>
): <L, A>(tfa: Type2<T, L, Type<F, A>>) => Type<F, Type2<T, L, A>>
export function sequence<F extends URIS3, T extends URIS>(
  F: Applicative3<F>,
  T: Traversable1<T>
): <U, L, A>(tfa: Type<T, Type3<F, U, L, A>>) => Type3<F, U, L, Type<T, A>>
export function sequence<F extends URIS3, T extends URIS, U, L>(
  F: Applicative3C<F, U, L>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type3<F, U, L, A>>) => Type3<F, U, L, Type<T, A>>
export function sequence<F extends URIS2, T extends URIS>(
  F: Applicative2<F>,
  T: Traversable1<T>
): <L, A>(tfa: Type<T, Type2<F, L, A>>) => Type2<F, L, Type<T, A>>
export function sequence<F extends URIS2, T extends URIS, L>(
  F: Applicative2C<F, L>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type2<F, L, A>>) => Type2<F, L, Type<T, A>>
export function sequence<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  T: Traversable1<T>
): <A>(tfa: Type<T, Type<F, A>>) => Type<F, Type<T, A>>
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
/**
 * @function
 * @since 1.0.0
 */
export function sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> {
  return tfa => T.traverse(F)(tfa, fa => fa)
}

export function getTraversableComposition<F extends URIS, G extends URIS>(
  F: Traversable1<F>,
  G: Traversable1<G>
): TraversableComposition11<F, G>
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
/**
 * @function
 * @since 1.0.0
 */
export function getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    ...getFoldableComposition(F, G),
    traverse: H => (fga, f) => F.traverse(H)(fga, ga => G.traverse(H)(ga, a => f(a)))
  }
}

/**
 * Gets default implementation of {@link Traversable.traverse} using {@link Witherable.wither}
 * @function
 * @since 1.7.0
 */
export function traverseDefaultWither<W extends URIS3, WU, WL>(
  W: Pick<Witherable3C<W, WU, WL>, 'URI' | '_U' | '_L' | 'wither' | 'map'>
): Traversable3C<W, WU, WL>['traverse']
export function traverseDefaultWither<W extends URIS3>(
  W: Pick<Witherable3<W>, 'URI' | 'wither' | 'map'>
): Traversable3<W>['traverse']
export function traverseDefaultWither<W extends URIS2, WL>(
  W: Pick<Witherable2C<W, WL>, 'URI' | '_L' | 'wither' | 'map'>
): Traversable2C<W, WL>['traverse']
export function traverseDefaultWither<W extends URIS2>(
  W: Pick<Witherable2<W>, 'URI' | 'wither' | 'map'>
): Traversable2<W>['traverse']
export function traverseDefaultWither<W extends URIS>(
  W: Pick<Witherable1<W>, 'URI' | 'wither' | 'map'>
): Traversable1<W>['traverse']
export function traverseDefaultWither<W>(W: Pick<Witherable<W>, 'URI' | 'wither' | 'map'>): Traversable<W>['traverse']
export function traverseDefaultWither<W>(W: Pick<Witherable<W>, 'URI' | 'wither' | 'map'>): Traversable<W>['traverse'] {
  return <F>(F: Applicative<F>) => {
    const witherF = W.wither(F)
    return <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, B>): HKT<F, HKT<W, B>> => witherF(ta, a => F.map(f(a), some))
  }
}
